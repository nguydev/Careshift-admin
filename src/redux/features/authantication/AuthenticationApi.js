import { baseApi } from "../../api/baseApi";

const authenticationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "auth/admin-login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/forget-password`,
          method: "POST",
          body: data,
        };
      },
    }),
    verifyEmail: builder.mutation({
      query: (data) => {
        return {
          url: `auth/verify-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
    // resendOtp: builder.mutation({
    //   query: () => {
    //     return {
    //       url: `user/resend`,
    //       method: "POST",
    //       // body: data,
    //     };
    //   },
    // }),

    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `auth/reset-password`,
          method: "POST",
          body,
        };
      },
    }),
    changePass: builder.mutation({
      query: (body) => {
        return {
          url: "auth/change-password",
          method: "POST",
          body,
        };
      },
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: `auth/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),
    updateAdminProfile: builder.mutation({
      query: (body) => {
        return {
          url: `auth/profile-update`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePassMutation,
  useGetProfileQuery,
  useUpdateAdminProfileMutation,
} = authenticationApi;
