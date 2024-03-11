import { IBuilding } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Card from "./Card";
import Hr from "@/modules/common/Hr";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  buildings: IBuilding[];
  propertyId: string
}

export default function Buildings({ className, propertyId, buildings, ...rest }: IProps) {

  return (
    <div {...rest} className={`${className} p-5 sm:p-6`}>
      {buildings.map((building, index) => {
        return (
          <div key={index}>
            <Card propertyId={propertyId} building={building} />
            {index < buildings.length - 1 ? <Hr className="" /> : null}
          </div>
        );
      })}
    </div>
  );
}
