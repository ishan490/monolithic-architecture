import axiosInstance from "./axios";

export const getDashboardMetrics = async () => {
  const response = await axiosInstance.get("/products");

  return response.data;
};

export const getSalesChartData = async () => {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    sales: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
  };
};