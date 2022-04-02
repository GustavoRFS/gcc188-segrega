import React, {
  useContext,
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
} from "react";
import reducer from "./reducer";

export type AppData = {
  currentUser: {
    name: string;
    profilePicture: string;
    accumulatedCoins: number;
    currentCoins: number;
    isAdmin: boolean;
  };
};

type AppContextType = {
  state: AppData;
  dispatch: Dispatch<{ type: string; payload: any }>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as AppData);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
