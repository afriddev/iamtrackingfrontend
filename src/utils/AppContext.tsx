import { ReactNode, createContext, useContext, useReducer } from "react";
import { userType } from "@/types/userTypes";

export type dispatchDataType = {
  type: string;
  payload: any;
};

type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  isLoading: boolean;
  loggedIn: boolean;
  pageIndex: number;
  userData: userType;
  totalSpendAmount: number;
  balance: number;
  todaySpends:number
};
const initState: contextType = {
  dispatch: () => {},
  isLoading: false,
  loggedIn: false,
  pageIndex: 0,
  userData: undefined as any,
  totalSpendAmount: 0,
  balance: 0,
  todaySpends:0
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setPageIndex":
      return {
        ...state,
        pageIndex: action?.payload,
      };
    case "setIsLoading":
      return {
        ...state,
        isLoading: action?.payload,
      };
    case "setUser":
      return {
        ...state,
        userData: action?.payload,
      };
    case "setTotalSpendAmount":
      return {
        ...state,
        totalSpendAmount: action?.payload?.totalSpendAmount,
        balance:action?.payload?.balance,
        todaySpends:action?.payload?.todaySpends
      };
    case "setLoggedIn":
      return {
        ...state,
        loggedIn: action?.payload,
      };
    case "setGroceryData":
      return {
        ...state,
        userData: {
          ...state?.userData,
          groceryData: action?.payload,
        },
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function AppContext({ children }: { children: ReactNode }) {
  const [
    { userData, pageIndex, totalSpendAmount, balance, isLoading, loggedIn,todaySpends },
    dispatch,
  ] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        userData,
        pageIndex,
        totalSpendAmount,
        balance,
        isLoading,
        loggedIn,
        todaySpends
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
