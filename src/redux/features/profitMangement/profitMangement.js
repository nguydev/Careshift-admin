import { baseApi } from "../../api/baseApi";

const profitMangementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalProfit: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/profit-filter`,
          method: "GET",
          params,
        };
      },
      // providesTags: ["shift-appli"],
    }),
    filteredProfitDetails: builder.query({
      query: ({ id, args }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/profit-filter-details/${id}`,
          method: "GET",
          params,
        };
      },
      // providesTags: ["shift-appli"],
    }),
  }),
});

export const { useGetTotalProfitQuery, useFilteredProfitDetailsQuery } =
  profitMangementApi;
