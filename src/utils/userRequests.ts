import { signIn } from "next-auth/react";

export const userSignUp = async (name: string) => {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        username: name,
      }),
    });
    if (res.ok) {
      const response = await res.json();

      await signIn("credentials", {
        gameId: name,
        username: name,
        redirect: false,
      });
      
      return response;
    } else {
      const { error } = await res.json();
      throw new Error("Can't add credentials", error);
    }
  } catch {
    throw new Error("Can't add user");
  }
};

export const getUser = async () => {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
  } catch {
    throw new Error("Can't get users");
  }
};

export const deleteUser = async (name: string) => {
  try {
    const res = await fetch("/api/user", {
      method: "DELETE",
      body: JSON.stringify({
        username: name,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch {
    throw new Error("Can't delete user");
  }
};
