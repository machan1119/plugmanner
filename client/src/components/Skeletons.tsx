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

export function ServicePageMobileSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col items-center h-full gap-5 justify-self-center w-full p-4">
        <Skeleton width="100%" height="100px" />
        <Skeleton width="60%" height="150px" />
        <Skeleton width="100%" height="50px" />
        <Skeleton width="100%" height="100px" />
        <Skeleton width="100%" height="500px" />
      </div>
    </div>
  );
}

export function FreeServicePageSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col items-center h-full gap-5 justify-self-center w-[80%] p-4">
        <Skeleton width="70%" height="80px" />
        <Skeleton width="50%" height="80px" />
        <div className="w-full flex justify-between items-center">
          <Skeleton width="150px" height="150px" />
          <Skeleton width="50%" height="100px" />
          <Skeleton width="150px" height="150px" />
        </div>
        <Skeleton width="50%" height="150px" />
        <Skeleton width="50%" height="150px" />
      </div>
    </div>
  );
}

export function FreeServicePageMobileSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col items-center h-full gap-5 justify-self-center w-full p-4">
        <Skeleton width="100%" height="100px" />
        <Skeleton width="60%" height="150px" />
        <Skeleton width="100%" height="80px" />
        <Skeleton width="100%" height="100px" />
        <Skeleton width="100%" height="100px" />
        <Skeleton width="100%" height="200px" />
      </div>
    </div>
  );
}

export function FreeToolsPageSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col items-center h-full gap-8 justify-self-center w-[80%] p-4">
        <Skeleton width="70%" height="80px" />
        <Skeleton width="50%" height="80px" />
        <Skeleton width="70%" height="200px" />
        <div className="w-full flex justify-between items-center">
          <Skeleton width="30%" height="200px" />
          <Skeleton width="30%" height="200px" />
          <Skeleton width="30%" height="200px" />
        </div>
      </div>
    </div>
  );
}

export function FreeToolsPageMobileSkeleton() {
  return (
    <div className="bg-background-light border-y border-black-dark py-1 w-full h-full animate-fade-in">
      <div className="flex flex-col items-center h-full gap-5 justify-self-center w-full p-4">
        <Skeleton width="100%" height="100px" />
        <Skeleton width="60%" height="150px" />
        <Skeleton width="100%" height="250px" />
        <Skeleton width="100%" height="200px" />
      </div>
    </div>
  );
}

export function BlogPageSkeleton() {
  return (
    <div className="bg-background-light border-y flex flex-col gap-10 items-center border-black-dark p-5 w-full h-full animate-fade-in">
      <Skeleton width="60%" height="200px" />
      <Skeleton width="80%" height="500px" />
    </div>
  );
}

export function BlogDetailPageSkeleton() {
  return (
    <div className="bg-background-light border-y flex flex-col gap-10 items-center border-black-dark p-5 w-full h-full animate-fade-in">
      <Skeleton width="80%" height="300px" />
      <div className="flex gap-8 w-full justify-center">
        <Skeleton width="20%" height="400px" />
        <Skeleton width="40%" height="400px" />
        <Skeleton width="20%" height="400px" />
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
