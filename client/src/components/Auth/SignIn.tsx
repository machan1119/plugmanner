import { Dispatch, SetStateAction } from "react";

export default function SignIn({
  setAuthStep,
}: {
  setAuthStep: Dispatch<SetStateAction<number>>;
}) {
  const handleSubmit = () => {
    return setAuthStep(1);
  };
  return (
    <div>
      <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
        <div className="flex gap-0 items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
          <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
            <use href="#mail"></use>
          </svg>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
            required
          />
        </div>
        <div className="flex gap-0 items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
          <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
            <use href="#lock"></use>
          </svg>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
