import { IDeveloperDocument } from "@/types";

export const mockDeveloperDocument: IDeveloperDocument = {
  id: "1",
  createdAt: "2024-01-09T14:57:28.053Z",
  updatedAt: "2024-01-09T14:57:28.053Z",
  reviewedAt: null,
  status: "PENDING",
  url: "https://mofidevbucket.s3.amazonaws.com/developer/document/d85925a6-9b2a-49e2-a629-966af3f98dc5-20240109T145727874Z..docx",
  description: "Upload CAC Certificate of Incorporation",
  name: "Upload CAC Certificate of Incorporation",
  reviewer: null,
};

export const mockDeveloperDocuments: IDeveloperDocument[] = Array(5)
  .fill(1)
  .map((_, index) => {
    return { ...mockDeveloperDocument, id: `${index}` };
  });
