import React, { useState } from "react";

interface inputType extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  toggle?: string[];
  label?: string;
}

export default function EmojiInput(props: inputType) {
  const [showPassword, setShowPassword] = useState(false);
  const { required, toggle, label, type } = props;
  return (
    <div className="mt-3">
      <div>
        <span>
          <ion-icon name={label}></ion-icon>
        </span>{" "}
        {required && <span className="text-red-700">*</span>}
      </div>
      <div className=" bg-[#2f2f2f] p-2 flex">
        <input {...props} type={showPassword ? "text" : type} />
        {toggle && (
          <span
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="hover:cursor-pointer"
          >
            {showPassword ? (
              <ion-icon name={toggle[0]}></ion-icon>
            ) : (
              <ion-icon name={toggle[1]}></ion-icon>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
