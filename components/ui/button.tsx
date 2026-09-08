import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold:
          "bg-gold text-ink hover:bg-[#e5aa10] focus-visible:outline-gold",
        navy:
          "bg-navy text-white hover:bg-[#003d7a] focus-visible:outline-navy",
        outline:
          "border border-navy bg-transparent text-navy hover:bg-ice",
        ghost: "bg-transparent text-ink hover:bg-ice",
        inverse:
          "border border-white/70 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8",
        sm: "h-10 px-4 text-sm",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
