import { ITransaction, ITransactionMetaData } from "@/types"

export default class TransactionHelper {
  public static getMetadata = (transaction: ITransaction): ITransactionMetaData | null => {
    const asString = transaction.metadata

    if (!asString) {
      return null
    }

    try {
      const parsed: ITransactionMetaData = JSON.parse(asString) as ITransactionMetaData
      return parsed
    } catch (error) {
      return null
    }
  }
}
