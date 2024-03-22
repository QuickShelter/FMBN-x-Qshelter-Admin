import styles from "./Edit.module.css";
import { useMemo, useState } from "react";
import {
  IAPIError,
  IBuilding,
  IProperty,
  IBase64Upload,
  IPropertyUpdateDto,
  IResponse,
  IPropertyImageSet,
} from "@/types";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/modules/common/form/TextInput/TextInput";
import Button from "@/modules/common/Button/Button";
import PageTitle from "@/modules/common/PageTitle/PageTitle";
import {
  useUpdatePropertyByIdMutation
} from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner/Spinner";
import ImageUpdater from "../ImageUpdater";
import FormError from "@/modules/common/form/FormError";
import PageTitleAndActions from "@/modules/common/PageTitleAndActions";
import PageBackButton from "@/modules/common/PageBackButton";
import Hr from "@/modules/common/Hr";
import BlockRadio from "@/modules/common/form/BlockRadio";
import PropertyHelper from "@/helpers/PropertyHelper";
import AmenitiesSelectModal from "./AmenitiesSelectModal";
import BuildingEditModal from "./BuildingEditModal";
import BuildingEditCard from "./BuildingEditCard";
import BuildingAmenitiesEditCard from "./BuildingAmenitiesEditCard";
import Pill from "@/modules/common/Pill";
import TextArea from "@/modules/common/form/TextArea";
import { useToastContext } from "@/context/ToastContext_";

interface IProps {
  _property: IProperty;
}

export default function Edit({ _property: property }: IProps) {
  const [editProperty, { isLoading }] = useUpdatePropertyByIdMutation();
  // const [hasAdminFee, setHasAdminFee] = useState(true);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false)
  const [showBuildingEditModal, setShowBuildingEditModal] = useState(false)
  const [activeBuilding, setActiveBuilding] = useState<IBuilding | null>()
  const _images = PropertyHelper.getImagesForDto(property)

  const defaultValues: IPropertyUpdateDto = useMemo(() => {
    return {
      about: property.about ?? "",
      youtube_url: property.youtube_url ?? "",
      property_id: property.id,
      title: property.title ?? "",
      address: property.address ?? "",
      state: property.state ?? "",
      city: property.city ?? "",
      // administrative_fee: "5",
      finished_status: property.finished_status,
      units: property.units,
      // property_type: "",
      price: property.price ?? 0,
      aerial_image: _images.aerial,
      display_image: _images.display,
      model_3d_image: _images.model3d,
      floor_plan_image: _images.floorPlan,
    };
  }, [property, _images.aerial, _images.display, _images.floorPlan, _images.model3d]);

  const [images, setImages] = useState<Record<IPropertyImageSet, (IBase64Upload | string)[]>>(_images)
  const [isImageDirty, setIsImageDirty] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<IPropertyUpdateDto>({
    defaultValues,
  });

  const { pushToast } = useToastContext()

  const onSubmit: SubmitHandler<IPropertyUpdateDto> = async (data) => {
    const payload = {
      ...data,
      display_image: images.display,
      aerial_image: images.aerial,
      floor_plan_image: images.floorPlan,
      model_3d_image: images.model3d
    }

    if (payload?.price == property?.price) {
      delete payload.price
    }

    if (!payload?.about || payload.about.length < 1) {
      delete payload.about
    }

    try {
      const editResponse: IResponse<IProperty> = await editProperty(payload).unwrap();
      pushToast({
        type: "success",
        message: editResponse.message,
      })
    } catch (error) {
      console.log({ error });
      pushToast({
        message:
          (error as IAPIError)?.data?.data.error ?? "Something went wrong",
        type: "error",
      })
    }
  };

  const setDisplayImage = (value: (IBase64Upload | string)[]) => {
    setImages(prevState => {
      return {
        ...prevState, display: value
      }
    })
    setIsImageDirty(true)
  }

  const setModel3DImage = (value: (IBase64Upload | string)[]) => {
    setImages(prevState => {

      return {
        ...prevState, model3d: value
      }
    })
    setIsImageDirty(true)
  }

  const setFloorPlanImage = (value: (IBase64Upload | string)[]) => {
    setImages(prevState => {

      return {
        ...prevState, floorPlan: value
      }
    })
    setIsImageDirty(true)
  }

  const setAerialImage = (value: (IBase64Upload | string)[]) => {
    setImages(prevState => {

      return {
        ...prevState, aerial: value
      }
    })
    setIsImageDirty(true)
  }

  return (
    <section className="px-4 flex flex-col gap-6 pb-7">
      <PageTitleAndActions>
        <PageTitle className="py-4">Edit Property</PageTitle>
      </PageTitleAndActions>
      {activeBuilding && <AmenitiesSelectModal block={activeBuilding} show={showAmenitiesModal} onCancel={() => {
        setActiveBuilding(null)
        setShowAmenitiesModal(false)
      }} />}
      {activeBuilding && <BuildingEditModal building={activeBuilding} show={showBuildingEditModal} onCancel={() => {
        setActiveBuilding(null)
        setShowBuildingEditModal(false)
      }} />}
      <form
        onSubmit={handleSubmit(onSubmit)} className="pb-5 card">
        <div className="px-4 sm:px-6 py-[14px]">
          <div className="flex flex-col justify-between gap-4 items-center sm:flex-row">
            <PageBackButton text="Back" className="mr-auto px-3" />
            <div className="flex gap-4 mr-auto sm:mr-0 sm:ml-auto">
              <Button variant="outline" type="reset" onClick={() => reset()}>
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={(!isDirty && !isImageDirty) || isLoading}
                type="submit"
              >
                {isLoading && <Spinner />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <Hr />
        <div
          className={`${styles.container}`}
        >
          <section className={styles.form}>
            <div className={`${styles.left}`}>
              <fieldset>
                <h3 className={styles.sectionHeading}>Property Details</h3>
                <FormGroup>
                  <FormLabel htmlFor="title">
                    Property Information
                  </FormLabel>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="title"
                        required
                        placeholder="Title"
                      />
                    )}
                  />
                  {errors.title && (
                    <FormError>
                      {errors.title?.message}
                    </FormError>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="address"
                        placeholder="Address"
                      />
                    )}
                  />
                  {errors.address && (
                    <FormError>{errors.address?.message}</FormError>
                  )}
                </FormGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormGroup>
                    <FormLabel htmlFor="state">State</FormLabel>
                    <Controller
                      name="state"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          required
                          {...field}
                          id="state"
                          placeholder="State"
                        />
                      )}
                    />
                    {errors.state && (
                      <FormError>{errors.state?.message}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          required
                          {...field}
                          id="city"
                          placeholder="City"
                        />
                      )}
                    />
                    {errors.city && (
                      <FormError>{errors.city?.message}</FormError>
                    )}
                  </FormGroup>
                </div>
                {/* <FormGroup>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Controller
                    name="property_type"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        {propertyTypes.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.property_type && (
                    <FormError>{errors.property_type?.message}</FormError>
                  )}
                </FormGroup> */}
                <FormGroup>
                  <FormLabel htmlFor="price">Price (₦)</FormLabel>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        type="number"
                        required
                        {...field}
                        id="price"
                        placeholder="Price"
                      />
                    )}
                  />
                  {errors.price && (
                    <FormError>{errors.price?.message}</FormError>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Finishing Options</FormLabel>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Controller
                      name="finished_status"
                      control={control}
                      render={({ field }) => (
                        <BlockRadio {...field} defaultChecked={property.finished_status == field.value} value='semi_finished' label="Semi-Finished" />
                      )}
                    />
                    <Controller
                      name="finished_status"
                      control={control}
                      render={({ field }) => (
                        <BlockRadio {...field} value='finished' label="Finished" />
                      )}
                    />
                  </div>
                  {errors.finished_status && (
                    <FormError>{errors.finished_status?.message}</FormError>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="youtube_url">
                    YouTube URL
                  </FormLabel>
                  <Controller
                    name="youtube_url"
                    control={control}
                    //rules={{ required: true }}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="youtube_url"
                        placeholder="YouTube URL"
                      />
                    )}
                  />
                  {errors.youtube_url && (
                    <FormError>
                      {errors.youtube_url?.message}
                    </FormError>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="about">
                    About Property
                  </FormLabel>
                  <Controller
                    name="about"
                    control={control}
                    //rules={{ required: true }}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        rows={5}
                        id="about"
                        placeholder="About"
                      />
                    )}
                  />
                  {errors.about && (
                    <FormError>
                      {errors.about?.message}
                    </FormError>
                  )}
                </FormGroup>
              </fieldset>
              <Hr />
              <fieldset className="w-full flex flex-col gap-5">
                <h3 className={styles.sectionHeading}>Blocks</h3>
                {property.buildings.map(building => {
                  return <BuildingEditCard onClick={() => {
                    setActiveBuilding(building)
                    setShowBuildingEditModal(true)
                  }} key={building.id} building={building} />
                })}
              </fieldset>
              <Hr />
              <fieldset className="w-full flex flex-col gap-4">
                <h3 className={styles.sectionHeading}>Amenities</h3>
                {property.buildings.map(building => {
                  return <div className="flex flex-col gap-4">
                    <BuildingAmenitiesEditCard onClick={() => {
                      setActiveBuilding(building)
                      setShowAmenitiesModal(true)
                    }} key={building.id} building={building} />
                    <div className="flex gap-2 flex-wrap">
                      {PropertyHelper.getAmenitiesFromBuilding(building)?.map((amenity) => {
                        return (
                          <Pill>{amenity}</Pill>
                        );
                      })}
                    </div>
                    <Hr className="my-4" />
                  </div>
                })}
                {errors.address && (
                  <FormError>{errors.address?.message}</FormError>
                )}
              </fieldset>

              {/* <fieldset>
                <FormGroup>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="multipleUnits"
                        className="text-app-dark-blue-500 font-semibold text-sm"
                      >
                        Set Administrative Fee
                      </label>
                      <div
                        className="text-xs"
                        style={{
                          visibility: hasAdminFee ? "visible" : "hidden",
                        }}
                      >
                        How much commission we'd charge for this property
                      </div>
                    </div>
                    <ToggleCheckbox
                      id="hasAdminFee"
                      defaultChecked={hasAdminFee}
                      checked={hasAdminFee}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          //setValue("units", property.units);
                          setHasAdminFee(true);
                        } else {
                          //setValue("units", 1);
                          setHasAdminFee(false);
                        }
                      }}
                    />
                  </div>
                </FormGroup>{" "}
                <FormGroup>
                  <FormLabel htmlFor="administrative_fee">
                    Administrative Fee (%)
                  </FormLabel>
                  <Controller
                    name="administrative_fee"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="administrative_fee"
                        disabled={!hasAdminFee}
                        type="number"
                      />
                    )}
                  />
                  {errors.administrative_fee && (
                    <FormError>{errors.administrative_fee?.message}</FormError>
                  )}
                </FormGroup>
              </fieldset> */}
            </div>
            <fieldset className="flex gap-4">
              <FormGroup>
                <FormLabel className={styles.sectionHeading}>Display Image</FormLabel>
                <div className={`${styles.imageWrapper}`}>
                  <ImageUpdater field="display_image" setValue={setDisplayImage} photos={images.display} />
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel className={styles.sectionHeading}>Aerial Images</FormLabel>
                <div className={`${styles.imageWrapper}`}>
                  <ImageUpdater field="aerial_image" setValue={setAerialImage} photos={images.aerial} />
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel className={styles.sectionHeading}>Floor Plan Images</FormLabel>
                <div className={`${styles.imageWrapper}`}>
                  <ImageUpdater field="floor_plan_image" setValue={setFloorPlanImage} photos={images.floorPlan} />
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel className={styles.sectionHeading}>3D Model Images</FormLabel>
                <div className={`${styles.imageWrapper}`}>
                  <ImageUpdater field="model_3d_image" setValue={setModel3DImage} photos={images.model3d} />
                </div>
              </FormGroup>
            </fieldset>
          </section>
        </div>
      </form>
    </section>
  );
}
