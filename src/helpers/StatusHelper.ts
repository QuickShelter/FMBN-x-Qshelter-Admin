import { IMortgageStatus, IProjectStatus, IPropertyStatus, IStatus } from "@/types";
import ColorHelper from "./ColorHelper";

export class StatusHelper {
  public static mortgageStatusToColor: Record<IMortgageStatus, string> = {
    document_sent_to_bank: ColorHelper.systemSuccess,
    send_offer_letter_from_bank: ColorHelper.systemSuccess,
    declined: ColorHelper.systemError,
    approved: ColorHelper.emerald500,
    pending: ColorHelper.systemWarning,
  };

  public static projectStatusToColor: Record<
    IProjectStatus | IProjectStatus,
    string
  > = {
      APPROVED: ColorHelper.emerald500,
      DECLINED: ColorHelper.systemError,
      PENDING: ColorHelper.green100,
    };

  public static saleStatusToColor: Record<string, string> = {
    approved: ColorHelper.emerald500,
    declined: ColorHelper.systemError,
    pending: ColorHelper.green200,
  };

  public static propertyStatusToColor: Record<IPropertyStatus, string> = {
    approved: ColorHelper.emerald500,
    rejected: ColorHelper.systemError,
    pending: ColorHelper.green200,
  };

  public static projectStatusToTextColor: Record<
    IProjectStatus | IProjectStatus,
    string
  > = {
      APPROVED: "#fff",
      DECLINED: "#fff",
      PENDING: ColorHelper.black400
    };

  public static statusToTextColor: Record<string, string> = {
    approved: "#fff",
    DECLINED: "#fff",
    rejected: "#fff",
    PENDING: ColorHelper.black400,
  };

  public static resolveBackgroundColor = (status: IStatus) => {
    switch (status) {
      case 'approved':
        return ColorHelper.systemSuccess

      case 'APPROVED':
        return ColorHelper.systemSuccess

      case 'completed':
        return ColorHelper.systemSuccess

      case 'available':
        return ColorHelper.systemSuccess

      case 'declined':
        return ColorHelper.systemError

      case 'DECLINED':
        return ColorHelper.systemError

      case 'rejected':
        return ColorHelper.systemError

      case 'cancelled':
        return ColorHelper.systemError

      case 'pending':
        return ColorHelper.systemWarning

      case 'PENDING':
        return ColorHelper.systemWarning

      case 'on_going':
        return ColorHelper.systemWarning

      default:
        return ColorHelper.blue50;
    }
  }

  public static resolveTextColor = (status: IStatus) => {
    switch (status) {
      case 'approved':
        return ColorHelper.white;

      case 'APPROVED':
        return ColorHelper.white;

      case 'completed':
        return ColorHelper.white;

      case 'declined':
        return ColorHelper.white

      case 'DECLINED':
        return ColorHelper.white

      case 'rejected':
        return ColorHelper.white

      case 'available':
        return ColorHelper.white

      case 'cancelled':
        return ColorHelper.white

      case 'pending':
        return ColorHelper.black400

      case 'PENDING':
        return ColorHelper.black400

      case 'on_going':
        return ColorHelper.black400

      default:
        return ColorHelper.black400;
    }
  }
}
