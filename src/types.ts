export interface StandardLoginResponseProps {
  data?: {
    user: IUser;
    authorisation: {
      token: string;
    };
  };
  message?: string;
  ok?: boolean;
  status?: number | string;
}

export interface INotificationCardData {
  id: string;
  heading: string;
  message: string;
  created_at: string;
}

export interface IPaginatedRequest {
  "id": string,
  "title": string | null,
  "type": IRequestType,
  "status": IRequestStatus,
  "reference_id": string,
  "requester_id": string,
  "full_desc": string,
  "created_at": string,
  "updated_at": string,
  "user": {
    "id": string,
    "first_name": string,
    "last_name": string | null,
    "email": string | null,
    "phone": string | null,
    "avatar": null | string
  },
  "property": {
    "title": string | null,
    "type": IPropertyType,
    "display_image": string | null,
    "status": IPropertyStatus,
    "state": string | null,
    "city": string | null,
    "address": string | null,
    "id": string
  }
}

export interface IUser {
  id: string,
  first_name: string | null,
  last_name: string | null,
  phone: string | null,
  email: string | null,
  password: string | null,
  email_verified: boolean | null,
  bvn_verified: boolean | null,
  bvn: string | null,
  roles: IRole[],
  avatar: string | null,
  gender: string | null,
  dob: string | null,
  country: string | null,
  is_first_time_login: boolean | null,
  identity_document: string | null,
  identity_document_verified: boolean | null,
  employment_status: string | null,
  monthly_net_salary: number | null,
  is_nhf_active: boolean | null,
  pfa: string | null,
  rsa: string | null,
  business_sector: string | null,
  years_of_work: number | null,
  suspended: boolean | null,
  created_at: string | null,
  updated_at: string | null

  // Possibly Unavailable
  // status: string | null;
  // middle_name: string | null;
  // phone_verified_at: string | null;
  // email_verified_at: string | null;
  // reset_token: string | null;
  // state: string | null;
  // city: string | null;
  // region: string | null;
  // address: string | null;
  // whatsapp_number: string | null;
  // account_bvn: string | null;
  // pension_fund_admin: string | null;
  // others: string | null;
  // deleted_at: string | null;
  // current_employer: string | null;
  // date_of_birth: string | null;
  // nature_of_business: string | null;
  // years_in_business: number | null;
  // monthly_turnover: string | null;
  // preferred_property_location: string | null;
  // last_login_ip: string | null;
  // phone_verification_code: string | null;
  // last_login_at: string | null;
  // verification_code_sent_at: string | null;
  // have_pension_account: string | null;
  // first_time_home_buyer: string | null;
  // properties?: IProperty[] | null;
}

export interface IUserMetric {
  data: [
    {
      total: number;
      total_sellers: number;
      total_buyers: number;
      total_admins: number;
    }
  ];
}

export interface IUserMetricData {
  total: number;
  total_sellers: number;
  total_buyers: number;
  total_admins: number;
}

export interface IRequestFilter {
  date_from?: string;
  date_to?: string;
  status?: string;
}

export interface IUserFilterDto {
  date_from: string;
  date_to: string;
}

export interface IUserSortDto {
  sort: string
}

export interface IProjectSort {
  sortBy?: IProjectSortType;
}

export type IProjectSortType = 'id:DESC' | 'id:ASC'

export interface IProjectFilter {
  from_date?: string;
  to_date?: string;
  sort?: ISortOrder;
}

export interface IRequestsMetric {
  data: [IRequestsMetricData];
}

export interface IRequestsMetricData {
  all_requests?: number;
  pending?: number;
  declined?: number;
  approved?: number;
  mortgage_application?: number;
  services?: number;
  property_upload?: number;
  price_change?: number;
}

export interface IPropertiesMetric {
  data: [
    {
      totalProperties?: number;
      total_completed?: number;
      total_land_infra?: null;
      total_off_plan?: null;
      total_mortgaging?: number;
    }
  ];
}

export interface PropertyDocument {
  url?: string;
  description?: string;
}

export interface IPropertiesMetricData {
  totalProperties?: number;
  total_completed?: number;
  total_land_infra?: null;
  total_off_plan?: null;
  total_mortgaging?: number;
}

export type IProfileDto = {
  // user_id: string,
  id: string;
  last_name: string;
  first_name: string;
  country: string;

  // avatar: IBase64Upload,
  // email: string;
  // dob: string;
  // phone_number: string;
};

export interface IDeveloperUpdateDto {
  operatingAddress: string;
  yearsOfOperation: number;
  tin: string;
  modeOfRegistration: IDeveloperModeOfRegistration | undefined;
  id: string
}

export type IEmploymentInfoDto = {
  address: string;
  business_sector: string;
  years_of_work: number;
  tin: string;
};

export interface ILoginActivity {
  location: string;
  accessedAt: string;
  device: string;
}

export interface ISignUpDto {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignInDto {
  identifier: string;
  password: string;
}

export interface IPhoto {
  id: string;
  property_id: string;
  is_featured: boolean;
  url: string;
  thumbnail_url: string;
  description: string;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type IUsersTab = "buyer" | "vendor" | "admin" | IRole | "";
export type IPropertiesTab = "" | "pending" | "approved" | "sold";
export type ITransactionsTab = "";
export type IRequestsTab =
  | ""
  | "property-upload"
  | "mortgage"
  | "inspections"
  | "services";

export type IMortgageStatus =
  | "send_offer_letter_from_bank"
  | "document_sent_to_bank"
  | "paid_equity"
  | "pending"
  | "approved"
  | "completed"
  | "declined";

export type IPropertyStatus = "pending" | "approved" | "rejected";

export type IPropertyType = "condominium" | "fully_detached_duplex" | "semi_detached_duplex" | "detached_bungalows" | "apartments" | "flats" | "terraces" | "maisonette" | "penthouse" | "terrace_bungalows"
  | "semi_detached_bungalow" | "terrace_duplex" | "fully_detached_duplex";

export type IPropertySaleStatus = "sold" | "available" | "locked";

export type IPropertyUploadStatus = "approved" | "declined" | "pending";
export type IPriceUpdateStatus = "approved" | "declined";

export type IToastType = "clear" | "error" | "warning" | "success";
export interface IToastState {
  message: string;
  type: IToastType;
  duration?: number;
  show: boolean;
}

export interface IToastSliceState {
  toasts: IToastState[],
  duration: number;
}

export type IPropertyFinishStatus = 'finished' | 'semi_finished'

export interface IAPIErrorData {
  error: string;
}

export interface IAPIError {
  status: number;
  data: {
    success: boolean;
    message: string;
    data: IAPIErrorData;
  };
}

export interface IAuthenticationError {
  status: string;
  data: {
    success: boolean;
    data: {
      error?: string;
    };
  };
}

export interface ITopCard {
  label: string;
  value?: number | string | null;
  subValue?: string | number | null;
}
[];

export interface IDetail {
  label: string;
  value: string;
}

export interface IApplicant {
  id: string;
  pfa: string | null;
  user_id: string;
  partner_code: string | null;
  current_employer: string | null;
  credit_score_id: string | null;
  former_employer: string | null;
  rsa_balance: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  date_of_birth: string | null;
  monthly_net_salary: number | null;
  employment_status: string | null;
  industry: string | null;
  years_in_business: string | null;
  monthly_net_income: number | null;
  have_pension: boolean;
  parent_id: string;
  user?: IUser;
  partner?: IPartner;
  documents: IApplicationDocument[];
}

export type IApplicationStatus = IMortgageStatus;

export interface IApplication {
  id: string;
  applicant_id: string;
  property_id: string;
  document_id: string | null;
  status: IApplicationStatus | IMortgageStatus;
  approval_date: string | null;
  closing_date: string | null;
  created_at: string;
  updated_at: string;
  application_data: string | null;
  deleted_at: string | null;
  is_joint_mortgage: boolean;
  is_principal_borrower: boolean;
  have_pension: boolean | null;
  accepted_offer: string | null;
  offer_letter_url: string | null;
  admin_id: string | null;
  comment: string | null;
  documents: IApplicationDocument[];
  property: IProperty;
  applicant: IApplicant;
}

export type IStatus = IDevApiStatus | IRequestStatus | IProjectStatus | IMortgageDocumentStatus | IRequestStatus | IPropertyStatus | IPropertySaleStatus | ITransactionStatus | IMortgageStatus | IUnitStatus

export type IRequestStatus =
  | "cancelled"
  | "on_going"
  | "completed"
  | 'applied'
  | "received"
  | "ready_for_mortgage" | IMortgageStatus;

export enum RequestType {
  developer_application = "developer_application",
  nhf = "nhf",
  rto = "rto",
  contribution = "contribution",
  outrightly_bought = "outrightly_bought",
  price_change = "price_change",
  support = "support",
  milestone = "milestone",
  services = "services",
  rsa = "rsa",
  application_form = "application_form",
  indication_of_interest = "indication_of_interest",
}

export type IRequestType =
  | "nhf"
  | "rto"
  | "rsa"
  | "commercial_mortgage"
  | "contribution"
  | "outrightly_bought"
  | "developer_application"
  | "price_change"
  | "property_price_change"
  | "support"
  | "property_milestone"
  | "indication_of_interest"
  | "application_form"
  | "services";



export interface IRequest {
  id: string;
  title: string | null;
  type: IRequestType;
  status: IRequestStatus;
  created_at: string | null;
  updated_at: string | null;
  reference_id: string | null;
  requester_id: string | null;
  full_desc: string | null;
}

export interface IRequestWithData {
  id: string;
  title: string;
  type: IRequestType;
  status: IRequestStatus;
  created_at: string;
  updated_at: string;
  reference_id: string;
  requester_id: string | null;
  full_desc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export type IPlan =
  | "nhf"
  | "rto"
  | "contribution"
  | "mortgage"
  | "buyoutrightly";

export interface IOffer {
  id: string;
}

export interface IBuyOutrightlyRequest extends IBasePropertyRequest {
  data: {
    id: string;
    user_id: string;
    property_id: string;
    apartment_ids: string | null;
    property?: IProperty;
    plan: IPlan;
    offers: IOffer[];
    status: IRequestStatus;
    initial_payment: number;
    initial_payment_made: boolean | null;
    initial_payment_currency: ICurrency;
    offer_accepted: boolean | null;
    total_price: number;
    created_at: string;
    updated_at: string;
    contributions?: IContribution[];
    milestones: IMilestone[]
  };
}

export interface IMortgageActivity {
  id: string,
  status: IMortgageStatus,
  comment: string | null,
  created_at: string | null,
  updated_at: string | null,
  mortgage_application_id: string | null
}

export interface IMilestone {
  id: string,
  desc: string | null,
  created_at: string | null,
  updated_at: string | null,
  application_id: string | null
}

export interface IPropertyMilestone {
  id: string,
  desc: string | null,
  media: string | null,
  updated_by: string | null,
  youtube_url: string | null,
  status: IStatus,
  status_reason: string | null,
  created_at: string | null,
  updated_at: string | null,
  deleted_at: string | null,
  property_id: string | null
}

export interface IRtoRequest extends IMortgageRequest {
}

export interface IPresignerCacheItem {
  orginal: string,
  presigned: string,
  expiration: number
}

export interface ISupportRequest extends IRequest {
  id: string,
  title: string | null,
  reference_id: string | null,
  requester_id: string | null,
  full_desc: string | null,
  created_at: string | null,
  updated_at: string | null,
  data: ISupportRequestData | null,
  user: object | null
}

export interface ISupportRequestPaginated extends IRequest {
  id: string,
  title: string | null,
  reference_id: string | null,
  requester_id: string | null,
  full_desc: string | null,
  created_at: string | null,
  updated_at: string | null,
  data: string | null,
  user: object | null
}

export interface ISupportRequestData {
  name: string | null
  email: string | null
  phone: string | null
  message: string | null
}

export interface IMilestoneUpdateRequest extends IRequest {
  data: IProperty;
}

export interface IBasePropertyRequestData {
  id: string;
  user_id: string;
  property_id: string;
  apartment_ids: string | null;
  property?: IProperty;
  plan: IPlan;
  offers: IOffer[];
  status: IRequestStatus;
  initial_payment: number;
  initial_payment_made: boolean | null;
  initial_payment_currency: ICurrency;
  offer_accepted: boolean | null;
  total_price: number;
  created_at: string;
  updated_at: string;
  contributions?: IContribution[];
  milestones: IMilestone[]
}



export interface IContributionRequest extends IBasePropertyRequest {
  data: IBasePropertyRequestData;
}

export interface IPriceChangeRequest extends IBasePropertyRequest {
  data: {
    id: string;
    user_id: string;
    property_id: string;
    apartment_ids: string | null;
    property?: IProperty;
    plan: IPlan;
    offers: IOffer[];
    status: IRequestStatus;
    initial_payment: number;
    initial_payment_made: boolean | null;
    initial_payment_currency: ICurrency;
    offer_accepted: boolean | null;
    total_price: number;
    created_at: string;
    updated_at: string;
    contributions?: IContribution[];
    milestones: IMilestone[]

    // Additions


    old_price: number,
    new_price: number,
    reason: string
  };
}

export interface IProjectExportParams {
  startDate: string,
  endDate: string
}

export type IExportFormat = 'csv' | 'pdf'

export interface IProjectExportDto extends IProjectExportParams {
  format: IExportFormat
}

export interface IExportDto {
  from_date: string;
  to_date: string;
  format: IExportFormat;
}

export interface ITransactionExportDto {
  from_date: string;
  to_date: string;
  format: IExportFormat;
  type: ITransactionType | undefined | ""
  status: ITransactionStatus | undefined | ""
}

export interface IInterestedPerson {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  message: string | null;
  budget: number | null;
}

export interface IIndicationOfInterestRequestPaginated extends IRequest {
  data: string;
}

export interface IApplicationFormRequestPaginated extends IRequest {
  data: string;
}

export interface IApplicationFormRequestNoFilePaginated extends IApplicationFormRequestPaginated {
  data: string;
}

export interface IApplicationFormRequestWithFilePaginated extends IApplicationFormRequestPaginated {
  data: string;
}


export interface IApplicationFormRequest extends IRequest {
  data: IApplicationFormData | IApplicationFormWithFileData
}

export interface IApplicationFormWithFileData {
  form_link: string | null,
  name: string | null,
  email: string | null
};

export interface IApplicationFormNoFileRequest extends IApplicationFormRequest {
  data: IApplicationFormData;
}

export interface IApplicationFormWithFileRequest extends IApplicationFormRequest {
  data: IApplicationFormWithFileData
}

export interface IMilestoneRequestPaginated extends IRequest {
  user: {
    id: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
  }
}

export interface IPropertyPriceChangeApprovalDto {
  user_id: string,
  id: string
}

export interface IMilestoneUpdateApprovalDto {
  user_id: string,
  id: string
}

export interface IApplicationFormData {
  property_type: IPropertyType | null,
  finished_type: IPropertyFinishStatus | null,
  payment_method: string | null,
  employment_status: string | null,
  name: string | null,
  gender: string | null,
  email: string | null,
  age: number | null,
  address: string | null,
  state_of_origin: string | null,
  city: string | null,
  nationality: string | null,
  occupation: string | null,
  next_of_kin: string | null,
  next_of_kin_relationship: string | null,
  next_of_kin_address: string | null,
  next_of_kin_phone: string | null,
  next_of_kin_email: string | null
}

export interface IIndicationOfInterestRequest extends IRequest {
  data: IInterestedPerson;
}

export interface IPaymentRequest extends IRequest {

}

export interface IRsaRequestPaginated extends IRequest {
  user: Pick<IUser, 'id' | 'first_name' | 'last_name' | 'email' | 'phone' | 'avatar'>
}

export interface IRsaRequest extends IRequest {
  data: {
    id: string;
    user_id: string;
    mortgage_application_id: string | null;
    documents: IMortgageDocument[] | null,
    created_at: string;
    updated_at: string;
    mortgage: IMortgage
  };
}

export interface IBasePropertyRequest extends IRequest {
  data: {
    id: string;
    user_id: string;
    property_id: string;
    apartment_ids: string | null;
    property?: IProperty;
    plan: IPlan;
    offers: IOffer[];
    status: IRequestStatus;
    initial_payment: number;
    initial_payment_made: boolean | null;
    initial_payment_currency: ICurrency;
    offer_accepted: boolean | null;
    total_price: number;
    created_at: string;
    updated_at: string;
    contributions?: IContribution[];
    milestones: IMilestone[]
  };
}

export interface IMortgageRequest extends IRequest {
  data: {
    id: string;
    user_id: string;
    property_id: string;
    apartment_ids: string | null;
    property: IProperty;
    plan: IPlan;
    offers: IOffer[];
    status: IRequestStatus;
    initial_payment: number;
    initial_payment_made: boolean | null;
    initial_payment_currency: ICurrency;
    offer_accepted: boolean | null;
    total_price: number;
    created_at: string;
    updated_at: string;
    contributions?: IContribution[];
    milestones: IMilestone[]
    mortgage: IMortgage
  };


}

export interface INhfRequest extends IMortgageRequest {
  data: {
    id: string;
    user_id: string;
    property_id: string;
    apartment_ids: string | null;
    property: IProperty;
    plan: IPlan;
    offers: IOffer[];
    status: IRequestStatus;
    initial_payment: number;
    initial_payment_made: boolean | null;
    initial_payment_currency: ICurrency;
    offer_accepted: boolean | null;
    total_price: number;
    created_at: string;
    updated_at: string;
    contributions?: IContribution[];
    milestones: IMilestone[]
    mortgage: IMortgage
  };


}

export interface IApplicationData {
  age: number | null;
  net_monthly_salary: number | null;
  interest_per_annum: number | null;
  rsa_balance: number | null;
  equity: number | null;
  equity_percentage: number | null;
  equity_from_rsa: number | null;
  rsa_percentage: number | null;
  mortgage_amount: number | null;
  duration: number | null;
}

export interface IMortgage {
  id: string;
  type: IRequestType;
  status: IMortgageStatus;
  comment: string | null;
  admin_id: string | null;
  created_at: string | null;
  deleted_at: string | null;
  updated_at: string | null;
  document_id: string | null;
  property_id: string | null;
  closing_date: string | null;
  have_pension: string | null;
  approval_date: string | null;
  accepted_offer: string | null;
  application_id: string | null;
  application_data: string | null;
  offer_letter_url: string | null,
  is_joint_mortgage: number | null,
  building_apartment_id: number | null,
  mortgage_applicant_id: number | null,
  mortgage_applicant: IMortgageApplicant,
  bank_statements: IBankStatement[],
  orders: string | null,
  mortgage_status_logs: IMortgageActivity[] | null,
  mortgage_application_documents: IMortgageDocument[]
}

export type ITopLevelRoleType = 'finance_admin' | 'mortgage_ops_admin' | 'legal_admin' | 'super_admin' | 'subscriber' | 'developer' | 'sales_admin'

export interface IMortgageDocument {
  id: string,
  url: string | null,
  name: string | null,
  type: string | null,
  status: IMortgageDocumentStatus,
  created_at: string | null,
  deleted_at: string | null,
  updated_at: string | null,
  approved_by: string | null,
  reference_id: string | null,
  admin_comment: string | null,
  documentable_id: string | null,
  admin_comment_by: string | null,
  reupload_counter: string | null,
  documentable_type: string | null
}

export type IMortgageDocumentStatus = 'pending' | 'declined' | 'approved'

export interface IMortgageStatusChangeDto {
  id: string,
  admin_id: string,
  status: IMortgageStatus,
  comment: string,
  affectedDocuments: string[],
}

export interface IRsaApprovalDto {
  id: string,
  admin_id: string,
  comment: string,
}

export interface IRequestStatusChangeDto {
  id: string,
  admin_id: string,
  status: IRequestStatus,
  comment: string,
  affectedDocuments: string[],
}



export interface IRequestApiDocumentStatusUpdateDto {
  status: IMortgageDocumentStatus,
  reason?: string,
  id: string
}

export interface IBankStatement {
  id: string,
  bvn: string | null,
  bank_name: string | null,
  created_at: string | null,
  deleted_at: string | null,
  updated_at: string | null,
  document_id: string | null,
  account_name: string | null,
  account_number: string | null,
  service_response: string | null,
  statement_pdf_url: string | null,
  statement_password: string | null,
  statement_json_blob: string | null,
  statement_ticket_no: string | null,
  account_phone_number: string | null,
  statement_request_id: string | null,
  mortgage_applicant_id: string | null
}

export interface IMortgageApplicant {
  id: string,
  pfa: string | null,
  tin: string | null;
  user_id: string | null,
  industry: string | null,
  parent_id: string | 0,
  created_at: string | null,
  deleted_at: string | null,
  updated_at: string | null,
  rsa_balance: string | null,
  have_pension: string | null,
  date_of_birth: string | null,
  credit_score_id: string | null,
  former_employer: string | null,
  current_employer: string | null,
  employment_status: string | null,
  years_in_business: string | null,
  monthly_net_income: string | null,
  monthly_net_salary: string | null,
  mortgage_applicant_documents: IMortgageDocument[]
}

export interface IPriceUpdateRequest extends IRequest {
  data: {
    id: string,
    poster_id: string,
    type: IPropertyType | null,
    units: number | null,
    multiple_buildings: number | null,
    buildings_count: 11 | null,
    model_3d_image: string | null,
    floor_plan_image: string | null,
    aerial_image: string | null,
    property_documents: string | null,
    title: string | null,
    address: string | null,
    state: string | null,
    city: string | null,
    price: number | null,
    created_at: string | null,
    updated_at: string | null,
    project_id: string | null,
    finished_status: IPropertyFinishStatus | null,
    display_image: string | null,
    youtube_url: null | null,
    status: IPropertyStatus | null,
    administrative_fee: number | null,
    deleted_at: string | null,
    project_property_id: string | null,
    pending_price: number | null
  }
}

export interface IPriceUpdateRequestPaginated extends IBasePropertyRequest {
  property: {
    title: string | null,
    type: IPropertyType | null,
    display_image: string | null,
    status: IPropertyStatus | null,
    state: string | null,
    city: string | null,
    address: string | null,
    id: string,
  };
  user: {
    id: string,
    first_name: string | null,
    last_name: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
  }
}

export interface IContribution {
  id: string;
  monthly_payment: number | null;
  total_paid: number;
  balance: number;
  duration: number | null;
  latest_start_date: string | null;
  created_at: string;
  updated_at: string;
  application_id: string;
}

export interface IPropertyUpload extends IRequest {
  property: IProperty;
}

export interface IPropertyUploadRequest extends IRequest {
  property: IProperty;
}

export type ITransactionType = "debit" | "credit";
export type ITransactionStatus = "completed" | "pending" | "failed" | "errored";
export type ICurrency = "NGN" | "USD";

export interface ITransaction {
  id: string;
  ref: string | null;
  amount: number;
  user_id: string;
  type: ITransactionType;
  status: ITransactionStatus;
  currency: ICurrency;
  provider: string | null;
  metadata: string | null;
  wallet_id: string;
  created_at: string;
  updated_at: string | null;
}

export type IUnitStatus = 'available' | 'sold' | 'mortgaging' | 'locked'

export interface IUnitUpdateDto {
  user_id: string,
  id: string
  name?: string | null,
  bedroom_count?: number | null,
  bathroom_count?: number | null,
  floor?: number | null,
  price?: number | null,
  available?: boolean | null;
  sold?: boolean | null;
}

export interface IUnitStatusUpdateDto {
  status: IUnitStatus;
  user_id: string,
  id: string
}

export interface ITransactionMetaData {
  sender_account_number?: string | null,
  sender_account_name?: string | null,
  paymentReference?: string | null,
  sessionid?: string | null,
  narration?: string | null,
  channel?: string | null,
  wallet_id?: 20 | null,
  message?: string | null
}

export interface IDevApiMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: string[][];
}

export interface IDevApiResponse<T> {
  message: string | null;
  statusCode: number;
  data: T;
}

export interface IDevApiPaginationResponse<T> {
  message: string | null;
  statusCode: number;
  data: IDevApiPagination<T>;
}

export interface IDevApiPagination<T> {
  data: T[];
  meta: IDevApiMeta;
  links: IDevApiPaginationLinks;
}

export interface IDevApiPaginationLinks {
  current: string;
}

export type IProjectStatus = "PENDING" | "APPROVED" | "DECLINED";

export type PresellCommitmentEvidence =
  | "DEPOSIT"
  | "BINDING_PRESALE_AGREEMENT"
  | "COOPERATIVE_MEMBERSHIP"
  | "OTHERS";

export type IOnboardingStageName =
  | "PRELIMINARY_EVALUATION"
  | "PROJECT_INFO_DOCUMENTS"
  | "TECHNICAL_DOCUMENTATION"
  | "SALES_STRATEGY"
  | "PROJECT_VIABILITY";

export interface IOnboardingStage {
  name: IOnboardingStageName;
  completed: boolean | null;
  completedAt: string | null;
}

export interface IAuth {
  user?: IUser;
  token: {
    authToken: string;
  };
}

export interface IAbstractResponse {
  ok?: boolean;
  message: string;
  status: number;
  success?: boolean
}

export interface IMortgageResponse<T> {
  success: boolean,
  data: T,
  message: string | null
}

export interface IResponse<T> extends IAbstractResponse {
  body: T;
}

export interface IPaginationResponse<T> {
  success: boolean;
  message: string;
  body: T;
}

export interface IPaginationData<T> {
  current_page: number;
  data: T[];
  from: number;
  first_page_url: string;
  links: IPaginationLink[];
  next_page_url: string;
  to: number;
  total: number;
  per_page: number;
  path: string;
}

export interface IBaseResponse {
  ok: boolean;
  message: string;
}

export interface IBasePaginationData {
  offset: number;
  limit: number;
}

export interface IPaginatedTransactionResponseBody {
  offset: number;
  limit: number;
  transactions: ITransaction[];
  total_count: number,
  total_pages: number
  transaction_volume: number | null
}

export interface IPaginatedRequestResponseBody {
  offset: number;
  limit: number;
  requests: IPaginatedRequest[];
  total_count: number,
  total_pages: number
}

export interface IPaginatedPropertyResponseBody {
  overview: {
    pending: number,
    sold: number,
    approved: number
    all: number
  },
  offset: number;
  limit: number;
  properties: IProperty[];
  total_count: number,
  total_pages: number
}

export type IAmenity = "POP" | "Swimming Pool" | "AC";

export interface IFakeProperty {
  property_documents: IPropertyDocument[] | undefined;
  id: string;
  title: string;
  created_by: string;
  img: string;
  code: string;
  created_at: string;
  description: string | null;
  address: string;
  tags: Array<string>;
  agent?: IUser | null;
  price: number;
  slug: string;
  status: IPropertyStatus;
  is_mortgage?: boolean;
  saleStatus?: IPropertySaleStatus;
  images: string[];
  photos: Array<IPhoto>;
  seller?: IUser;
  primary_photo_url: string;
  updated_at: string;
  approved_by: IUser;
  documents: IPropertyDocument[];
  type: IPropertyType;
  apartment_type: string;
  bedrooms: number;
  bathrooms: number;
  sameAsBedrooms: boolean;
  isPremium: boolean | undefined;
  isNhf: boolean | undefined;
  propertyInfo: string;
  user_id: string | null;
  admin_comment: string | null;
  is_active: boolean;
  ads_type: string | null;
  is_featured: boolean;
  size: number;
  total_room: number;
  parking: number;
  is_air_condition: boolean;
  toilets: number;
  longitude: number;
  latitude: number;
  postal_code: string;
  region: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  total_clicks: number;
  total_likes: number;
  new_price: number | null;
  new_price_comment: string | null;
  security: string | null;
  all_rooms_ensuite: boolean | null;
  boys_quarter: string | null;
  big_compound: string | null;
  cctv_camera: string | null;
  c_of_o: string | null;
  elevator: string | null;
  free_wifi: boolean | null;
  fully_furnished: boolean | null;
  gym: boolean | null;
  newly_built: boolean | null;
  pop_ceiling: boolean | null;
  serviced: boolean | null;
  swimming_pool: boolean | null;
  street_light: boolean | null;
  property_group: string | null;
  units: number;
  video_url_1: string | null;
  video_url_2: string | null;
  video_url_3: string | null;
}

export interface IProperty {
  id: string;
  poster_id: string;
  project_id: string;
  project_property_id: string | null;
  type: IPropertyType;
  units: number | null;
  multiple_buildings: true;
  buildings_count: number;
  finished_status: IPropertyFinishStatus;
  youtube_url: string | null;
  display_image: string | null;
  model_3d_image: string | null;
  floor_plan_image: string | null;
  aerial_image: string | null;
  administrative_fee: number | null;
  //property_documents: string | null;
  title: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  price: number;
  status: IPropertyStatus;
  //amenities: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  buildings: IBuilding[];
  milestones: IPropertyMilestone[];
  about?: string | null;
  pending_price?: null;

  //
  //photos?: IPhoto[];
  property_documents?: string | null;
  total_units?: number | null,
  total_sold?: number | null,
  total_available?: number | null,
}

export interface IRestCountryData {
  name: IRestCountryName
}

export interface IRestCountryName {
  common: string,
  official: string
}

export interface IOutrightApprovalDto {
  user_id: string,
  application_id: string
}

export interface IApartment {
  id: string;
  building_id: string;
  name: string | null;
  floor: number;
  bedroom_count: number | null;
  bathroom_count: number | null;
  available: boolean;
  sold: boolean;
  price: number;
  pending_price?: number | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;

  // Not real
  mortgaging?: boolean
}

export interface IApprovalStats {
  all: number,
  pending: number,
  approved: number,
  declined: number
}


export interface IBuilding {
  units?: number | null;
  id: string;
  property_id: string;
  name: string;
  apartment_count: number | null;
  bedroom_count: number | null;
  bathroom_count: number | null;
  floor_count: number | null;
  random_floor_position: boolean | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  apartments: IApartment[];
  amenities: string | null;
  total_units?: number | null,
  total_sold?: number | null,
  total_available?: number | null,
}

export interface IMakeAdminDto {
  user_id: string;
  id: string;
  roles: string[];
}


export interface IBuildingEditDto {
  user_id: string,
  building_id: string,
  name: string,
  bedroom_count?: number,
  bathroom_count?: number,
  floor_count?: number,
  amenities?: string[],
  units?: number
}

export interface IBuildingEditAmenitiesDto {
  user_id: string,
  building_id: string,
  name: string,
  bedroom_count?: number | null,
  bathroom_count?: number | null,
  floor_count?: number | null,
  amenities: string[],
  units?: number | null
}

export interface IBuildingAmenitiesEditDto {
  amenities: string[]

}

export interface IPaginatedTransactionResponse {
  success: boolean;
  message: string;
  body: IPaginatedTransactionResponseBody;
}

export interface IPaginatedRequestResponse {
  ok: boolean;
  message: string;
  body: IPaginatedRequestResponseBody;
}

export interface IPaginatedPropertyResponse {
  ok: boolean;
  message: string;
  body: IPaginatedPropertyResponseBody;
}

export interface IPaginatedUserResponse {
  ok: boolean;
  message: string;
  body: IPaginatedUserResponseBody;
}

export interface IPaginatedUserResponseBody {
  offset: number;
  limit: number;
  total_count: number;
  total_pages: number;
  users: IUser[];
  overview: {
    admin_count: number;
    user_count: number;
    developer_count: 3;
  };
}

export interface IPaginationLink {
  url: string;
  label: string;
  active: boolean;
}

export interface IDataData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  total?: number;
}

export interface IBase64Upload {
  attachment: string,
  attachment_ext: string
}

export type IPropertyImageSet = 'aerial' | 'display' | 'floorPlan' | 'model3d'

export interface IPropertyUpdateDto {
  property_id: string,
  title: string;
  address: string | undefined;
  state: string | undefined;
  city: string | undefined;
  // property_type: string | undefined;
  finished_status: IPropertyFinishStatus,
  model_3d_image: (IBase64Upload | string)[] | null,
  floor_plan_image: (IBase64Upload | string)[] | null,
  aerial_image: (IBase64Upload | string)[] | null,
  display_image: (IBase64Upload | string)[] | null,
  youtube_url: string | undefined,

  // Needed
  // status: string | undefined;
  // administrative_fee: string;
  units: number | null;
  price?: number,
  about?: string;
}

export interface IPill {
  label: string;
  value: string;
  active: boolean;
}

export type IPropertyCategory = "completed" | "off-plan";

export type ISortOrder = "asc" | "desc";

export interface IPaginationParams {
  page: number;
  q?: string;
  limit: number;
  offset: number;
}

export interface IQueryParams {
  page?: number;
  limit?: number;
  from_date?: string | null;
  to_date?: string | null;
}

export type IRole =
  | "user"
  | "admin"
  | "subscriber"
  | "seller"
  | "super_admin"
  | "sales"
  | "finance"
  | "legal"
  | "buyer"
  | "vendor"
  | "developer"
  | "mortgage_operations";

export interface IDashboardStats {
  user_count: number,
  developer_count: number,
  active_projects: number,
  pending_projects: number,
  all_sold: number,
  total_nhf_sales: number,
  total_outright_sales: number,
  total_rto_sales: number,
  total_contribution_sales: number,
  all_properties: number,
  pending_properties: number,
  approved_properties: number
}

export interface IUserSearchParams extends IQueryParams {
  search?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  email?: string | null;
  role?: string | null;
  sort?: ISortOrder;
  offset?: number;
  user_id?: string
}

export interface IDevApiDocumentStatusUpdateDto {
  user_id: string,
  id: string,
  type: DevApiDocumentSubPath,
  status: IDevApiStatus,
  declineReason?: string
}

export interface IDevApiProposedDevelopmentStatusUpdateDto {
  user_id: string,
  id: string,
  status: IProjectStatus
}

export interface IDevApiProposedDevelopmentDeclineDto {
  user_id: string,
  id: string,
  declineReason: string,
  affectedDocuments: string[],
  status: IProjectStatus
}

export type IDevApiStatus = "APPROVED" | "PENDING" | "DECLINED"
export type IDevApiDocumentType = "DEVELOPER_DOCUMENT" | "DEVELOPER_DIRECTOR_DOCUMENT" | "PROPOSED_DEVELOPMENT_DOCUMENT"
export enum DevApiDocumentSubPath {
  DEVELOPER_DOCUMENT = 'developer-documents',
  DEVELOPER_DIRECTOR_DOCUMENT = 'developer-director-documents',
  PROPOSED_DEVELOPMENT_DOCUMENT = 'proposed-development-documents'
}

export interface IDevApiDocument extends IDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  status: IDevApiStatus;
  declineReason: string | null,
  url: string | null;
  description: string | null;
  name: string;
  size: number | null;
  developerId?: string | null;
  developerDirectorId?: string | null;
  proposedDevelopmentId?: string | null;
  reviewer?: IUserFromDev | null
}

export type IRequestTopLevelStatus = "pending" | "treated";

export interface IPropertySearchParams extends IQueryParams {
  name?: string | null;
  saleStatus?: string | null;
  status?: string | null;
  type?: string | null;
  from_date?: string | null;
  to_date?: string | null;
  offset?: number;
  user_id?: string;
  baths?: string;
  beds?: string;
  location?: string;
  limit?: number;
  min_price?: string;
  max_price?: string;
  search?: string;
  developer_id?: string;
  amenities?: string;
  sortBy?: string
}

export interface IProjectSearchParams extends IQueryParams {
  status?: string | null;
  type?: string | null;
  to_date?: string | null;
  from_date?: string | null;
  search?: string;
  page?: number;
  user_id?: string;
  sortBy?: string
}

export interface ITransactionSearchParams extends IQueryParams {
  status?: string | null;
  type?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  offset?: number;
  search?: string;
  page?: number;
  user_id?: string;
}

export interface IRequestsSearchParams extends IQueryParams {
  buyer?: string;
  type?: string;
  date_from?: string,
  date_to?: string,
  category?: string;
  search?: string;
  status?: string;
  q?: string;
  offset?: number;
  user_id?: string;
}

export interface IPartner {
  id: string;
  user_id: string;
  partner_code: string | null;
  current_employer: string | null;
  credit_score_id: string | null;
  former_employer: string | null;
  pfa: string | null;
  rsa_balance: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  date_of_birth: string | null;
  monthly_net_salary: number | null;
  employment_status: string;
  industry: string | null;
  years_in_business: number;
  monthly_net_income: number | null;
  have_pension: boolean | null;
  parent_id: string | null;
}

export interface ITransactionsSearchParams extends IQueryParams {
  type?: string;
  search?: string;
  offset?: number;
  limit?: number;
  status?: string;
  user_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface IProjectsSearchParams extends IQueryParams {
  type?: string;
  search?: string;
  offset?: number;
  limit?: number;
  status?: string;
  from_date?: string;
  to_date?: string
}

export type IApplicationDocumenType = string;
export type IApplicationDocumenStatus = "approved" | "denied" | "pending";

export interface IDocument {
  id: string;
  url: string | null;
  name?: string | null;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type IDeveloperModeOfRegistration =
  | "LIMITED_LIABILITY_COMPANY"
  | "BUSINESS_NAME";

export interface IGroupEntity {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  name: string | null;
  rcNumber: string | null;
}

type IDeveloperDocumentStatus = "APPROVED" | "PENDING" | "DECLINED";

export interface IDeveloperDocument extends IDocument {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  reviewedAt: string | null;
  status: IDeveloperDocumentStatus | null;
  url: string | null;
  description: string | null;
  name: string | null;
  reviewer: IUser | null | string;
}


export interface IUserFromDev {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  email: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  avatar: string | null;
  status: string | null;
  phone_verified_at: string | null;
  password: string | null;
  roles: IRole[];
  email_verified_at: string | null;
  resetToken: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  region: string | null;
  address: string | null;
  whatsappNumber: string | null;
  accountBvn: string | null;
  employmentStatus: string | null;
  pensionFundAdmin: string | null;
  others: string | null;
  rememberToken: string | null;
  currentEmployer: string | null;
  monthlyNetSalary: string | null;
  dateOfBirth: string | null;
  natureOfBusiness: string | null;
  yearsInBusiness: string | null;
  monthlyTurnover: string | null;
  preferredPropertyLocation: string | null;
  lastLoginIp: string | null;
  lastLoginAt: string | null;
  phoneVerificationCode: string | null;
  verificationCodeSentAt: string | null;
  isFirstTimeLogin: false;
  havePensionAccount: string | null;
  firstTimeHomeBuyer: string | null;
}

export interface IDeveloperDirector {
  id: string;
  firstName: string | null;
  lastName: string | null;
  homeAddress: string | null;
  dateOfBirth: string | null;
  bvn: string | null;
  phoneNumber: string | null;
  email: string | null;
  developerDirectorDocuments: IDeveloperDocument[];
}

export interface ISuspendUserDto {
  user_id: string;
  id: string;
  reason?: string
}

export interface IDeveloper {
  id: string;
  logo: string | null;
  userId: string,
  businessName: string | null;
  isGovernmentAgency: boolean | null;
  isSubsidiary: boolean | null;
  hasAuditedAccounts: boolean | null;
  jobRole: string | null;
  yearsOfOperation: number | null;
  modeOfRegistration: IDeveloperModeOfRegistration | null;
  hasTrackRecordInPropertyDevelopment?: boolean | null;
  rcNumber: string | null;
  registeredAddress: string | null;
  operatingAddress: string | null;
  tin: string | null;
  accountNumber: string | null;
  accountName: string | null;
  operatingAddressSameAsRegistered: string | null;
  updatedAt: string | null;
  createdAt: string | null;
  user?: IUserFromDev;
  groupEntities?: IGroupEntity[];
  developerDocuments?: IDeveloperDocument[];
  proposedDevelopments?: IProject[];
  developerDirectors?: IDeveloperDirector[];
}

//export type IProjectStatus = "PENDING" | "APPROVED" | "DECLINED";

export type IPresellCommitmentEvidence =
  | "DEPOSIT"
  | "BINDING_PRESALE_AGREEMENT"
  | "COOPERATIVE_MEMBERSHIP"
  | "COOPERATIVE_MEMBERSHIP";

export interface IProject {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  reviewedAt: string | null;
  proposedLocation: string | null;
  city: string | null;
  state: string | null;
  locationIsMarketable: boolean;
  hasAuditedAccounts: boolean;
  status: IProjectStatus;
  gdv: number | null;
  landHasCoc: boolean;
  declineReason: string | null;
  affectedDocuments: string[] | null
  developerHasAnotherTitleAtLocation: boolean;
  totalDevelopmentCost: number;
  developerCanProvideEquity: boolean;
  equityIsAvailableNow: boolean;
  targetOfftakers: string;
  targetOfftakersProfiled: boolean;
  targetOfftakersProfileInfo: string | null;
  nUnitsPresoldOrCommited: number;
  presellCommitmentEvidence: IPresellCommitmentEvidence | null;
  designAndCostAvailable: boolean;
  drawingsAreByRegisteredConsultants: boolean;
  nameOnCOfO: string;
  registryInfo: string;
  onBoardingStages: IOnboardingStage[];
  reviewer: IUserFromDev | null;
  proposedProperties: IProposedProperty[];
  proposedDevelopmentDocuments: IDevApiDocument[];
  developer?: IDeveloper;
  developerId?: string;
}

export interface IProposedProperty {
  id: string;
  nUnits: number | null;
  nBeds: number | null;
  targetPrice: number;
  type: string | null;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface IPropertyDocument extends IDocument {
  id: string;
  property_id: string | number;
  description: string | null;
  is_verified: boolean;
  user_id: string | null;
}

export interface IApplicationDocument extends IDocument {
  reference_id: string | null;
  name: string | null;
  type: IApplicationDocumenType;
  status: IApplicationDocumenStatus;
  admin_comment: string | null;
  approved_by: string | null;
  admin_comment_by: string | null;
  documentable_id: string | null;
  documentable_type: string | null;
  reupload: number;
}