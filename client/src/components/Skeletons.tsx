const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent relative overflow-hidden rounded-xl p-2 shadow-sm";

export function ServiceListSkeleton() {
  return (
    <div className={`bg-black-light border-y border-black-dark py-1 w-full`}>
      <div className="flex justify-between justify-self-center w-[70%] p-4">
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
        <div className={`${shimmer} min-w-20 min-h-6 bg-black-medium`} />
      </div>
    </div>
  );
}
