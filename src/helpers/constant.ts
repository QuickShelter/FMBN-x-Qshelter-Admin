import UserHelper from "./UserHelper";

export const CONSTANT = {
  propertyTypes: [
    "Bungalow",
    "Duplex",
    "Terrace",
    "Flat",
    "Apartment",
    "Maisonette",
    "House",
  ],

  roles: [
    {
      label: "Finance Admin",
      value: UserHelper.formRolesOption(["finance", "user"]),
    },
    {
      label: "Mortgage Ops Admin",
      value: UserHelper.formRolesOption(["mortgage_operations", "user"]),
    },
    {
      label: "Legal Admin",
      value: UserHelper.formRolesOption(["legal", "user"])
    },
    {
      label: "Super Admin",
      value: UserHelper.formRolesOption(["legal", "mortgage_operations", "finance", "user"])
    }
  ],
};
