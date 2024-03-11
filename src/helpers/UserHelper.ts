import { IDocument, IRole, ITopLevelRoleType, IUser, IUserFromDev } from "@/types";
import StringHelper from "./StringHelper";

export default class UserHelper {
  public static getFullName(user: { first_name: string | null, last_name: string | null }) {
    return `${user.first_name} ${user.last_name}`;
  }
  public static getFullNameOfDevApiUser(user: IUserFromDev) {
    return `${user.firstName} ${user.lastName}`;
  }

  public static getOneName(user: IUser) {
    if (user.first_name) {
      return user.first_name;
    }

    if (user.last_name) {
      return user.last_name;
    }

    return "No Name";
  }

  public static cleanUpRoles(roles: IRole[]): IRole[] {
    return roles.filter((role) => role !== "admin" && role !== "user");
  }

  // public static roleAsString(roles: IRole[]) {
  //   if (roles.includes('user') || roles.length === 1) {
  //     return 'Subscriber'
  //   }

  //   return this.cleanUpRoles(roles).map(role => StringHelper.stripUnderscores(role)).join(", ");
  // }

  public static getTopLevelRoleFromUser(user: IUser) {
    return this.getTopLevelRole(user.roles)
  }

  public static getTopLevelRole: (roles: IRole[]) => ITopLevelRoleType = (roles: IRole[]) => {
    if (this.rolesMap['super_admin'].every((value) => roles.includes(value))) {
      return 'super_admin';
    }

    if (this.rolesMap['finance_admin'].every((value) => roles.includes(value))) {
      return 'finance_admin';
    }

    if (this.rolesMap['legal_admin'].every((value) => roles.includes(value))) {
      return 'legal_admin';
    }

    if (this.rolesMap['mortgage_ops_admin'].every((value) => roles.includes(value))) {
      return 'mortgage_ops_admin';
    }

    if (this.rolesMap['developer'].every((value) => roles.includes(value))) {
      return 'developer';
    }

    return 'subscriber'
  }

  public static roleAsString(user: IUser) {
    return StringHelper.stripUnderscores(this.getTopLevelRoleFromUser(user))
  }

  public static rolesMap: Record<ITopLevelRoleType, IRole[]> = {
    finance_admin: ["finance", "user"],
    mortgage_ops_admin: ["mortgage_operations", "user"],
    legal_admin: ["legal", "user"],
    super_admin: ["legal", "mortgage_operations", "finance", "user"],
    developer: ["user", "developer"],
    subscriber: ["user"],
    sales_admin: ["user"]
  }

  public static isSubscriber(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'subscriber';
  }

  public static isPermitted(allowedRoles: ITopLevelRoleType[], user?: IUser | null) {
    //return true // To disable role guards

    if (!user) {
      return false;
    }

    const role = this.getTopLevelRoleFromUser(user)
    return allowedRoles.includes(role) || role === 'super_admin'
  }

  public static isLegalAdmin(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'legal_admin';
  }

  public static isSuperAdmin(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'super_admin';
  }

  public static isMortgageOperationsAdmin(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'mortgage_ops_admin';
  }

  public static isFinanceAdmin(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'finance_admin';
  }

  public static isDeveloper(user: IUser): user is IUser {
    return this.getTopLevelRoleFromUser(user) === 'developer';
  }

  public static formRolesOption(roles: IRole[]) {
    //return JSON.stringify(roles)
    return roles
  }

  public static getIdentityDocument(user: IUser): IDocument | null {
    const asString = user.identity_document

    if (!asString || asString.length < 1) {
      return null
    }

    return {
      url: asString,
      id: '1',
      name: 'Identity Document'
    }
  }
}
