import { IDeveloper } from "@/types";

export const mockDeveloper: IDeveloper = {
  "id": '1',
  "logo": null,
  "userId": '1',
  "businessName": null,
  "isGovernmentAgency": null,
  "isSubsidiary": null,
  "hasAuditedAccounts": null,
  "hasTrackRecordInPropertyDevelopment": null,
  "jobRole": null,
  "yearsOfOperation": null,
  "modeOfRegistration": null,
  "rcNumber": null,
  "registeredAddress": null,
  "operatingAddress": null,
  "tin": null,
  "accountNumber": null,
  "accountName": null,
  "operatingAddressSameAsRegistered": null,
  "updatedAt": null,
  "createdAt": null,
  "user": {
    "id": '1',
    "createdAt": "2024-01-19T09:40:54.350Z",
    "updatedAt": "2024-01-19T09:40:54.350Z",
    "email": null,
    "firstName": "Jane",
    "middleName": null,
    "lastName": "Doe",
    "phoneNumber": null,
    "avatar": null,
    "status": null,
    "phone_verified_at": null,
    "password": null,
    "roles": [
      "developer"
    ],
    "email_verified_at": null,
    "resetToken": null,
    "country": null,
    "state": null,
    "city": null,
    "region": null,
    "address": null,
    "whatsappNumber": null,
    "accountBvn": null,
    "employmentStatus": null,
    "pensionFundAdmin": null,
    "others": null,
    "rememberToken": null,
    "currentEmployer": null,
    "monthlyNetSalary": null,
    "dateOfBirth": null,
    "natureOfBusiness": null,
    "yearsInBusiness": null,
    "monthlyTurnover": null,
    "preferredPropertyLocation": null,
    "lastLoginIp": null,
    "lastLoginAt": null,
    "phoneVerificationCode": null,
    "verificationCodeSentAt": null,
    "isFirstTimeLogin": false,
    "havePensionAccount": null,
    "firstTimeHomeBuyer": null
  },
  "proposedDevelopments": [
    {
      "id": '1',
      "createdAt": "2024-01-19T09:42:29.470Z",
      "updatedAt": "2024-01-19T10:55:39.000Z",
      "reviewedAt": null,
      "proposedLocation": "string",
      "state": "string",
      "city": "string",
      "locationIsMarketable": true,
      "hasAuditedAccounts": true,
      "status": "PENDING",
      "gdv": 0,
      "developerId": '1',
      "landHasCoc": true,
      "declineReason": "string",
      "affectedDocuments": null,
      "developerHasAnotherTitleAtLocation": true,
      "totalDevelopmentCost": 0,
      "developerCanProvideEquity": true,
      "equityIsAvailableNow": true,
      "targetOfftakers": "string",
      "targetOfftakersProfiled": true,
      "targetOfftakersProfileInfo": "string",
      "nUnitsPresoldOrCommited": 0,
      "presellCommitmentEvidence": "DEPOSIT",
      "designAndCostAvailable": true,
      "drawingsAreByRegisteredConsultants": true,
      "nameOnCOfO": "string",
      "registryInfo": "string",
      "onBoardingStages": [
        {
          "name": "PRELIMINARY_EVALUATION",
          "completed": false,
          "completedAt": null
        },
        {
          "name": "PROJECT_INFO_DOCUMENTS",
          "completed": false,
          "completedAt": null
        },
        {
          "name": "TECHNICAL_DOCUMENTATION",
          "completed": false,
          "completedAt": null
        },
        {
          "name": "SALES_STRATEGY",
          "completed": false,
          "completedAt": null
        },
        {
          "name": "PROJECT_VIABILITY",
          "completed": false,
          "completedAt": null
        }
      ],
      "reviewer": {
        "id": '1',
        "createdAt": "2024-01-19T09:40:54.350Z",
        "updatedAt": "2024-01-19T09:40:54.350Z",
        "email": null,
        "firstName": "Jane",
        "middleName": null,
        "lastName": "Doe",
        "phoneNumber": null,
        "avatar": null,
        "status": null,
        "phone_verified_at": null,
        "password": null,
        "roles": [
          "developer"
        ],
        "email_verified_at": null,
        "resetToken": null,
        "country": null,
        "state": null,
        "city": null,
        "region": null,
        "address": null,
        "whatsappNumber": null,
        "accountBvn": null,
        "employmentStatus": null,
        "pensionFundAdmin": null,
        "others": null,
        "rememberToken": null,
        "currentEmployer": null,
        "monthlyNetSalary": null,
        "dateOfBirth": null,
        "natureOfBusiness": null,
        "yearsInBusiness": null,
        "monthlyTurnover": null,
        "preferredPropertyLocation": null,
        "lastLoginIp": null,
        "lastLoginAt": null,
        "phoneVerificationCode": null,
        "verificationCodeSentAt": null,
        "isFirstTimeLogin": false,
        "havePensionAccount": null,
        "firstTimeHomeBuyer": null
      },
      "proposedProperties": [
        {
          "id": '1',
          "nUnits": 1,
          "nBeds": 5,
          "targetPrice": 1000000,
          "type": "string",
          "updatedAt": null,
          "createdAt": null
        },
        {
          "id": '2',
          "nUnits": 1,
          "nBeds": 5,
          "targetPrice": 1000000,
          "type": "string",
          "updatedAt": null,
          "createdAt": null
        }
      ],
      "proposedDevelopmentDocuments": [
        {
          "id": '1',
          "createdAt": "2024-01-19T17:09:27.287Z",
          "updatedAt": "2024-01-19T17:09:27.287Z",
          "reviewedAt": null,
          "status": "PENDING",
          "declineReason": "",
          "url": "https://qshelter-public.s3.amazonaws.com/developer/document/0c69b8d6-9ecc-42f4-9a98-bdd6af97dddd-20240119T170925902Z..png",
          "description": "w",
          "name": "w",
          "size": 46738,
          "proposedDevelopmentId": '1'
        }
      ]
    }
  ]
}

export const mockDevelopers: IDeveloper[] = Array(5)
  .fill(1)
  .map((_, index) => {
    return { ...mockDeveloper, id: `${index}` };
  });
