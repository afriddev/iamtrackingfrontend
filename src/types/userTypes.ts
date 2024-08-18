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
  monthlySpends: {
    id: string;
    amount: number;
    response: string;
    date: string;
  }[];
};

export type createUserType = {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
  mobileNumber?: string;
};
