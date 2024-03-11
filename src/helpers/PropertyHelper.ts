import { IApartment, IBuilding, IProperty, IBase64Upload, IUnitStatus, IPropertyImageSet } from "@/types"
import ImageHelper from "./ImageHelper"

export default class PropertyHelper {
  public static getApartmentsFromProperty: (property: IProperty) => IApartment[] = (property) => {
    return property.buildings.map(building => building.apartments).reduce((acc, curr) => [...acc, ...curr]) ?? []
  }

  public static getTotalValueOfBlock: (building: IBuilding) => number = (building) => {
    return building.apartments.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
  }

  public static getAmenitiesFromBuilding: (building: IBuilding) => string[] = (building) => {
    if (!building?.amenities) {
      return []
    }

    const amenitiesString = building.amenities
    const amenities = JSON.parse(amenitiesString)
    return amenities
  }

  public static getAmenitiesFromProperty: (property: IProperty) => string[] = (property) => {
    if (!property?.buildings || property?.buildings?.length < 1) {
      return []
    }

    const amenities = property.buildings.map(building => this.getAmenitiesFromBuilding(building)).reduce((acc, curr) => [...acc, ...curr]) ?? []
    return amenities
  }

  public static getPropertyDocuments(property: IProperty) {
    const asString = property.property_documents

    if (!asString) {
      return []
    }

    const documents: string[] = JSON.parse(asString) as string[]
    return documents
  }

  public static getImages: (property: IProperty) => (string)[] = (property) => {
    const aerialImages: string[] = property.aerial_image ? JSON.parse(property.aerial_image) : []
    const model3dImages: string[] = property.model_3d_image ? JSON.parse(property.model_3d_image) : []
    const floorPlanImages: string[] = property.floor_plan_image ? JSON.parse(property.floor_plan_image) : []
    const images = [property.display_image, ...floorPlanImages, ...aerialImages, ...model3dImages].filter(image => image != null)

    const cleaned: string[] = []

    images.forEach(element => {
      if (element && element.length > 0) {
        cleaned.push(element)
      }
    });

    return cleaned
  }

  public static resolveUnitStatus = (unit: IApartment): IUnitStatus | null => {
    if (unit.sold) {
      return 'sold'
    }

    if (unit.available) {
      return 'available'
    }

    if (!unit.available) {
      return 'locked'
    }

    return null
  }

  public static getImagesWithTitles: (property: IProperty) => Record<'aerial' | 'display' | 'floorPlan' | 'model3d', (string | null)[]> = (property) => {
    const aerialImages: string[] = property.aerial_image ? JSON.parse(property.aerial_image) : []
    const model3dImages: string[] = property.model_3d_image ? JSON.parse(property.model_3d_image) : []
    const floorPlanImages: string[] = property.floor_plan_image ? JSON.parse(property.floor_plan_image) : []

    return {
      aerial: aerialImages.filter(url => url),
      display: [property.display_image].filter(url => url),
      floorPlan: floorPlanImages.filter(url => url),
      model3d: model3dImages.filter(url => url)
    }
  }

  public static getImageDtoRepresentation = (url: string): IBase64Upload => {
    return {
      attachment: url,
      attachment_ext: ImageHelper.getExtensionFromUrl(url)
    }
  }

  public static getImagesForDto: (property: IProperty) => Record<IPropertyImageSet, string[]> = (property) => {
    const aerialImages: string[] = property.aerial_image ? JSON.parse(property.aerial_image) : []
    const model3dImages: string[] = property.model_3d_image ? JSON.parse(property.model_3d_image) : []
    const floorPlanImages: string[] = property.floor_plan_image ? JSON.parse(property.floor_plan_image) : []

    // return {
    //   aerial: aerialImages.map(url => this.getImageDtoRepresentation(url)),
    //   display: property.display_image ? [this.getImageDtoRepresentation(property.display_image)] : [],
    //   floorPlan: floorPlanImages.map(url => this.getImageDtoRepresentation(url)),
    //   model3d: model3dImages.map(url => this.getImageDtoRepresentation(url))
    // }
    return {
      aerial: aerialImages,
      display: property.display_image ? [property.display_image] : [],
      floorPlan: floorPlanImages,
      model3d: model3dImages
    }
  }
}
