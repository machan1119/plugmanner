// import { Dispatch, SetStateAction, useState } from "react";
// // import PhoneInput from "react-phone-input-2";
// // import GoogleAddress from "./GoogleAddress";

// export default function SignUp({
//   setAuthStep,
// }: {
//   setAuthStep: Dispatch<SetStateAction<number>>;
// }) {
//   const [validEmail, setValidEmail] = useState(true);
//   const [validPassword, setValidPassword] = useState(true);
//   const [validName, setValidName] = useState(true);
//   //   const [validAddress, setValidAddress] = useState(true);

//   const [checked, setChecked] = useState(false);

//   const handleChange = () => {
//     return setAuthStep(1);
//   };

//   const handlePhoneChage = () => {
//     return;
//   };

//   const handlePlaceChange = () => {
//     return;
//   };

//   const handleClick = () => {
//     return;
//   };
//   return (
//     <div className="flex flex-col gap-5 p-5">
//       <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
//             <use href="#mail"></use>
//           </svg>
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//             placeholder="Email"
//           />
//         </div>
//         {!validEmail && (
//           <h4 className="text-[12px] text-red-600">
//             *Invalid email type. Please fill in correct type.
//           </h4>
//         )}
//       </div>
//       <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
//             <use href="#user"></use>
//           </svg>
//           <input
//             name="name"
//             onChange={handleChange}
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//             placeholder="User Name"
//           />
//         </div>
//         {!validName && (
//           <h4 className="text-[12px] text-red-600">
//             *Your username is not valid.
//           </h4>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
//             <use href="#lock"></use>
//           </svg>
//           <input
//             name="password"
//             onChange={handleChange}
//             type="password"
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//             placeholder="Password"
//           />
//         </div>
//         {!validPassword && (
//           <h4 className="text-[12px] text-red-600">
//             *Please enter your password correctly.
//           </h4>
//         )}
//       </div>
//       <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
//             <use href="#lock"></use>
//           </svg>
//           <input
//             name="password"
//             onChange={handleChange}
//             type="password"
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//             placeholder="Confirm Password"
//           />
//         </div>
//         {!validPassword && (
//           <h4 className="text-[12px] text-red-600">
//             *Please enter your password correctly.
//           </h4>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-none ">
//             <use href="#code"></use>
//           </svg>
//           <input
//             name="ACN"
//             onChange={handleChange}
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//             placeholder="ACN(optional)"
//           />
//         </div>
//       </div>
//       {/* <div className="flex flex-col">
//         <div className="flex gap-0 justify-center items-center pl-10 text-[#888888] bg-[#f2f2f6] rounded-tr-md rounded-br-md overflow-hidden relative">
//           <svg className="w-4 h-4 absolute left-[14px] top-3 align-baseline inline-block stroke-current fill-[#888888] ">
//             <use href="#address"></use>
//           </svg>
//           <GoogleAddress
//             onPlaceChange={handlePlaceChange}
//             className="w-[220px] h-10 border border-[#f2f2f6] px-4 text-[14px] leading-normal"
//           />
//         </div>

//         {!validAddress && (
//           <h4 className="text-[12px] text-red-600">
//             *Please enter your address correctly.
//           </h4>
//         )}
//       </div> */}

//       {/* <div className="flex justify-center items-center">
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={(e) => setChecked(e.target.checked)}
//         />
//         <span className="text-[12px] leading-4 text-[#888888]">
//           I agree to Trade Mark Today&apos;s privacy notice and terms and
//           conditions.
//         </span>
//       </div> */}

//       <button
//         onClick={handleClick}
//         disabled={!checked}
//         className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
//       >
//         Register
//       </button>
//     </div>
//   );
// }
