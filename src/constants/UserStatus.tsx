// constants/userStatus.ts
export const UserStatusKey = "user_statuses";

export const DefaultStatuses = [
  "Tất cả",
  "Xem nhà",
  "Chốt + Ngân hàng",
  "Hẹn ngày ký HĐ",
  "Ngày giao nhà"
];

export const UserStatus = {
  get: (): string[] => {
    const stored = localStorage.getItem(UserStatusKey);
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(UserStatusKey, JSON.stringify(DefaultStatuses))
    return DefaultStatuses
  },

  add: (status: string): void => {
    const statuses = UserStatus.get();
    if (!statuses.includes(status)) {
      const updated = [...statuses, status];
      localStorage.setItem(UserStatusKey, JSON.stringify(updated));
    }
  },

  remove: (statusToRemove: string): void => {
    const statuses = UserStatus.get().filter(
      (status) => status !== statusToRemove
    );
    localStorage.setItem(UserStatusKey, JSON.stringify(statuses));
  },

  reset: () => {
    localStorage.setItem(UserStatusKey, JSON.stringify(DefaultStatuses));
  },
};
