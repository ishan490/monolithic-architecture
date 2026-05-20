import Cookies from "js-cookie";
import { StorageService } from "./storageService";

export const cookieStorageService: StorageService = {
  set(key, value) {
    Cookies.set(key, value, {
      expires:  7, // 1 minute,
      secure: true,
      sameSite: "strict",
    });
  },

  get(key) {
    const value = Cookies.get(key);
    return value ? value : null;
  },

  remove(key) {
    Cookies.remove(key);
  },

  clear() {
    // Cookies doesn't support clear all directly
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      Cookies.remove(name);
    });
  },
};