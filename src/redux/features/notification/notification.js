import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `notification`,
          method: "GET",
          params: { page, limit },
        };
      },
      providesTags: ["auth"],
    }),
    pushNotification: builder.mutation({
      query: (data) => {
        return {
          url: `notification/send-push`,
          method: "POST",
          body: data,
        };
      },
    }),
    notificationUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/notification/workers`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const {
  useGetNotificationQuery,
  usePushNotificationMutation,
  useNotificationUsersQuery,
} = notificationApi;
