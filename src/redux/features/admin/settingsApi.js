import { baseApi } from "../../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ** about** //
    getAbout: builder.query({
      query: () => {
        return {
          url: "about",
          method: "GET",
        };
      },
      providesTags: ["about"],
    }),
    aboutUpdate: builder.mutation({
      query: (body) => {
        return {
          url: "about/update",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["about"],
    }),
    // ** trams** //
    trems: builder.query({
      query: () => {
        return {
          url: "terms",
          method: "GET",
        };
      },
      providesTags: ["trams"],
    }),
    updateTrams: builder.mutation({
      query: (body) => {
        console.log({ body });
        return {
          url: "terms/update",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["trams"],
    }),

    // ** Privacy ** //
    privacy: builder.query({
      query: () => {
        return {
          url: `/privacy`,
          method: "GET",
        };
      },
      providesTags: ["privacy"],
    }),
    updatePrivacy: builder.mutation({
      query: (body) => {
        return {
          url: `privacy/update`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["privacy"],
    }),
    // incident
    reportIncedent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "incident/get",
          method: "GET",
          params,
        };
      },
      //   providesTags: ["trams"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useAboutUpdateMutation,
  useTremsQuery,
  useUpdateTramsMutation,
  usePrivacyQuery,
  useUpdatePrivacyMutation,
  useReportIncedentQuery,
} = settingsApi;
