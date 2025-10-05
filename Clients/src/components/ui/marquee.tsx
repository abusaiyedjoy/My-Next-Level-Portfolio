"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max min-w-full animate-marquee gap-8",
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        )}
      >
        {children}
        {children /* duplicate for seamless loop */}
      </div>
    </div>
  );
}
