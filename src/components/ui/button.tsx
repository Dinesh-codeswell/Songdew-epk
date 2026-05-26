import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-[16px] font-medium font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-songdew-blue disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-songdew-blue text-white hover:bg-[#0069DB]",
        secondary:
          "bg-white border border-[#DDE3EA] text-songdew-blue hover:bg-[#F2F6FA]",
        ghost: "hover:bg-black/5 text-songdew-gray hover:text-songdew-text",
        link: "text-songdew-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-[10px] px-8 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "className">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
