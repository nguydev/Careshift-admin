import { baseApi } from "../../../api/baseApi";

const manageWorkerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    dashboardJobs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `job/my-jobs`,
          method: "GET",
          params,
        };
      },
      providesTags: ["jobs"],
    }),
    //

    // get all workers
    getManageWorkers: builder.query({
      query: ({
        page,
        limit,
        gender,
        role,
        language,
        suburb,
        state,
        searchQ,
      }) => {
        return {
          url: `admin/dashboard/workers`,
          method: "GET",
          params: {
            page,
            limit,
            gender,
            role,
            language,
            suburb,
            state,
            searchQ,
          },
        };
      },
      providesTags: ["worker"],
    }),

    // get worker details
    getWorkerDetails: builder.query({
      query: (id) => {
        return {
          url: `admin/dashboard/worker/${id}`,
          method: "GET",
          // params: {},
        };
      },
      providesTags: ["worker"],
    }),

    updateWorkerStatus: builder.mutation({
      query: ({ id, status }) => {
        console.log(id, status);
        return {
          url: `admin/dashboard/update-wstatus/${id}?status=${status}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["worker"],
    }),

    approveWorker: builder.mutation({
      query: ({ docId, body }) => {
        return {
          url: `document/update/${docId}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["worker"],
    }),

    // get worker earnings
    getWorkerMontlyEarnings: builder.query({
      query: (id) => {
        return {
          url: `admin/monthly-history/${id}`,
          method: `GET`,
        };
      },
      providesTags: ["worker"],
    }),

    getWorkerDailyEarnings: builder.query({
      query: ({ id, ...params }) => {
        return {
          url: `admin/daily-history/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["worker"],
    }),

    // payment
    workerPaymentStatus: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `admin/payment-status/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["worker"],
    }),
    // worker schedule get
    getWorkerSchedule: builder.query({
      query: ({ id, date }) => {
        return {
          url: `admin/schedule/${id}?date=${date}`,
          method: "GET",
          // params: { date },
        };
      },
      providesTags: ["worker"],
    }),

    // delete worker
    deleteWorker: builder.mutation({
      query: (id) => {
        return {
          url: `auth/account-delete`,
          method: `DELETE`,
          params: { id },
        };
      },
      invalidatesTags: ["worker"],
    }),
  }),
});

export const {
  useGetManageWorkersQuery,
  useGetWorkerDetailsQuery,
  useUpdateWorkerStatusMutation,
  useApproveWorkerMutation,
  useGetWorkerMontlyEarningsQuery,
  useGetWorkerDailyEarningsQuery,
  useWorkerPaymentStatusMutation,
  useGetWorkerScheduleQuery,
  useDeleteWorkerMutation,
} = manageWorkerApi;
