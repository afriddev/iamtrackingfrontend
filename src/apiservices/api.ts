import axios from "axios";

const BASE_URL = "https://iamtrackingbackend.vercel.app/api/";

function postAPI(url: string, data: any) {
  return axios(`${BASE_URL}${url}`, {
    method: "POST",
    data,
  });
}

export function imageUplaodAPI(key: string, body: FormData) {
  return axios(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    data: body,
  });
}
export function updateProfileImageAPI(data: { emailId: string; url: string }) {
  return postAPI("uploadprofileimage", data);
}
export function getUserDataAPI(emailId: string) {
  return postAPI("getuser", { emailId });
}
export function setMonthlyAmountAPI(data: { emailId: string; amount: number }) {
  return postAPI("setmonthlimit", data);
}
export function updateDailySpendAmountAPI(data: {
  emailId: string;
  amount: number;
  type: "GROCERY" | "NORMAL";
}) {
  return postAPI("adddailyspend", data);
}
