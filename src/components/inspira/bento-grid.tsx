"use client";

import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  icon,
  className = "",
  header,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group row-span-1 flex flex-col justify-between space-y-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] hover:border-purple-500/30",
        className
      )}
    >
      {header && <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">{header}</div>}
      <div className="space-y-2">
        {icon && <div className="mb-2">{icon}</div>}
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
