interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "text";
  width?: string;
  height?: string;
}

const shimmer = `
  relative overflow-hidden rounded-xl
  before:absolute before:inset-0
  before:-translate-x-full
  before:animate-[shimmer_2s_infinite]
  before:bg-gradient-to-r
  before:from-transparent
  before:via-white/60
  before:to-transparent
  shadow-soft
`;

const Skeleton = ({
  className = "",
  variant = "rectangular",
  width = "100%",
  height = "100%",
}: SkeletonProps) => {
  const variantClasses = {
    rectangular: "rounded-xl",
    circular: "rounded-full",
    text: "rounded-md",
  };

  return (
    <div
      className={`
        ${shimmer}
        ${variantClasses[variant]}
        bg-black-medium
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

export function ServiceListSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full animate-fade-in">
      <div className="flex justify-between justify-self-center w-[70%] p-4 gap-4">
        {[...Array(9)].map((_, i) => (
          <Skeleton
            key={i}
            width="min(120px, 100%)"
            height="24px"
            variant="text"
          />
        ))}
      </div>
    </div>
  );
}

export function ServicePageSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col h-full gap-10 justify-self-center w-[80%] p-4">
        <div className="flex gap-10 h-[500px] w-full">
          <Skeleton width="60%" height="100%" />
          <Skeleton width="40%" height="100%" />
        </div>
        <Skeleton width="100%" height="200px" />
        <Skeleton width="100%" height="200px" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl bg-background-light shadow-soft animate-fade-in">
      <Skeleton width="100%" height="200px" className="mb-4" />
      <div className="space-y-3">
        <Skeleton width="80%" height="24px" variant="text" />
        <Skeleton width="60%" height="20px" variant="text" />
      </div>
    </div>
  );
}

export function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-4 animate-fade-in">
      <Skeleton width="40px" height="40px" variant="circular" />
      <div className="space-y-2">
        <Skeleton width="120px" height="16px" variant="text" />
        <Skeleton width="80px" height="14px" variant="text" />
      </div>
    </div>
  );
}
