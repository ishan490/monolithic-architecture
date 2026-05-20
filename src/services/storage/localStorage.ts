import { StorageService } from "./storageService";

export const localStorageService: StorageService = {
  set(key, value) {
    localStorage.setItem(key, value);
  },

  get(key) {
    const value = localStorage.getItem(key);
    return value ? value : null;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};