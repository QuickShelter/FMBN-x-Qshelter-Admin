import { expect } from '@jest/globals';
import RequestHelper from "../src/helpers/RequestHelper";
import { IBasePropertyRequest, IBuyOutrightlyRequest } from '../src/types'

const request: IBasePropertyRequest = {
  "id": "9",
  "title": "Application for nhf",
  "type": "nhf",
  "status": "ready_for_mortgage",
  "reference_id": "118",
  "requester_id": "163",
  "full_desc": "Application for 1 units of 20 units of bungalows at Gwarimpa from Daniel Adewale",
  "created_at": "2024-01-31T08:47:24.000Z",
  "updated_at": "2024-01-31T08:47:24.000Z",
  "data": {
    "id": "118",
    "plan": "nhf",
    "initial_payment_made": false,
    "offer_accepted": false,
    "status": "ready_for_mortgage",
    "user_id": "163",
    "created_at": "2024-01-31 08:47:22.000000",
    "updated_at": "2024-01-31 08:47:22.000000",
    "property_id": "26",
    "total_price": 10000000,
    "apartment_ids": "[123]",
    "initial_payment": 900000,
    "initial_payment_currency": "NGN",
    "property": {
      "id": "26",
      "about": "",
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
    },
    "contributions": [
      {
        "id": "72",
        "balance": 1000000,
        "duration": null,
        "created_at": "2024-01-31 08:47:22.000000",
        "total_paid": 0,
        "updated_at": "2024-01-31 08:47:22.000000",
        "application_id": "118",
        "monthly_payment": null,
        "latest_start_date": "2024-01-31 08:47:22.000000"
      }
    ],
    "offers": [],
    "milestones": []
  }
}

const outright: IBuyOutrightlyRequest = {
  "id": "235",
  "title": "Application for buyoutrightly",
  "type": "outrightly_bought",
  "status": "on_going",
  "reference_id": "294",
  "requester_id": "217",
  "full_desc": "Application for 1 units of 1 Bedroom Block of Flats at Karsana District Phase 3 from Samuel Adeniyi",
  "created_at": "2024-03-11T15:18:38.000Z",
  "updated_at": "2024-03-11T15:18:38.000Z",
  "data": {
    "id": "294",
    "plan": "buyoutrightly",
    "status": "on_going",
    "user_id": "217",
    "created_at": "2024-03-11 15:18:38.000000",
    "updated_at": "2024-03-11 15:18:38.000000",
    "property_id": "43",
    "total_price": 100,
    "apartment_ids": "[915]",
    "offer_accepted": false,
    "initial_payment": 100,
    "initial_payment_made": false,
    "initial_payment_currency": "NGN",
    "property": {
      "id": "43",
      "poster_id": "157",
      "project_id": "8",
      "project_property_id": "0",
      "type": "flats",
      "units": 14,
      "multiple_buildings": true,
      "buildings_count": 14,
      "finished_status": "semi_finished",
      "youtube_url": null,
      "display_image": "https://hopedevbucket.s3.amazonaws.com/property_images/62361398751709546125231.jpg",
      "model_3d_image": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/55069658331709545799172.jpg\",\"https://hopedevbucket.s3.amazonaws.com/property_images/11405180641709545799317.jpg\",\"https://hopedevbucket.s3.amazonaws.com/property_images/88444958861709545799468.jpg\"]",
      "floor_plan_image": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/22589506341709545799752.jpg\",\"https://hopedevbucket.s3.amazonaws.com/property_images/97402736311709545799849.jpg\"]",
      "aerial_image": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/81563958851709545799573.jpg\"]",
      "property_documents": "[\"https://hopedevbucket.s3.amazonaws.com/property_documents/11687060631709545799905.pdf\"]",
      "title": "1 Bedroom Block of Flats at Karsana District Phase 3",
      "address": "Karsana, Federal Capital Territory, Abuja, Nigeria",
      "state": "FCT",
      "about": null,
      "city": "Municipal Area Council",
      "price": 100.00,
      "status": "approved",
      "administrative_fee": 0,
      "pending_price": null,
      "created_at": "2024-03-04T09:50:00.000Z",
      "updated_at": "2024-03-06T14:28:27.000Z",
      "deleted_at": null,
      "buildings": [
        {
          "id": "103",
          "property_id": "43",
          "name": "Block 1",
          "apartment_count": 32,
          "bedroom_count": 1,
          "bathroom_count": 1,
          "floor_count": 4,
          "random_floor_position": false,
          "amenities": null,
          "created_at": "2024-03-04T09:50:00.000Z",
          "updated_at": "2024-03-04T09:50:00.000Z",
          "deleted_at": null,
          "apartments": [
            {
              "id": "538",
              "building_id": "103",
              "name": "Unit 1",
              "floor": 0,
              "bedroom_count": 1,
              "bathroom_count": 1,
              "available": false,
              "sold": true,
              "price": 100.00,
              "pending_price": null,
              "created_at": "2024-03-04T09:50:00.000Z",
              "updated_at": "2024-03-11T15:14:24.000Z",
              "deleted_at": null
            }
          ],
          "total_units": 32,
          "total_sold": 2,
          "total_available": 30
        },
      ],
      "milestones": [
        {
          "id": "30",
          "desc": "update mileston 0",
          "media": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/38212651011709723166034.jpg\"]",
          "updated_by": "157",
          "youtube_url": null,
          "status": "pending",
          "status_reason": null,
          "created_at": "2024-03-06T11:06:06.000Z",
          "updated_at": "2024-03-06T11:06:06.000Z",
          "deleted_at": null,
          "property_id": "43"
        },
        {
          "id": "31",
          "desc": "update mileston 1",
          "media": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/21197064171709731193944.jpg\"]",
          "updated_by": "157",
          "youtube_url": null,
          "status": "pending",
          "status_reason": null,
          "created_at": "2024-03-06T13:19:54.000Z",
          "updated_at": "2024-03-06T13:19:54.000Z",
          "deleted_at": null,
          "property_id": "43"
        },
        {
          "id": "35",
          "desc": "Roof structure and covering",
          "media": "[\"https://hopedevbucket.s3.amazonaws.com/property_images/68622042881709782323846.png\"]",
          "updated_by": "157",
          "youtube_url": null,
          "status": "pending",
          "status_reason": null,
          "created_at": "2024-03-07T03:32:04.000Z",
          "updated_at": "2024-03-07T03:32:04.000Z",
          "deleted_at": null,
          "property_id": "43"
        }
      ],
      "total_units": 448,
      "total_sold": 3,
      "total_available": 445
    },
    "contributions": [],
    "offers": [],
    "milestones": []
  }
}

describe("Request Helper", () => {
  it("gets units array from mortgage request", () => {
    const result = RequestHelper.getAffectedUnitIdsFromRequest(request)
    expect(result).toEqual([123]);
  })

  it("check if payment has been completed", () => {
    const result = RequestHelper.checkOutrightPaymentCompleted(outright)
    expect(result).toEqual(false);
  })
})
