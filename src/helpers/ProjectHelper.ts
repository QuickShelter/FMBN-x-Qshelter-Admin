import { IProposedProperty } from "@/types";

export default class ProjectHelper {
  public static getTotalTargetPrice(properties: IProposedProperty[]) {
    const initialValue = 0;

    const total = properties.reduce(
      (accumulator, property) => accumulator + property.targetPrice,
      initialValue
    );

    return total;
  }
}
