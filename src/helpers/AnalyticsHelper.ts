import { IBuilding, IProperty, IProject, IProposedProperty } from "@/types";

export default class AnalyticsHelper {
  public static getNBedsFromProperty(property?: IProperty | undefined) {
    if (!property) return 0;

    const bedCounts = property?.buildings?.map((building) =>
      Number(building?.bedroom_count)
    );

    if (!bedCounts || bedCounts.length < 1) return 0;

    const bedCount = bedCounts.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    );

    return bedCount;
  }

  public static getNBathsFromProperty(property?: IProperty | undefined) {
    if (!property) return 0;

    const bathCounts = property?.buildings.map((building) =>
      Number(building.bathroom_count)
    );

    if (!bathCounts || bathCounts.length < 1) return 0;

    const bedCount = bathCounts.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    );

    return bedCount;
  }

  public static getTotalTargetPriceFromProposedProperties(
    properties: IProposedProperty[]
  ) {
    if (!properties || properties.length < 1) return 0

    const initialValue = 0;

    const total = properties.reduce(
      (accumulator, property) => accumulator + property.targetPrice,
      initialValue
    );

    return total;
  }

  public static getNUnitsProposedProperties(
    properties: IProposedProperty[]
  ) {
    const initialValue = 0;

    const total = properties.reduce(
      (accumulator, property) => accumulator + (property?.nUnits ? property.nUnits : 0),
      initialValue
    );

    return total;
  }

  public static getTargetPriceOfBuilding(
    building: IBuilding
  ) {
    const prices = building?.apartments.map((building) =>
      Number(building.price)
    );

    if (!prices || prices.length < 1) return 0;

    const total = prices.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    );

    return total;
  }

  public static getNSoldUnitsOfBuilding(
    building: IBuilding
  ) {
    const total = building.apartments.reduce(
      (accumulator, currentValue) => Number(accumulator) + (currentValue.sold ? 1 : 0),
      0
    );

    return total;
  }

  public static getNLockedUnitsOfBuilding(
    building: IBuilding
  ) {
    const total = building.apartments.reduce(
      (accumulator, currentValue) => Number(accumulator) + (currentValue.available ? 0 : 1),
      0
    );

    return total;
  }

  public static getMinAndMaxBedsFromProject(project: IProject) {
    if (!project.proposedProperties || project.proposedProperties.length < 1) {
      return { min: 0, max: 0 };
    }

    const beds = project.proposedProperties.map((property) => {
      if (!property?.nBeds || isNaN(property?.nBeds)) {
        return 0;
      }

      return Number(property.nBeds);
    });

    const max = Math.max(...beds);
    const min = Math.min(...beds);

    return { min, max };
  }


  public static getMinAndMaxBedsFromBuilding(building: IBuilding) {
    if (!building.apartments || building.apartments.length < 1) {
      return { min: 0, max: 0 };
    }

    const beds = building.apartments.map((apartment) => {
      if (!apartment.bedroom_count || isNaN(apartment.bedroom_count)) {
        return 0;
      }

      return Number(apartment.bedroom_count);
    });

    const max = Math.max(...beds);
    const min = Math.min(...beds);

    return { min, max };
  }
}
