import axios from "axios";

function postAPI(url: string, data: any) {
  return axios(`https://trackingme.vercel.app/api/${url}`, {
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
  return postAPI("getuser", { emailId })
}
