import { StorageService } from "./storageService";

export const sessionStorageService: StorageService = {
  set(key, value) {
    sessionStorage.setItem(key, value);
  },

  get(key) {
    const value = sessionStorage.getItem(key);
    return value ? value : null;
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};