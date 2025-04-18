// constants/userStatus.ts
export const UserDataKey = "user_data";

export const DefaultData = [];

export const UserData = {
  get: (): string[] => {
    const stored = localStorage.getItem(UserDataKey);
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(UserDataKey, JSON.stringify(DefaultData))
    return DefaultData
  },

  add: (data: {}): void => {
    const updated = [...UserData.get(), data];
    localStorage.setItem(UserDataKey, JSON.stringify(updated));
  },

  // remove: (data: string): void => {
  //   const datas = UserData.get().filter(
  //     (data) => data !== data
  //   );
  //   localStorage.setItem(UserDataKey, JSON.stringify(datas));
  // },

  reset: () => {
    localStorage.setItem(UserDataKey, JSON.stringify(DefaultData));
  },
};
