export type userType = {
  emailId: string;
  mobilenumber: number;
  password: string;
  firstName: string;
  lastName?: string;
  todayDate: number;
  lastUpdatedDate: number;
  imageUrl: string;
  monthLimitAmount: number;
  todaySpends: {
    id: string;
    amount: number;
    response: string;
    date: string;
    type: "Normal" | "Grocery";
  }[];
  dailyLimit: number;
  dailySpends: {
    id: string;
    amount: number;
    response: string;
    date: string;
  }[];
  groceryData:groceryData
};

export type createUserType = {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
  mobileNumber?: string;
};

export type groceryData = {
  emailId: string;
  lastUpdateDate: number;
  todayDate: number;
  groceryList: [groceryList];
  notifications: [groceryList];
  notifyHalf: boolean;
  monthLyGroceryAmount:number
  missedGroceryList: [groceryList],
  todayGroceryList: [groceryList],
};

export type groceryList = {
  itemName: string;
  pricePerKg: number;
  requiredGmsPerWeek: number;
  addedDate: number;
};
