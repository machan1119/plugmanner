const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent relative overflow-hidden rounded-xl p-2 shadow-sm";

export function ServiceListSkeleton() {
  return (
    <div className="bg-black-light border-y border-black-dark py-1 w-full">
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

export function ServicePageSkeleton() {
  return (
    <div className="bg-black-light border-y border-black-dark py-1 w-full h-full">
      <div className="flex flex-col h-full gap-10 justify-self-center w-[80%] p-4">
        <div className="flex gap-10 h-[500px] w-full">
          <div className={`${shimmer} w-[60%] bg-black-medium`} />
          <div className={`${shimmer} w-[40%] bg-black-medium`} />
        </div>
        <div className={`${shimmer} w-full h-[200px] bg-black-medium`} />
        <div className={`${shimmer} w-full h-[200px] bg-black-medium`} />
      </div>
    </div>
  );
}
