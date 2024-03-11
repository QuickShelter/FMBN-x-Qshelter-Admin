import { expect } from '@jest/globals';
import PropertyHelper from "../src/helpers/PropertyHelper";
import { IProperty } from '../src/types'

const property: IProperty = {
  "id": "26",
  "poster_id": "157",
  "project_id": "3",
  "project_property_id": "0",
  "type": "apartments",
  "units": 2,
  "multiple_buildings": true,
  "buildings_count": 2,
  "finished_status": "semi_finished",
  "youtube_url": null,
  "display_image": "https://mofidevbucket.s3.amazonaws.com/property_images/70401638581706003100548.jpg",
  "model_3d_image": "[\"https://mofidevbucket.s3.amazonaws.com/property_images/44016736181706003099853.jpg\"]",
  "floor_plan_image": "[\"https://mofidevbucket.s3.amazonaws.com/property_images/21192136401706003100251.jpg\"]",
  "aerial_image": "[\"https://mofidevbucket.s3.amazonaws.com/property_images/18707972181706003100149.jpg\"]",
  "property_documents": "[\"https://mofidevbucket.s3.amazonaws.com/property_documents/44588743851706003100314.pdf\"]",
  "title": "20 units of bungalows at Gwarimpa",
  "address": "Gwarimpa",
  "state": "FCT",
  "city": "Municipal Area Council",
  "price": 10000000,
  "status": "approved",
  "administrative_fee": 0,
  "created_at": "2024-01-23T09:45:00.000Z",
  "updated_at": "2024-01-23T09:45:00.000Z",
  "deleted_at": null,
  "buildings": [
    {
      "id": "52",
      "property_id": "26",
      "name": "MOFI Block",
      "apartment_count": 3,
      "bedroom_count": 3,
      "bathroom_count": 3,
      "floor_count": 2,
      "random_floor_position": false,
      "amenities": null,
      "created_at": "2024-01-23T09:45:00.000Z",
      "updated_at": "2024-01-23T09:45:00.000Z",
      "deleted_at": null,
      "apartments": [
        {
          "id": "121",
          "building_id": "52",
          "name": "Unit 1",
          "floor": 1,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        },
        {
          "id": "122",
          "building_id": "52",
          "name": "Unit 2",
          "floor": 0,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        },
        {
          "id": "123",
          "building_id": "52",
          "name": "Unit 3",
          "floor": 0,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        }
      ]
    },
    {
      "id": "53",
      "property_id": "26",
      "name": "Building 2",
      "apartment_count": 4,
      "bedroom_count": 3,
      "bathroom_count": 3,
      "floor_count": 3,
      "random_floor_position": false,
      "amenities": null,
      "created_at": "2024-01-23T09:45:00.000Z",
      "updated_at": "2024-01-23T09:45:00.000Z",
      "deleted_at": null,
      "apartments": [
        {
          "id": "124",
          "building_id": "53",
          "name": "Unit 1",
          "floor": 0,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        },
        {
          "id": "125",
          "building_id": "53",
          "name": "Unit 2",
          "floor": 0,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        },
        {
          "id": "126",
          "building_id": "53",
          "name": "Unit 3",
          "floor": 2,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        },
        {
          "id": "127",
          "building_id": "53",
          "name": "Unit 4",
          "floor": 2,
          "bedroom_count": 3,
          "bathroom_count": 3,
          "available": true,
          "sold": false,
          "price": 10000000.00,
          "created_at": "2024-01-23T09:45:00.000Z",
          "updated_at": "2024-01-23T09:45:00.000Z",
          "deleted_at": null
        }
      ]
    }
  ],
  "milestones": []
}

describe("Property Helper", () => {
  it("Parse property documents", () => {
    const result = PropertyHelper.getPropertyDocuments(property)
    expect(result).toEqual(["https://mofidevbucket.s3.amazonaws.com/property_documents/44588743851706003100314.pdf"]);
  })
})
