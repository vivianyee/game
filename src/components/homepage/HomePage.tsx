"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loading } from "../Loading";
import { SignUp } from "./SignUp";

export const HomePage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (session) {
      setUsername(session.user.username);
    }
  }, [session]);

  return status === "loading" ? <Loading /> : <SignUp sessionName={username} />;
};
