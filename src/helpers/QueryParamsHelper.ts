import {
  IProjectSearchParams,
  IPropertySearchParams,
  IRequestsSearchParams,
  ITransactionSearchParams,
  ITransactionsSearchParams,
  IUserSearchParams,
} from "@/types";
import { createSearchParams } from "react-router-dom";
import queryString from "query-string";

class QueryParamsHelper {
  public static stripInvalidPropertyParams(
    data: ITransactionSearchParams
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { search, offset, status, date_from, date_to, type } = data;

    if (search && search !== "") {
      qParams["search"] = search;
    }

    if (offset) {
      qParams["offset"] = `${offset}`;
    }

    if (status && status !== "") {
      qParams["status"] = status;
    }

    if (type && type !== "") {
      qParams["type"] = type;
    }

    if (date_from && date_from !== "") {
      qParams["date_from"] = date_from;
    }

    if (date_to && date_to !== "") {
      qParams["date_to"] = date_to;
    }

    return qParams;
  }

  public static stripInvalidRequestParams(
    data: IRequestsSearchParams
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { search, offset, page, type, from_date, to_date, status } = data;

    if (search && search !== "") {
      qParams["search"] = search;
    }

    if (offset) {
      qParams["offset"] = `${offset}`;
    }

    if (page) {
      qParams["page"] = `${page}`;
    }

    if (status) {
      qParams["status"] = status;
    }

    if (type && type !== "") {
      qParams["type"] = type;
    }

    if (from_date && from_date !== "") {
      qParams["from_date"] = from_date;
    }

    if (to_date && to_date !== "") {
      qParams["to_date"] = to_date;
    }

    return qParams;
  }

  public static stripInvalidTransactionParams(
    data: ITransactionsSearchParams
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { search, offset, limit, type, date_from, date_to, status } = data;

    if (search && search !== "") {
      qParams["search"] = search;
    }

    if (offset) {
      qParams["offset"] = `${offset}`;
    }

    if (limit) {
      qParams["limit"] = `${limit}`;
    }

    if (status) {
      qParams["status"] = status;
    }

    if (type) {
      qParams["type"] = type;
    }

    if (date_from && date_from !== "") {
      qParams["date_from"] = date_from;
    }

    if (date_to && date_to !== "") {
      qParams["date_to"] = date_to;
    }

    return qParams;
  }

  public static stripInvalidUserParams(
    data: IUserSearchParams
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { search, offset, role, date_from, date_to, email,
      //sort
    } = data;

    if (search && search !== "") {
      qParams["search"] = search;
    }

    if (role && role !== "") {
      qParams["role"] = role;
    }

    if (offset) {
      qParams["offset"] = `${offset}`;
    }

    // if (sort) {
    //   qParams["sort"] = `${sort}`;
    // }

    if (date_from && date_from !== "") {
      qParams["date_from"] = date_from;
    }

    if (date_to && date_to !== "") {
      qParams["date_to"] = date_to;
    }

    if (email && email !== "") {
      qParams["email"] = email;
    }

    return qParams;
  }

  public static stripInvalidProjectParams(
    data: IProjectSearchParams
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { search, page, from_date, to_date, status,
      //sort
    } = data;

    if (search && search !== "") {
      qParams["search"] = search;
    }


    if (page) {
      qParams["page"] = `${page}`;
    }

    if (status) {
      qParams["status"] = `${status}`;
    }


    if (from_date && from_date !== "") {
      qParams["from_date"] = from_date;
    }

    if (to_date && to_date !== "") {
      qParams["to_date"] = to_date;
    }

    return qParams;
  }

  public static generateQueryString(data: Record<string, string>) {
    return `?${queryString.stringify(data)}`
  }

  public static generatePropertyQueryParams(
    data: IPropertySearchParams
  ): string {
    const stripped = this.stripInvalidPropertyParams(data);
    return `?${createSearchParams(stripped).toString()}`;
  }

  public static generateProjectQueryParams(
    data: IProjectSearchParams
  ): string {
    const stripped = this.stripInvalidProjectParams(data);
    return `?${createSearchParams(stripped).toString()}`;
  }

  public static generateUserQueryParams(data: IUserSearchParams): string {
    const stripped = this.stripInvalidUserParams(data);
    return `?${createSearchParams(stripped).toString()}`;
  }

  public static generateRequestQueryParams(
    data: IRequestsSearchParams
  ): string {
    const stripped = this.stripInvalidRequestParams(data);
    return `?${createSearchParams(stripped).toString()}`;
  }

  public static generateTransactionQueryParams(
    data: ITransactionsSearchParams
  ): string {
    const stripped = this.stripInvalidTransactionParams(data);
    return `?${createSearchParams(stripped).toString()}`;
  }
}

export default QueryParamsHelper;
