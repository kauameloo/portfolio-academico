import React from 'react'
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: React.ReactNode
}

export function Heading({ className, children, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function Text({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}