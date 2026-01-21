export const getFromLocalStorage = (key: string) => {
  const stored = localStorage.getItem(key) || "";
  return JSON.parse(stored);
};

export const setOnLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
