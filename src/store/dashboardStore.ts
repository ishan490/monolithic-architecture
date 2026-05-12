import { create } from "zustand";

interface DashboardState {
  customers: number;
  orders: number;

  setDashboardData: (data: {
    customers: number;
    orders: number;
  }) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  customers: 0,
  orders: 0,

  setDashboardData: (data) =>
    set({
      customers: data.customers,
      orders: data.orders,
    }),
}));