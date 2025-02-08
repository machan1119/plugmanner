export const SearchIcon = (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
      stroke="#01C573"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M13.8047 13.8037L17.5 17.5"
      stroke="#01C573"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export function LottieAnimation() {
  return (
    <span className="relative flex size-3">
      <span className="bg-green-light absolute size-3 animate-ping rounded-full opacity-75"></span>
      <span className="bg-green-light relative size-3 rounded-full"></span>
    </span>
  );
}
