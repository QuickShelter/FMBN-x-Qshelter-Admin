import { IOrganisation } from "@/types";

export const mockOrganisation: IOrganisation = {
  "id": "197",
  "image": "https://hopedevbucket.s3.amazonaws.com/avatar/00827335671708530268809.jpeg",
  "name": "Infinity Trust Morgage Bank Plc",
  "created_at": "2024-02-21T15:35:58.000Z",
  "updated_at": "2024-02-21T15:44:29.000Z",
  type: "Employer"
};

export const mockOrganisations: IOrganisation[] = Array(20).fill(mockOrganisation).map((org, index) => {

  return {
    ...org,
    id: index
  }
})