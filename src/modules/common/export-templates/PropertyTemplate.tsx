import { IDeveloper, IProperty } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import PropertyHelper from "@/helpers/PropertyHelper";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import Image from "../Image";
import ArrayHelper from "@/helpers/ArrayHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    _property: IProperty;
    developer: IDeveloper
}
const PropertyTemplate = ({ className, _property: property, developer, ...rest }: IProps) => {

    const images = PropertyHelper.getImagesWithTitles(property)
    const imgStyle = "w-[10rem] h-[10rem] object-cover"

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">Renewed Hope Property</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Title" value={property.title} />
            <DetailCard label="Address" value={property.address} />
            <DetailCard label="Number of Blocks" value={property.buildings_count} />
            <DetailCard label="Finishing Status" value={property.finished_status} />
            <DetailCard label="Price" value={FormatHelper.nairaFormatter.format(property.price)} />
        </div>
        <div className="flex flex-col gap-4">
            <DetailCard label="Developer" value={developer.businessName} />
        </div>
        <div>
            <h2>Buildings</h2>
            <div>
                {property.buildings.map(building => {
                    return <div className="grid grid-cols-2 gap-4">
                        <DetailCard label="Name" value={building.name} />
                        <DetailCard label="Amenities" value={PropertyHelper.getAmenitiesFromBuilding(building).join(',')} />
                        <DetailCard label="Number of Units" value={building.units} />
                        <DetailCard label="Total Valut" value={FormatHelper.nairaFormatter.format(PropertyHelper.getTotalValueOfBlock(building))} />
                    </div>
                })}
            </div>
        </div>
        <div className="flex flex-col gap-6">
            {
                images.aerial && images.aerial.length > 0 && ArrayHelper.checkAnyNonNull(images.aerial) && <div>
                    <h3>Aerial Image</h3>
                    <div>
                        {images.aerial.map(img => {
                            if (!img) {
                                return null
                            }

                            return <img className={imgStyle} src={img} alt="" />
                        })}
                    </div>
                </div>
            }
            {
                images.display && images.display.length > 0 && ArrayHelper.checkAnyNonNull(images.display) && <div>
                    <h3>Display Image</h3>
                    <div>
                        {images.display.map(img => {
                            if (!img) {
                                return null
                            }

                            return <Image className={imgStyle} src={img} alt="" />
                        })}
                    </div>
                </div>
            }
            {
                images.model3d && images.model3d.length > 0 && ArrayHelper.checkAnyNonNull(images.model3d) && <div>
                    <h3>3D Model Image</h3>
                    <div>
                        {images.model3d.map(img => {
                            if (!img) {
                                return null
                            }

                            return <img className={imgStyle} src={img} alt="" />
                        })}
                    </div>
                </div>
            }
            {
                images.floorPlan && images.floorPlan.length > 0 && ArrayHelper.checkAnyNonNull(images.floorPlan) && <div>
                    <h3>Floor Plan Image</h3>
                    <div>
                        {images.floorPlan.map(img => {
                            if (!img) {
                                return null
                            }

                            return <img className={imgStyle} src={img} alt="" />
                        })}
                    </div>
                </div>
            }
        </div>
    </div >
}

export default PropertyTemplate