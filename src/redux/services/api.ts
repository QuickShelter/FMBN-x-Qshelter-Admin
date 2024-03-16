// Need to use the React-specific entry point to import createApi
// https://redux-toolkit.js.org/rtk-query/usage/mutations

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  IApplication,
  IAuth,
  IDevApiDocument,
  IDevApiDocumentStatusUpdateDto,
  IDevApiPagination,
  IDevApiProposedDevelopmentDeclineDto,
  IDevApiProposedDevelopmentStatusUpdateDto,
  IDevApiResponse,
  IDeveloper,
  ILoginActivity,
  IMortgageStatus,
  IPaginatedPropertyResponse,
  IPaginatedPropertyResponseBody,
  IPaginatedRequestResponse,
  IPaginatedRequestResponseBody,
  IPaginatedTransactionResponse,
  IPaginatedTransactionResponseBody,
  IPaginatedUserResponse,
  IPaginatedUserResponseBody,
  IPaginationData,
  IPriceUpdateStatus,
  IProfileDto,
  IProjectSearchParams,
  IPropertiesMetric,
  IProperty,
  IPropertySearchParams,
  IPropertyUpdateDto,
  IPropertyUploadStatus,
  IProject,
  IRequest,
  IRequestType,
  IRequestsMetric,
  IRequestsSearchParams,
  IResponse,
  ISignInDto,
  ISignUpDto,
  ISuspendUserDto,
  ITransaction,
  ITransactionsSearchParams,
  IUser,
  IUserMetric,
  IUserSearchParams,
  IBuildingEditDto,
  IBuildingAmenitiesEditDto,
  IApprovalStats,
  IMortgageResponse,
  IDashboardStats,
  IMakeAdminDto,
  IMortgageRequest,
  IProjectExportParams,
  IDeveloperUpdateDto,
  IRestCountryData,
  IRequestStatusChangeDto,
  IUnitUpdateDto,
  IApartment,
  IPropertyPriceChangeApprovalDto,
  IOutrightApprovalDto,
  IMilestoneUpdateApprovalDto,
} from "../../types";
import EnvironmentHelper from "@/helpers/EnvironmentHelper";
import { formatDate } from "@/helpers/dateFormat";
import ImageHelper from "@/helpers/ImageHelper";

const BULK_ID = "LIST";
const LIMIT = EnvironmentHelper.PAGINATION_LIMIT

// Define a service using a base URL and expected endpoints

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#common-usage-patterns
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      const userId = (getState() as RootState).auth.profile?.id;

      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
      headers.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PUT,DELETE");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("user_id", `${userId}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Property",
    "Profile",
    "User",
    "Request",
    "LoginActivities",
    "Transaction",
    "Project",
    'Developer',
    "Developer Documents",
    "Dashboard Stats",
    "Countries"
  ],
  endpoints: (builder) => ({
    signUp: builder.mutation<{ token: string; user: IUser }, ISignUpDto>({
      // AUTHENTICATION
      query: (credentials: ISignUpDto) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: credentials,
        };
      },
    }),
    signIn: builder.mutation<IResponse<IAuth>, ISignInDto>({
      query: (credentials: ISignInDto) => ({
        url: "/onboarding/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getApplicationById: builder.query<
      IApplication,
      { id: string | undefined, user_id: string }
    >({
      query: ({ id, user_id }) => {
        if (!id || id == "") {
          throw new Error("ID is required.");
        }

        return {
          url: `/apply/api/get-application`,
          method: "GET",
          params: { id, user_id }
        };
      },
      //providesTags: ["Profile"],
      transformResponse: (response: IResponse<IApplication>) => {
        return response.body;
      },
    }),
    getDashboardStats: builder.query<
      IDashboardStats,
      void
    >({
      query: () => {
        return {
          url: `/onboarding/dashboard-data`,
          method: "GET"
        };
      },
      //providesTags: ["Profile"],
      transformResponse: (response: IResponse<IDashboardStats>) => {
        return response.body;
      },
    }),

    approveOutrightPurchase: builder.mutation<IResponse<IRequest>, IOutrightApprovalDto>({
      query: (body) => {
        return {
          method: 'POST',
          url: `/apply/approve-outright`,
          body
        };
      },
      invalidatesTags: () => ['Request', 'Property'],
    }),

    declineOutrightPurchase: builder.mutation<IResponse<IRequest>, IOutrightApprovalDto>({
      query: (body) => {
        return {
          method: 'POST',
          url: `/apply/decline-outright`,
          body
        };
      },
      invalidatesTags: () => ['Request', 'Property'],
    }),

    getApplicationsByPropertyId: builder.query<
      IPaginationData<IApplication>,
      string | undefined
    >({
      query: (id: string | undefined) => {
        if (!id || id == "") {
          throw new Error("ID is required.");
        }

        return {
          url: `/apply/api/mortgage-applications/${id}`,
          method: "GET",
        };
      },
      //providesTags: ["Profile"],
      // transformResponse: (response: IPaginationResponse<IApplication>) => {
      //   return response.body;
      // },
    }),

    getProfile: builder.query<IUser, string>({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // PROPERTIES
    getAllProperties: builder.query<
      IPaginatedPropertyResponseBody,
      IPropertySearchParams
    >({
      query: (params: IProjectSearchParams) => {
        return {
          url: `/propy/filter-properties`,
          params: { ...params, limit: LIMIT },
        };
      },
      transformResponse: (response: IPaginatedPropertyResponse) => {
        return response.body;
      },
      providesTags: () => ["Property"],
    }),
    getPropertiesMetric: builder.query<IPropertiesMetric, string>({
      query: () => ({
        url: `/backoffice/api/properties-metric`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Property", id: "Properties_metric" }],
    }),

    addProperty: builder.mutation<Response, FormData>({
      query: (book: FormData) => ({
        url: `/properties`,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Property"],
    }),

    getPropertyById: builder.query<IProperty, string>({
      query: (id) => {
        return {
          url: `/propy/get-property`,
          params: { id },
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Property", id }],
      transformResponse: (response: IResponse<{ property: IProperty }>) => {
        return response.body.property;
      },
    }),
    approvePriceChange: builder.mutation<IResponse<IRequest>, IPropertyPriceChangeApprovalDto>({
      query: (body) => {
        return {
          method: 'POST',
          url: `/propy/approve-price-change`,
          //params: { id },
          body
        };
      },
      invalidatesTags: () => ['Request', 'Property'],
    }),

    approveMilestoneUpdate: builder.mutation<IResponse<IRequest>, IMilestoneUpdateApprovalDto>({
      query: (body) => {
        return {
          method: 'POST',
          url: `/propy/approve-milestone`,
          body
        };
      },
      invalidatesTags: () => ['Request', 'Property'],
    }),

    deleteProperty: builder.mutation<
      Response,
      { id: string; user_id: string }
    >({
      query: ({ id, user_id }) => ({
        url: `propy/delete-property`,
        method: "POST",
        body: {
          user_id,
          id
        },
      }),
      invalidatesTags: ['Property', { type: "Property", id: BULK_ID }],
    }),
    updatePropertyById: builder.mutation<
      IResponse<IProperty>, IPropertyUpdateDto
    >({
      query: ({ display_image, aerial_image, floor_plan_image, model_3d_image, ...dto }) => {

        if (!dto.price) {
          delete dto.price
        }

        if (!dto.youtube_url) {
          delete dto.youtube_url
        }

        const payload = {
          ...dto,
          display_image: ImageHelper.prepImagesForRequest(display_image)?.[0], // Because display image is not an array
          aerial_image: ImageHelper.prepImagesForRequest(aerial_image),
          floor_plan_image: ImageHelper.prepImagesForRequest(floor_plan_image),
          model_3d_image: ImageHelper.prepImagesForRequest(model_3d_image),
        }

        return {
          url: `propy/edit-property`,
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "Property", id: arg.property_id },
        'Request'
      ],
    }),
    updateUnitById: builder.mutation<
      IResponse<IApartment>, IUnitUpdateDto | IUnitUpdateDto[]
    >({
      query: (payload) => {
        return {
          url: `propy/edit-property-unit`,
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: () => [
        'Property',
      ],
    }),

    approveProperty: builder.mutation<
      IResponse<IProperty>,
      {
        id: string | number;
      }
    >({
      query: ({ id }) => ({
        url: `propy/approve-property`,
        method: "POST",
        body: {
          id,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Property", id: arg.id },
      ],
    }),

    declineProperty: builder.mutation<
      IResponse<IProperty>,
      {
        id: string | number;
      }
    >({
      query: ({ id }) => ({
        url: `propy/reject-property`,
        method: "POST",
        body: {
          id,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Property", id: arg.id },
      ],
    }),
    updateBlock: builder.mutation<
      IResponse<IProperty>,
      IBuildingEditDto | IBuildingAmenitiesEditDto
    >({
      query: ({ amenities, ...rest }) => ({
        url: "propy/edit-property-building",
        method: "POST",
        body: {
          amenities,
          ...rest,
        },
      }),
      invalidatesTags: [
        "Property",
      ],
    }),
    deletePropertyImage: builder.mutation<IResponse<IProperty>, { id: string }>(
      {
        query: ({ id }) => ({
          url: `propy/api/photo/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Property"],
      }
    ),
    uploadPropertyImage: builder.mutation<IResponse<IProperty>, FormData>({
      query: (data: FormData) => ({
        url: `propy/api/property/image/upload`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),

    // Mortgage Document
    updateMortgageDocumentStatus: builder.mutation<
      IMortgageResponse<string[]>,
      {
        id: string;
        status: string;
      }
    >({
      query: ({ id, status }) => ({
        url: `/mortgage/api/update-doc-status/${id}`,
        method: "PUT",
        body: {
          status,
        },
      }),
      invalidatesTags: ["Property", "Request"],
    }),

    // Mortgage Application
    updateMortgageApplicationStatus: builder.mutation<
      IResponse<IRequest>,
      {
        id: string;
        admin_id: string;
        status: IMortgageStatus;
        file?: string,
        comment?: string,
        is_online_payment?: boolean
      }
    >({
      query: ({ id, admin_id, status, is_online_payment,
        comment,
        file }) => {
        let payload = {}
        const _comment = (comment && comment.length > 0) ? comment : status

        if (file) {
          const formData = new FormData()
          formData.append("status", status)
          formData.append("admin_id", admin_id)
          formData.append("comment", _comment)
          formData.append("file", file)

          formData.append("is_online_payment", is_online_payment ? "true" : "false")

          payload = formData
        } else {
          payload = { admin_id, status, comment: _comment }
        }

        return {
          url: `/mortgage/api/change-status/${id}`,
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: ["Request"],
    }),

    // Mortgage Application
    deleteMortgage: builder.mutation<
      IResponse<IRequest>,
      string
    >({
      query: (
        id,
      ) => {
        return {
          url: `/mortgage/api/admin/delete/mortgage/${id}`,
          method: "DELETE"
        }
      },
      invalidatesTags: ["Request"],
    }),

    getMortgageActivitiesByApplicationId: builder.query<
      IRequest[], string | null | undefined
    >({
      query: (id) => {
        if (!id || id == "") {
          throw new Error("ID is required.");
        }

        return {
          url: `/mortgage/api/mortgage-activities/${id}`,
          method: "GET"
        }
      },
      transformResponse: (response: IResponse<IRequest[]>) => {
        return response.body;
      },
    }),

    // Property Document
    updatePropertyDocumentStatus: builder.mutation<
      Response,
      {
        id: string;
        admin_id: string | number;
        status: string;
        comment?: string;
      }
    >({
      query: ({ id, admin_id, status, comment }) => ({
        url: `propy/api/property/approve/${id}`,
        method: "PUT",
        body: {
          admin_id,
          status,
          comment,
        },
      }),
      invalidatesTags: ["Property"],
    }),

    // USERS
    getAllUsers: builder.query<
      IPaginatedUserResponseBody,
      IUserSearchParams
    >({
      query: (params: IUserSearchParams) => {
        return {
          url: `onboarding/filter-users`,
          params: {
            ...params,
            limit: LIMIT,
          },
        };
      },
      transformResponse: (response: IPaginatedUserResponse) => {
        return response.body;
      },
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: () => ["User"],
    }),

    updateProfile: builder.mutation<IResponse<IUser>, IProfileDto>({
      query: ({ id, ...body }) => {
        return {
          url: `onboarding/update-details`,
          method: 'POST',
          params: { id },
          body
        };
      },
      invalidatesTags: (_result, _error, { id }) => ["User", { type: "User", id }],
    }),

    getUserById: builder.query<IUser, { id: string; user_id: string }>({
      query: ({ id, user_id }) => {
        if (!id || id == "") {
          throw new Error("ID is required.");
        }

        return { url: `onboarding/get-user`, params: { user_id, id } };
      },
      providesTags: (_result, _error, { id }) => [{ type: "User", id }],
      transformResponse: (response: IResponse<{ user: IUser }>) => {
        return response.body.user;
      },
    }),
    getUserByEmail: builder.query<IUser, string>({
      query: (email) => `auth/api/v1/user-email/${email}`,
      providesTags: (_result, _error, email) => [{ type: "User", email }],
      transformResponse: (response: { data: IUser }) => {
        return response.data;
      },
    }),
    getUserMetric: builder.query<IUserMetric, string>({
      query: () => ({
        url: `/backoffice/api/users-metric`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User", id: "User_metric" }],
    }),
    addUser: builder.mutation<Response, FormData>({
      query: (userData: FormData) => ({
        url: `/users`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User", id: BULK_ID }],
    }),
    addToRole: builder.mutation<Response, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/backoffice/api/make-admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "User", id: BULK_ID }],
    }),
    updateUserById: builder.mutation<
      IResponse<IUser>,
      { id: string; user: IProfileDto }
    >({
      query: ({ id, user }) => ({
        url: `/backoffice/api/update/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "User", id: arg.id }],
    }),
    updateAvatar: builder.mutation<
      IResponse<Pick<IUser, "avatar">>,
      { avatar: FormData }
    >({
      query: ({ avatar: avatar }) => ({
        url: `auth/api/v1/admin/upload-avatar`,
        method: "POST",
        body: avatar,
      }),
      invalidatesTags: () => [{ type: "User", id: "avatar" }],
    }),
    deleteUserById: builder.mutation<Response, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: BULK_ID }],
    }),

    // REQUESTS
    getAllRequests: builder.query<
      IPaginatedRequestResponseBody,
      IRequestsSearchParams
    >({
      query: (params: IRequestsSearchParams) => ({
        url: `/request/list-requests`,
        params: { ...params, limit: LIMIT },
      }),
      transformResponse: (response: IPaginatedRequestResponse) => {
        return response.body;
      },
      providesTags: () => ["Request"],
    }),
    // Export
    getRequestsForExport: builder.query<
      IRequest[],
      Pick<IRequestsSearchParams, "from_date" | "to_date">
    >({
      query: (params: IRequestsSearchParams) => ({
        url: `/requests/api/requests`,
        params,
      }),
      transformResponse: (response: {
        data: IRequest[];
        message: string;
        success: boolean;
      }) => {
        return response.data;
      },
      providesTags: () => ["Request"],
    }),
    getRequestsMetric: builder.query<IRequestsMetric, string>({
      query: () => ({
        url: `/backoffice/api/requests-metric`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Request", id: "request_metric" }],
    }),
    addRequest: builder.mutation<Response, FormData>({
      query: (data: FormData) => ({
        url: `/requests`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Request", id: BULK_ID }],
    }),
    updateRequestById: builder.mutation<
      IResponse<IRequest>, IRequestStatusChangeDto
    >({
      query: ({ id, ...body }) => ({
        url: `/requests/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "User", id: arg.id }],
    }),
    updateRequestStatus: builder.mutation<
      IResponse<IRequest>,
      {
        id: string | number;
        admin_id: string | number | undefined;
        status: string;
        type: IRequestType;
        comment: string;
      }
    >({
      query: ({ id, status, type, comment, admin_id }) => ({
        url: `/requests/api/request/${id}`,
        method: "PUT",
        body: {
          admin_id,
          status,
          type,
          comment,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Request", id: arg.id },
      ],
    }),
    changePropertyUploadStatus: builder.mutation<
      IResponse<IProperty>,
      {
        id: string;
        admin_id: string | number | undefined;
        status: IPropertyUploadStatus;
        comment: string;
        request_id: string;
      }
    >({
      query: ({ id, status, comment, admin_id }) => ({
        url: `/propy/api/property/approve/${id}`,
        method: "PUT",
        body: {
          admin_id,
          status,
          comment,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Property",
        { type: "Request", id: arg.request_id },
      ],
    }),
    changePriceUpdateStatus: builder.mutation<
      IResponse<IProperty>,
      {
        id: string | number;
        admin_id: string | number | undefined;
        status: IPriceUpdateStatus;
        comment: string;
        request_id: string;
      }
    >({
      query: ({ id, status, comment, admin_id }) => ({
        url: `/propy/api/price/approve/${id}`,
        method: "PUT",
        body: {
          admin_id,
          status,
          comment,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Property",
        { type: "Request", id: arg.request_id },
      ],
    }),
    getRequestById: builder.query<IRequest, { id: string; user_id: string }>({
      query: ({ id, user_id }) => {
        return {
          url: "/request/get-request",
          params: { user_id, id },
        };
      },
      providesTags: (_result, _error, { id }) => [{ type: "Request", id }],
      transformResponse: (response: IResponse<{ request: IRequest }>) => {
        return response?.body?.request;
      },
    }),
    getRequestByUnitId: builder.query<IMortgageRequest, { id: string; user_id: string }>({
      query: ({ id, user_id }) => {
        return {
          url: "/request/get-request-by-unit-id",
          params: { user_id, unit_id: id },
        };
      },
      providesTags: (_result, _error, { id }) => [{ type: "Request", id }],
      transformResponse: (response: IResponse<{ request: IMortgageRequest }>) => {
        return response.body.request;
      },
    }),
    approveDocumentById: builder.query<IRequest, string>({
      query: (id) => `/requests/api/request/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Request", id }],
    }),
    deleteRequestById: builder.mutation<Response, string>({
      query: (id: string | number) => ({
        url: `/requests/api/request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Request", id: BULK_ID }],
    }),

    // LOGIN ACTIVITIES
    getAllLoginActivities: builder.query<ILoginActivity[], void>({
      query: () => ({
        url: `/login-activities`,
      }),
      providesTags: ["LoginActivities"],
    }),

    // TRANSACTIONS
    getAllTransactions: builder.query<
      IPaginatedTransactionResponseBody,
      ITransactionsSearchParams
    >({
      query: (params: ITransactionsSearchParams) => ({
        url: `/wallet/list-all-transactions`,
        params,
      }),
      transformResponse: (response: IPaginatedTransactionResponse) => {
        return response.body;
      },
      providesTags: () => ["Transaction"],
    }),

    getTransactionById: builder.query<ITransaction, { transaction_id: string, user_id: string }>({
      query: ({ user_id, transaction_id }) => ({
        url: `/wallet/get-transaction-admin`,
        params: {
          user_id,
          transaction_id
        }
      }),
      transformResponse: (response: IResponse<{ transaction: ITransaction }>) => {
        return response.body.transaction;
      },
      providesTags: (_result, _error, { transaction_id: id }) => [{ type: "Transaction", id }],
    }),

    // PROJECTS
    getAllProjects: builder.query<
      IDevApiPagination<IProject>,
      ITransactionsSearchParams
    >({
      query: ({ status, from_date, to_date, ...rest }: IProjectSearchParams) => {
        let dateParam = {}
        const dateRangeKey = 'filter.createdAt'

        if (!from_date && to_date) {
          dateParam = { [dateRangeKey]: `$gte:${formatDate(new Date(to_date))}` }
        } else if (from_date && !to_date) {
          dateParam = { [dateRangeKey]: `$gte:${formatDate(new Date(from_date))}` }
        } else if (from_date && to_date) {
          dateParam = { [dateRangeKey]: `$gte:${formatDate(new Date(from_date))}&${dateRangeKey}:$gte:${formatDate(new Date(to_date))}` }
        }

        console.log(dateParam)

        return {
          url: `/developer/api/proposed-developments/paginate`,
          params: { ...rest, 'filter.status': status, ...dateParam },
        }
      },
      transformResponse: (
        response: IDevApiResponse<IDevApiPagination<IProject>>
      ) => {
        return response.data;
      },
      providesTags: () => ["Project"],
    }),

    getAllProjectsByDateRange: builder.query<
      IProject[],
      IProjectExportParams
    >({
      query: (params) => {
        return {
          url: `/developer/api/proposed-developments/by-date-range`,
          params
        }
      },
      transformResponse: (
        response: IDevApiResponse<IProject[]>
      ) => {
        return response.data;
      },
      providesTags: () => ["Project"],
    }),

    getProjectById: builder.query<IProject, string>({
      query: (id) => `/developer/api/proposed-developments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
      transformResponse: (response: { data: IProject }) => {
        return response.data;
      },
    }),

    deleteProjectById: builder.mutation<IProject, string>({
      query: (id) => ({
        url: `/developer/api/proposed-developments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project'],
    }),

    getProjectsStats: builder.query<IApprovalStats, void>({
      query: () => "/developer/api/proposed-developments/stats",
      transformResponse: (response: IDevApiResponse<IApprovalStats>) => {
        return response.data;
      },
    }),

    getProjectsByUserId: builder.query<IProject[], string>({
      query: (id) => `/developer/api/proposed-developments/by-user/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
      transformResponse: (response: IDevApiResponse<IProject[]>) => {
        return response.data;
      },
    }),

    // DEVELOPER ONBOARDING DOCUMENTS
    getDocumentsByUserId: builder.query<IDevApiDocument[], string>({
      query: (id) => `/developer/api/common/all-documents-by-user/${id}`,
      providesTags: () => ["Developer Documents"],
      transformResponse: (response: IDevApiResponse<IDevApiDocument[]>) => {
        return response.data;
      },
    }),

    getRefreshToken: builder.mutation<IResponse<IAuth>, undefined>({
      query: () => ({
        url: "/onboarding/refresh",
        method: "POST",
      }),
    }),

    makeAdmin: builder.mutation<
      IResponse<IUser>,
      IMakeAdminDto
    >({
      query: (body) => ({
        url: "/onboarding/make-admin",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "User",
        { type: "User", id: arg.id },
      ],
      // transformResponse: (response: IResponse<IUser>) => {
      //   return response.body;
      // },
    }),

    suspendUnsuspendUser: builder.mutation<
      IUser,
      ISuspendUserDto
    >({
      query: (body) => ({
        url: "/onboarding/suspend-unsuspend",
        method: "POST",
        body: {
          id: body.id,
          user_id: body.user_id
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "User",
        { type: "User", id: arg.id },
      ],
      transformResponse: (response: IResponse<IUser>) => {
        return response.body;
      },
    }),

    updateDevApiDocumentStatus: builder.mutation<
      IResponse<IDevApiDocument>,
      IDevApiDocumentStatusUpdateDto
    >({
      query: ({ type, id, status, user_id, declineReason }) => ({
        url: `/developer/api/${type}/${id}/update-status`,
        method: "POST",
        body: {
          status: status,
          reviewerId: user_id,
          declineReason
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Developer Documents", 'Project', 'Developer',
        { type: "Developer Documents", id: arg.id },
      ],
    }),


    getDeveloperByUserId: builder.query<IDeveloper, string>({
      query: (id) => `/developer/api/developers/by-user/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Developer", id }],
      transformResponse: (response: IDevApiResponse<IDeveloper>) => {
        return response.data;
      },
    }),

    getDeveloperById: builder.query<IDeveloper, string>({
      query: (id) => `/developer/api/developers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Developer", id }],
      transformResponse: (response: IDevApiResponse<IDeveloper>) => {
        return response.data;
      },
    }),

    updateDeveloper: builder.mutation<
      IDevApiResponse<IDeveloper>,
      IDeveloperUpdateDto
    >({
      query: ({ id, ...body }) => ({
        url: `/developer/api/developers/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Developer',
        { type: "Developer", id },
      ],
    }),

    updateProjectStatus: builder.mutation<
      IResponse<void>,
      IDevApiProposedDevelopmentStatusUpdateDto
    >({
      query: ({ id, status, user_id }) => ({
        url: `/developer/api/proposed-developments/${id}/update-status`,
        method: "POST",
        body: {
          status: status,
          reviewerId: user_id,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Project",
        { type: "Project", id: arg.id },
      ],
    }),

    declineProject: builder.mutation<
      IResponse<IProject>,
      IDevApiProposedDevelopmentDeclineDto
    >({
      query: ({ id, status, user_id, declineReason, affectedDocuments }) => ({
        url: `/developer/api/proposed-developments/${id}/decline`,
        method: "POST",
        body: {
          status: status,
          reviewerId: user_id,
          declineReason,
          affectedDocuments: JSON.stringify(affectedDocuments)
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Project",
        { type: "Project", id: arg.id },
      ],
    }),
    createPresignedUrl: builder.mutation<
      string,
      string | null
    >({
      query: (url) => {
        // if (!url || url == "") {
        //   throw new Error("URL is required.");
        // }

        return {
          url: "/uploader/api/document/presign",
          method: "POST",
          body: {
            url
          },
        }
      },
      transformResponse: (response: IDevApiResponse<string>) => {
        return response.data;
      },
    }),
    getCountries: builder.query<string[], void>({
      query: () => ({
        url: 'https://restcountries.com/v3.1/all?fields=name'
      }),
      providesTags: ['Countries'],
      transformResponse: (data: IRestCountryData[]) => {
        return data.map(datum => {
          return datum.name.common
        })
      }
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Countries
  useGetCountriesQuery,

  //Dashboard
  useGetDashboardStatsQuery,

  // Authentication and Profile
  useSignInMutation,
  useSignUpMutation,
  useGetProfileQuery,
  useGetRefreshTokenMutation,
  useMakeAdminMutation,

  // Developer onboarding documents
  useGetDocumentsByUserIdQuery,
  useUpdateDevApiDocumentStatusMutation,

  // Projects
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectsByUserIdQuery,
  useUpdateProjectStatusMutation,
  useLazyGetAllProjectsQuery,
  useLazyGetAllProjectsByDateRangeQuery,
  useDeclineProjectMutation,
  useGetProjectsStatsQuery,
  useDeleteProjectByIdMutation,

  // Developer
  useGetDeveloperByUserIdQuery,
  useUpdateDeveloperMutation,
  useGetDeveloperByIdQuery,

  // Presigner
  useCreatePresignedUrlMutation,

  // Users
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useAddToRoleMutation,
  useGetUserByIdQuery,
  useSuspendUnsuspendUserMutation,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useUpdateAvatarMutation,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useAddUserMutation,
  useGetUserMetricQuery,
  useUpdateProfileMutation,

  // Properties
  useGetAllPropertiesQuery,
  useGetPropertiesMetricQuery,
  useGetPropertyByIdQuery,
  useDeletePropertyImageMutation,
  useUpdatePropertyByIdMutation,
  useApprovePropertyMutation,
  useDeclinePropertyMutation,
  useAddPropertyMutation,
  useDeletePropertyMutation,
  useUploadPropertyImageMutation,
  useGetApplicationsByPropertyIdQuery,
  useUpdateBlockMutation,
  useUpdateUnitByIdMutation,
  useLazyGetAllPropertiesQuery,
  useApproveMilestoneUpdateMutation,


  // Application
  useGetApplicationByIdQuery,
  useApproveOutrightPurchaseMutation,
  useDeclineOutrightPurchaseMutation,

  // Requests
  useGetAllRequestsQuery,
  useGetRequestsMetricQuery,
  useGetRequestByIdQuery,
  useUpdateRequestByIdMutation,
  useAddRequestMutation,
  useDeleteRequestByIdMutation,
  useUpdateRequestStatusMutation,
  useGetRequestsForExportQuery,
  useLazyGetRequestsForExportQuery,
  useChangePriceUpdateStatusMutation,
  useChangePropertyUploadStatusMutation,
  useGetRequestByUnitIdQuery,
  useApprovePriceChangeMutation,
  useLazyGetAllRequestsQuery,

  // Mortgage
  useGetMortgageActivitiesByApplicationIdQuery,
  useDeleteMortgageMutation,

  //Mortgage Application Status
  useUpdateMortgageApplicationStatusMutation,
  useUpdateMortgageDocumentStatusMutation,

  // Transactions
  useGetAllTransactionsQuery,
  useLazyGetAllTransactionsQuery,

  // Settings
  useGetAllLoginActivitiesQuery,
  useGetTransactionByIdQuery,
} = api;
