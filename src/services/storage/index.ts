import { localStorageService } from "./localStorage";
import { cookieStorageService } from "./cookieStorage";
// import { sessionStorageService } from "./sessionStorage";

// Change only this line later
export const storage = cookieStorageService;