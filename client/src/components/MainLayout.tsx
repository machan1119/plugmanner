"use client";
import { useHome } from "@/providers/HomeProvider";
import { memo } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide" | "scale";
  delay?: number;
}

const MainLayout = memo(
  ({
    children,
    className = "",
    animation = "fade",
    delay = 0,
  }: MainLayoutProps) => {
    const { serviceShow } = useHome();

    const animationClasses = {
      fade: "animate-fade-in",
      slide: "animate-slide-up",
      scale: "animate-scale",
    };

    if (!serviceShow) {
      return null;
    }

    return (
      <div
        className={`
        w-full h-full
        ${animationClasses[animation]}
        ${className}
      `}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);

MainLayout.displayName = "MainLayout";

export default MainLayout;
