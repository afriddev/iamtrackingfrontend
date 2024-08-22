export type userType = {
  emailId: string;
  mobilenumber: number;
  password: string;
  firstName: string;
  lastName?: string;
  todayDate: number;
  lastUpdatedDate: number;
  monthLimitAmount: number;
  todaySpends: {
    id: string;
    amount: number;
    response: string;
    date: string;
    type: "Normal" | "Grocery";
  }[];
  balance: number;
  totalSpend: number;
  dailyLimit: number;
  totalSaved: number;
  imageUrl: string;
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
  groceryList: [groceryList];
  lastUpdateDate: number;
  todayDate: number;
  notifications: [groceryList];
  monthLyLimit: number;
  monthLySpend: number;
  notifyHalf: boolean;
};

export type groceryList = {
  itemName: string;
  pricePerKg: number;
  requiredGmsPerWeek: number;
  addedDate: number;
};
