import { baseApi } from "../../../api/baseApi";

const shiftManageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShift: builder.mutation({
      query: (data) => {
        return {
          url: `shift`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shift"],
    }),
    allShifts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/shifts`,
          method: "GET",
          params,
        };
      },
      providesTags: ["shift"],
    }),
    shiftDetails: builder.query({
      query: (id) => {
        return {
          url: `admin/shift/get/${id}`,
          method: "GET",
          // params,
        };
      },
      providesTags: ["shift"],
    }),
    shortlyShiftDetails: builder.query({
      query: (id) => {
        return {
          url: `admin/shift/get-mini/${id}`,
          method: "GET",
          // params,
        };
      },
      providesTags: ["shift"],
    }),
    shiftStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `admin/shift/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["shift", "shift-appli"],
    }),
    // application
    shiftApplications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/shift`,
          method: "GET",
          params,
        };
      },
      providesTags: ["shift-appli"],
    }),
    appliedWorkers: builder.query({
      query: ({ id, args }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/shift-applyedWorker/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["shift-appli"],
    }),
    shiftAssign: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `shift/action/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["shift-appli"],
    }),
    // jobEdit: builder.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `job/${id}`,
    //       method: "PUT",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["jobs"],
    // }),
    // dashboardJobs: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: `job/my-jobs`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["jobs"],
    // }),
    // dashSingleJobs: builder.query({
    //   query: (id) => {
    //     // const params = new URLSearchParams();
    //     // if (args) {
    //     //     args.forEach((item) => {
    //     //         params.append(item.name, item.value);
    //     //     });
    //     // }
    //     return {
    //       url: `job/single/${id}`,
    //       method: "GET",
    //       // params,
    //     };
    //   },
    //   providesTags: ["jobs"],
    // }),
    // relatedJobs: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `job/related-jobs/${id}`,
    //       method: "GET",
    //       // params,
    //     };
    //   },
    //   providesTags: ["jobs"],
    // }),
    // alertJobs: builder.query({
    //   query: () => {
    //     return {
    //       url: `job/my-job-alerts`,
    //       method: "GET",
    //       // params,
    //     };
    //   },
    //   providesTags: ["jobs", "auth"],
    // }),
    // deleteJob: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `job/delete-job/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["jobs"],
    // }),
  }),
});

export const {
  useCreateShiftMutation,
  useAllShiftsQuery,
  useShiftApplicationsQuery,
  useShiftStatusMutation,
  useShiftDetailsQuery,
  useShortlyShiftDetailsQuery,
  useAppliedWorkersQuery,
  useShiftAssignMutation,
} = shiftManageApi;
