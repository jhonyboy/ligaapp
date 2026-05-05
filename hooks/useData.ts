import { create } from 'zustand';

export const userStore = create((set) => ({
  status: false,
  data: null,

  setUser: (data) =>
    set({
      data,
      status: true,
    }),

  logOut: () =>
    set({
      data: null,
      status: false,
    }),
}));