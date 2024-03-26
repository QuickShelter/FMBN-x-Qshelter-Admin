import { IProduct } from "@/types";

export const mockProduct: IProduct = {
  id: "197",
  name: 'NHF Loan',
  activeLoans: 109,
  pastLoans: 1290,
  interest: 6,
  maxTenor: "30 Years",
  maxAmount: 15000000.00,
  created_at: null,
  updated_at: null
};

export const mockProducts: IProduct[] = Array(5).fill(mockProduct).map((org, index) => {

  return {
    ...org,
    id: index
  }
})