import { AuthState } from "@aws-amplify/ui-components";
import { useContext, createContext } from "react";


interface AppContextProps {
    authState: AuthState,
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AppContext = createContext<AppContextProps | null>(null);

export function useAppContext() {
  return useContext(AppContext);
}