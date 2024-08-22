import { ReactNode, createContext, useContext, useReducer } from "react";
import { userType } from "../types/userTypes";

export type dispatchDataType = {
  type: string;
  payload: any;
};

type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  userData: userType;
  pageIndex: number;
  todaySpendAmount: number;
  isLoading: boolean;
  loggedIn: boolean;
};
const initState: contextType = {
  dispatch: () => {},
  userData: {
    emailId: "",
    mobilenumber: 0,
    password: "",
    firstName: "",
    lastName: "",
    monthLimitAmount: 0,
    balance: 0,
    dailyLimit: 0,
    lastUpdatedDate: 0,
    todayDate: 0,
    todaySpends: [],
    totalSaved: 0,
    totalSpend: 0,
    imageUrl: "",
    dailySpends: [],
    groceryData: {} as any,
  },
  pageIndex: 0,
  todaySpendAmount: 0,
  isLoading: false,
  loggedIn: false,
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
    case "setTodaySpendAmount":
      return {
        ...state,
        todaySpendAmount: action?.payload,
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
    { userData, pageIndex, todaySpendAmount, isLoading, loggedIn },
    dispatch,
  ] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        userData,
        pageIndex,
        todaySpendAmount,
        isLoading,
        loggedIn,
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
