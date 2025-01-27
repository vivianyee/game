"use client";

import { userSignUp } from "@/utils/userRequests";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  sessionName: string;
};

export const SignUp = ({ sessionName }: Props) => {
  const [username, setUsername] = useState(sessionName);
  const router = useRouter()

  const userSignUpRedirect = () => {
    userSignUp(username);
    router.push('/home')
  };

  return (
    <div>
      <input
        type="input"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={sessionName}
      ></input>
      <button type="button" onClick={userSignUpRedirect}>
        add
      </button>
    </div>
  );
};
