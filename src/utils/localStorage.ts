export const saveToLocalStorage = <T>(auth: T, keyLS: string) => {
  const authInformation = JSON.stringify(auth);
  localStorage.setItem(keyLS, authInformation);
};

export const getUserFromLocalStorage = <T>(keyLS: string): T => {
  const authInformation = localStorage.getItem(keyLS) || '';
  return <T>JSON.parse(authInformation);
};

export const removeItemFromLocalStorage = (keyLS: string) => {
  localStorage.removeItem(keyLS);
};
