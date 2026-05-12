import { useQuery } from "@tanstack/react-query";
import {
  getDashboardMetrics,
  getSalesChartData,
} from "../api/dashboardApi";

import { useDashboardStore } from "../store/dashboardStore";

export const useDashboardMetrics = () => {
  const setDashboardData = useDashboardStore(
    (state) => state.setDashboardData
  );

  return useQuery({
    queryKey: ["dashboard-metrics"],

    queryFn: async () => {
      const data = await getDashboardMetrics();

      const formattedData = {
        customers: data.total,
        orders: data.products.length * 20,
      };

      setDashboardData(formattedData);

      return formattedData;
    },
  });
};

export const useSalesChart = () => {
  return useQuery({
    queryKey: ["sales-chart"],
    queryFn: getSalesChartData,
  });
};