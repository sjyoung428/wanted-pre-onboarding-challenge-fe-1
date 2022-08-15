export const setLocalStorage = <T>(keyname: string, value: T) => {
  window.localStorage.setItem(keyname, JSON.stringify(value));
};
