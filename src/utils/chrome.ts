// Mock Chrome API for development
const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage;

const mockStorage = {
  data: new Map<string, any>(),
  get(keys: string[], callback: (result: any) => void) {
    const result: any = {};
    keys.forEach(key => {
      result[key] = this.data.get(key);
    });
    callback(result);
  },
  set(items: { [key: string]: any }, callback?: () => void) {
    Object.entries(items).forEach(([key, value]) => {
      this.data.set(key, value);
    });
    callback?.();
  }
};

export const storage = isChromeExtension 
  ? chrome.storage.sync 
  : mockStorage;