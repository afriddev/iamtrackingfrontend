export type userType = {
  emailId: string;
  mobilenumber: number;
  password: string;
  firstName: string;
  lastName?: string;
  todayDate: number;
  lastUpdatedDate: number;
  monthLimitAmount: number;
  todaySpends: {id:string,amount:number,response:string,date:string}[];
  balance: number;
  totalSpend:number;
  dailyLimit:number;
  totalSaved:number
  imageUrl:string;
  monthlySpends: {id:string,amount:number,response:string,date:string}[]
};
