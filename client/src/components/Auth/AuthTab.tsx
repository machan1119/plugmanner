"use client";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const titles: string[] = ["Sign In", "Sign Up"];

export default function AuthTab() {
  const [authStep, setAuthStep] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex transition-all ease-in-out duration-100">
        {titles.map((item, idx) => (
          <div
            key={idx}
            className={`flex grow justify-center pb-2 border-b-4 cursor-pointer border-${
              authStep === idx ? "[green]" : "[black]"
            }`}
            onClick={() => setAuthStep(idx)}
          >
            {item}
          </div>
        ))}
      </div>
      {authStep ? (
        <SignUp setAuthStep={setAuthStep} />
      ) : (
        <SignIn setAuthStep={setAuthStep} />
      )}
    </div>
  );
}
