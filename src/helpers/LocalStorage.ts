import { IUser } from "@/types";

export default class LocalStorage {
  
  // Set Access Token
  public static setAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  // Get Access Token
  public static getAccessToken = () => localStorage.getItem("access_token");

  // Set Admin ID added to headers for request.
  public static setAdminId = (
    user: IUser,
  ) => {
    localStorage.setItem('aId', user['id'].toString());
  } 

  // GET Admin Id from storage
  public static getAdminId = () => {
    localStorage.getItem('aId');
  }

  public static clear = () => {
    localStorage.clear();
  };
}
