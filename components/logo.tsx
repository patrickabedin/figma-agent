import { cn } from "@/lib/utils";

export function Logo({
  variant = "navy",
  className,
}: {
  variant?: "navy" | "white";
  className?: string;
}) {
  return (
    // Intrinsic ratio. Never object-fit cover on the mark.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt="Avance"
      width={247}
      height={70}
      className={cn("h-10 w-auto", className)}
    />
  );
}
