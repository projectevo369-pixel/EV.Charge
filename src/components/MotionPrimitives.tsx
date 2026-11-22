import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export function RevealGroup({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PrimaryActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function PrimaryActionButton({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  fullWidth = false,
}: PrimaryActionButtonProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const sharedStyle: React.CSSProperties = {
    backgroundColor: hovered ? tokens.colors.accentHover : tokens.colors.accent,
    color: tokens.colors.onAccent,
    boxShadow: hovered ? tokens.shadows.buttonHover : tokens.shadows.button,
  };

  const sharedClass = `theme-transition inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm leading-5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const motionProps = {
    whileHover: shouldReduceMotion ? undefined : { scale: 1.03 },
    whileTap: shouldReduceMotion ? undefined : { scale: 0.97 },
    transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' as const },
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
    style: sharedStyle,
    className: sharedClass,
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}

export function SecondaryActionButton({
  children,
  onClick,
  href,
  className = '',
  fullWidth = false,
}: PrimaryActionButtonProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const sharedStyle: React.CSSProperties = {
    backgroundColor: hovered ? tokens.colors.cardSurfaceElevated : tokens.colors.cardSurface,
    color: tokens.colors.textPrimary,
    borderColor: hovered ? tokens.colors.cardBorderHover : tokens.colors.cardBorder,
  };

  const sharedClass = `theme-transition inline-flex items-center justify-center gap-2 rounded-full border font-semibold text-sm leading-5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const motionProps = {
    whileHover: shouldReduceMotion ? undefined : { scale: 1.03 },
    whileTap: shouldReduceMotion ? undefined : { scale: 0.97 },
    transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' as const },
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
    style: sharedStyle,
    className: sharedClass,
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
