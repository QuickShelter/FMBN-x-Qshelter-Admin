import {
  IAPIError,
  IApplicationData,
  IApplicationFormData,
  IApplicationFormRequest,
  IApplicationFormRequestPaginated,
  IBasePropertyRequest,
  IBuyOutrightlyRequest,
  IContributionRequest,
  IIndicationOfInterestRequest,
  IIndicationOfInterestRequestPaginated,
  IInterestedPerson,
  IMilestoneRequestPaginated,
  IMilestoneUpdateRequest,
  IMortgageDocument,
  IMortgageRequest,
  INhfRequest,
  IPaginatedRequest,
  IPriceUpdateRequest,
  IRequest,
  IRequestType,
  IRsaRequest,
  IRtoRequest,
  RequestType,
} from "@/types";

export default class RequestHelper {
  public static isBuyoutrightlyRequest(
    request?: IRequest | IPaginatedRequest | null
  ): request is IBuyOutrightlyRequest {
    if (!request) return false

    return request.type === RequestType.outrightly_bought;
  }


  public static isMortgageRequest(
    request?: IRequest | IPaginatedRequest | null
  ): request is IMortgageRequest {
    if (!request) return false

    return request.type === 'nhf'
      || request.type === 'rto'
      || request.type === 'rsa'
      || request.type === 'commercial_mortgage'
      || request.type === 'contribution';
  }

  public static checkOutrightPaymentCompleted(request: IBuyOutrightlyRequest): boolean {
    if (!request?.data?.initial_payment_made) {
      return false
    }

    const contributions = request?.data?.contributions ?? []

    // Original value is 1. Multiply by 0 if balance is 0, and 1 if greater
    const notCompletedContributions = contributions?.reduce((accumulator, currentValue) => {
      const multiplier = currentValue.balance > 0 ? 1 : 0
      return accumulator * multiplier
    }, 1);

    return !notCompletedContributions
  }

  public static isNhfRequest(request?: IRequest | IPaginatedRequest | null): request is INhfRequest {
    if (!request) return false

    return request.type === "nhf";
  }

  public static isContributionRequest(request?: IRequest | IPaginatedRequest | null): request is IContributionRequest {
    if (!request) return false

    return request.type === "contribution";
  }

  public static isRtoRequest(request?: IRequest | IPaginatedRequest | null): request is IRtoRequest {
    if (!request) return false

    return request.type === "rto";
  }

  public static isRsaRequest(request?: IRequest | IPaginatedRequest | null): request is IRsaRequest {
    if (!request) return false

    return request.type === "rsa";
  }

  public static isMileStoneUpdateRequest(request?: IRequest | IPaginatedRequest | null): request is IMilestoneUpdateRequest {
    if (!request) return false

    return request.type === "property_milestone";
  }

  public static isApplicationFormRequest(request?: IRequest | IPaginatedRequest | null): request is IApplicationFormRequest {
    if (!request) return false

    return request.type === "application_form";
  }

  public static isApplicationFormRequestPaginated(request?: IRequest | IPaginatedRequest | null): request is IApplicationFormRequestPaginated {
    if (!request) return false

    return request.type === "application_form";
  }

  public static isMilestoneUpdateRequestPaginated(request?: IRequest | IPaginatedRequest | null): request is IMilestoneRequestPaginated {
    if (!request) return false

    return request.type === "property_milestone";
  }

  public static isPriceUpdateRequest(
    request?: IRequest | IPaginatedRequest | null
  ): request is IPriceUpdateRequest {
    if (!request) return false

    return request.type === 'price_change' || request.type === 'property_price_change';
  }

  public static isIndicationOfInterestRequest(
    request?: IRequest | IPaginatedRequest | null
  ): request is IIndicationOfInterestRequest {
    if (!request) return false

    return request.type === 'indication_of_interest';
  }

  public static isIndicationOfInterestPaginated(
    request?: IRequest | IPaginatedRequest | null
  ): request is IIndicationOfInterestRequestPaginated {
    if (!request) return false

    return request.type === 'indication_of_interest';
  }

  public static getInterestedPerson = (request: IIndicationOfInterestRequestPaginated): IInterestedPerson | null => {
    const asString = request.data

    if (!asString) {
      return null
    }

    try {
      const parsed: IInterestedPerson = JSON.parse(asString) as IInterestedPerson
      return parsed
    } catch (error) {
      return null
    }
  }

  public static getApplicationFormData = (request: IApplicationFormRequestPaginated): IApplicationFormData | null => {
    const asString = request.data

    if (!asString) {
      return null
    }

    try {
      const parsed: IApplicationFormData = JSON.parse(asString) as IApplicationFormData
      return parsed
    } catch (error) {
      return null
    }
  }

  public static isPropertyRequest(
    request: IRequest | IPaginatedRequest | null
  ): request is IBasePropertyRequest {
    if (!request) return false

    return (
      request.type === 'price_change' ||
      request.type === 'contribution' ||
      request.type === 'outrightly_bought' ||
      request.type === 'rto' ||
      request.type === 'nhf'
    );
  }

  public static typeToHumanMap: Record<IRequestType, string> = {
    contribution: 'Contribution',
    developer_application: 'Developer Application',
    property_milestone: 'Milestone',
    nhf: "NHF",
    outrightly_bought: 'Outright Purchase',
    price_change: "Price Change",
    rsa: 'RSA',
    rto: 'RTO',
    services: 'Services',
    support: 'Support',
    commercial_mortgage: "Commercial Mortgage",
    indication_of_interest: "Indication of Interest",
    application_form: "Application Form",
    property_price_change: "Property Price Change"
  }

  public static typeToInterestRateMap: Record<IRequestType, number> = {
    nhf: 6,
    rto: 7,
    rsa: 0,
    contribution: 0,
    outrightly_bought: 0,
    developer_application: 0,
    price_change: 0,
    support: 0,
    property_milestone: 0,
    services: 0,
    commercial_mortgage: 0,
    application_form: 0,
    indication_of_interest: 0,
    property_price_change: 0
  }

  public static getApplicationDataFromRequest: (request: INhfRequest) => IApplicationData | null = (request) => {
    const applicationData = request?.data?.mortgage?.application_data
    return applicationData ? JSON.parse(applicationData) as IApplicationData : null
  }

  public static getMortgageDocumentsFromRequest: (request: IMortgageRequest) => IMortgageDocument[] = (request) => {
    const applicantDocuments = request?.data?.mortgage?.mortgage_applicant?.mortgage_applicant_documents ?? []
    const applicationDocuments = request?.data?.mortgage?.mortgage_application_documents ?? []
    return [...applicationDocuments, ...applicantDocuments]
  }

  public static allMortgageDocumentsAreApproved = (request: IMortgageRequest) => {
    let check = true

    this.getMortgageDocumentsFromRequest(request).forEach(document => {
      if (document.status !== 'approved') {
        check = false
      }
    });

    return check
  }

  public static getAffectedUnitIdsFromRequest = (request: IBasePropertyRequest): string[] => {
    const asString = request.data.apartment_ids

    if (!asString) {
      return []
    }

    return JSON.parse(asString) as string[]
  }

  public static getTargetBuildingFromRequest(request: IBasePropertyRequest) {
    const units = this.getAffectedUnitIdsFromRequest(request)

    if (units.length < 1) {
      return null
    }

    const targetUnit = units[0]
    const property = request.data.property

    if (!property?.buildings || property.buildings.length < 1) {
      return null
    }

    if (property.buildings.length < 1) {
      return null
    }

    for (const building of property.buildings) {
      if (!building.apartments) {
        return null
      }

      for (const apartment of building.apartments) {
        if (apartment.id == targetUnit) {
          return building
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static resolveErrorMessage(err: any) {
    const apiError = err as IAPIError

    if (apiError?.data?.message) {
      return apiError.data.message
    }

    const networkError = err as { status: string, error: string }

    if (networkError?.status && networkError?.status === 'FETCH_ERROR') {
      return 'Error Contacting the Server'
    }

    return null
  }
}
