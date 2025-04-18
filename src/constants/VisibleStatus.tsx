import { DefaultStatuses } from './UserStatus'

export const VisibleStatusKey = "visible_statuses";

export const VisibleStatus = {
  get: (): string[] => {
    const stored = localStorage.getItem(VisibleStatusKey);
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(VisibleStatusKey, JSON.stringify(DefaultStatuses))
    return DefaultStatuses
  },

  add: (status: string): void => {
    const statuses = VisibleStatus.get();
    if (!statuses.includes(status)) {
      const updated = [...statuses, status];
      localStorage.setItem(VisibleStatusKey, JSON.stringify(updated));
    }
  },

  remove: (statusToRemove: string): void => {
    const statuses = VisibleStatus.get().filter(
      (status) => status !== statusToRemove
    );
    localStorage.setItem(VisibleStatusKey, JSON.stringify(statuses));
  },

  reset: () => {
    localStorage.setItem(VisibleStatusKey, JSON.stringify(DefaultStatuses));
  },
};
