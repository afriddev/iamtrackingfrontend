export type userType = {
  emailId: string;
  mobilenumber: number;
  password: string;
  firstName: string;
  lastName?: string;
  todayDate: number;
  lastUpdatedDate: number;
  monthLimitAmount: number;
  todaySpends: {amount:number,date:string,response:string}[];
  balance: number;
  totalSpend:number;
  dailyLimit:number;
  totalSaved:number
  imageUrl:string
};
