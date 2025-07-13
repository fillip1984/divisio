import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";

const button = cva("button", {
  variants: {
    intent: {
      primary: ["bg-blue-500", "text-white", "border-transparent"],
      //   secondary: ["bg-white", "text-gray-800", "border-gray-400"],
      blueAndPurple: [
        "bg-gradient-to-r",
        "from-blue-500",
        "to-purple-500",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      orangeAndBlue: [
        "bg-gradient-to-r",
        "from-orange-500",
        "to-blue-500",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      purpleAndPink: [
        "bg-gradient-to-b",
        "from-purple-500",
        "to-pink-500",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      blueAndGreen: [
        "bg-gradient-to-b",
        "from-blue-500",
        "to-green-500",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      zincToZinc: [
        "bg-gradient-to-r",
        "from-amber-800",
        "via-amber-400",
        "from-10%",
        "to-zinc-800",
        "to-90%",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      greenAndYellow: [
        "bg-gradient-to-r",
        "from-green-500",
        "to-yellow-500",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
      redAndPink: [
        "bg-gradient-to-r",
        "from-red-500",
        "to-pink-500",
        "opacity-90",
        "hover:opacity-100",
        "transition",
        "duration-300",
        "ease-in-out",
      ],
      gray: [
        "bg-gradient-to-r",
        "from-gray-400",
        "via-stone-700",
        "to-gray-600",
        "opacity-90",
        "hover:opacity-100",
        "transition-opacity",
        "duration-200",
      ],
    },
    size: {
      custom: [],
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      disabled: false,
      class: "hover:bg-blue-600",
    },
    { intent: "primary", size: "medium" },
  ],
  defaultVariants: {
    disabled: false,
    intent: "gray",
    size: "medium",
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  disabled,
  ...props
}) => (
  <button
    className={button({ intent, size, disabled, className })}
    disabled={disabled || undefined}
    {...props}
  />
);
