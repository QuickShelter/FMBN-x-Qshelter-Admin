import { IUser } from "@/types";

export default class AuthorizationHelper {
  public static isSalesAdmin(user?: IUser | null): user is IUser {
    if (!user) return false;

    return (
      user.roles.includes("sales") || user.roles.includes("super_admin")
    );
  }

  public static isLegalAdmin(user?: IUser | null): user is IUser {
    if (!user) return false;

    return (
      user.roles.includes("legal") || user.roles.includes("super_admin")
    );
  }

  public static isFinanceAdmin(user?: IUser | null): user is IUser {
    if (!user) return false;

    return (
      user.roles.includes("finance") || user.roles.includes("super_admin")
    );
  }

  public static isMortgageOperationsAdmin(user?: IUser | null): user is IUser {
    if (!user) return false;

    return (
      user.roles.includes("mortgage_operations") ||
      user.roles.includes("super_admin")
    );
  }
}
