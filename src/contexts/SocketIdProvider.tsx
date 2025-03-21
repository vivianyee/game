"use client";

import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  children?: React.ReactNode;
};

const initialSocketId = uuidv4();

export const SocketIdContext = createContext(initialSocketId);

export const SocketIdProvider = ({ children }: Props) => {
  return (
    <SocketIdContext.Provider value={initialSocketId}>
      {children}
    </SocketIdContext.Provider>
  );
};
