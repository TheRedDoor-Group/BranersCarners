"use client";

import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "primary", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const finalClass = [styles.btn, styles[`btn-${variant}`], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Comp className={finalClass} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
