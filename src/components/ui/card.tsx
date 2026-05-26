import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "className"> {
  className?: string;
  hoverLift?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverLift = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverLift ? { y: -4 } : undefined}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "rounded-[16px] bg-white border border-black/5 shadow-neumorphic",
          hoverLift && "hover:shadow-[rgb(255,255,255)_-5px_-5px_15px_0px,rgba(216,218,225,0.9)_4px_10px_20px_0px]",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };
