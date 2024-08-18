export function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

export function getTodayDate(): number {
  return new Date().getDate();
}
export function useGetMe() {
  const emailId = getLocalStorageItem("emailId");
  return { emailId };
}

export function getErrorDescription(errorMessage: string) {
  switch (errorMessage) {
    case "MONGO_DB_ERROR":
      return "There was a problem with the server. Please try again later.";
    case "EMAIL_ID_PROVIDE_ERROR":
      return "Please provide an email address.";
    case "PASSWORD_PROVIDE_ERROR":
      return "Please provide a password.";
    case "FIRST_NAME_PROVIDE_ERROR":
      return "Please provide your first name.";
    case "REQUEST_SUCCESS":
      return "Your request was successful.";
    case "DAILY_SPEND_AMOUNT_PROVIDE_ERROR":
      return "Please provide a valid spend amount for today.";
    case "MONTHLY_AMOUNT_ZERO_ERROR":
      return "The monthly amount cannot be zero. Please check your input.";
    case "NO_USER_FOUND_ERROR":
      return "No user found with the provided details.";
    case "SOME_THING_WRONG_ERROR":
      return "Something went wrong. Please try again.";
    case "DAILY_LIMIT_EXCEED_ERROR":
      return "You have exceeded your daily spending limit.";
    case "SET_MONTH_AMOUNT_ERROR":
      return "Please set a valid monthly spending amount.";
    case "JOB_RUNNED":
      return "The job has run successfully.";
    case "AMOUNT_UPDATED":
      return "The amount has been updated.";
    case "USER_EXISTS_ERROR":
      return "A user with this email already exists.";
    case "AMOUNT_VALUE_ERROR":
      return "The amount value is invalid. Please check and try again.";
    case "IMAGE_URL_PROVIDE_ERROR":
      return "Please provide a valid image URL.";
    case "INVALID_EMAIL":
      return "The email address provided is invalid.";
    case "WRONG_PASSWORD":
      return "Wrong password entered!";
    default:
      return "An unknown error occurred. Please contact support.";
  }
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage?.setItem(key, value);
}

export function getLocalStorageItem(key: string):string | null {
  return localStorage?.getItem(key);
}

export function deleteLocalStorageItem(key: string) {
  localStorage?.removeItem(key);
}
      