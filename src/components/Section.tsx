
import React from 'react';
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
}) => {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="container-wide">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={cn("text-3xl md:text-4xl font-bold mb-3", titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn("text-lg text-muted-foreground max-w-3xl mx-auto", subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={cn("", contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
