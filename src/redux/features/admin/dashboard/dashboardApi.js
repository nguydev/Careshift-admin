import { baseApi } from "../../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // stack get api
    dashboardStack: builder.query({
      query: () => {
        return {
          url: `admin/dashboard/stacks`,
          method: "GET",
        };
      },
      providesTags: ["dashboard"],
    }),

    // chart get api
    workerJoiningChart: builder.query({
      query: (year) => {
        return {
          url: `admin/dashboard/user-chart?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useDashboardStackQuery, useWorkerJoiningChartQuery } =
  dashboardApi;
