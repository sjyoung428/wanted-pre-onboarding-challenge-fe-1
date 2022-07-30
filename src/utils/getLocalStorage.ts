export const getLocalStorage = <T>(keyname: string): T | string => {
  const value = window.localStorage.getItem(keyname) || "";
  if (!value) return "";
  return JSON.parse(value);
};
