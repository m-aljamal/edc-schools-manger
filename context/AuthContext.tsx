import { createContext, FC, useContext, useState } from "react";

export type AuthContextState = {
  currentUserName: string;
  schoolName: string;
  addUserName: (name: string) => void;
  addSchoolName: (name: string) => void;
};

const defaultValue = {
  currentUserName: "",
  schoolName: "",
  addUserName: () => {},
  addSchoolName: () => {},
};
const AuthContext = createContext<AuthContextState>(defaultValue);

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider: FC = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState<string>(
    defaultValue.currentUserName
  );
  const [schoolName, setSchoolName] = useState<string>(defaultValue.schoolName);

  const addUserName = (name: string) => setCurrentUserName(name);
  const addSchoolName = (name: string) => setSchoolName(name);

  return (
    <>
      <AuthContext.Provider
        value={{
          currentUserName,
          schoolName,
          addUserName,
          addSchoolName,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
