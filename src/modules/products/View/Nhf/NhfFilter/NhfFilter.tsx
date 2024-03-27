import {
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import styles from "./PropertyFilter.module.css";
import Button from "@/modules/common/Button/Button";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import DateInput from "@/modules/common/form/DateInput";
import DropDownButton from "@/modules/common/DropDownButton";
import { formatDate } from "@/helpers/dateFormat";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import FormError from "@/modules/common/form/FormError";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import TextInput from "@/modules/common/form/TextInput";
import Filter from "@/modules/common/icons/Filter";
import Select from "@/modules/common/form/Select";
import { IPropertyStatus, IPropertyType } from "@/types";
import FormLabel from "@/modules/common/form/FormLabel";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  qparams: Record<string, string>
}

export interface INhfFilterDto {
  from_date: string;
  to_date: string;
  status: string;
  baths: string,
  beds: string,
  location: string,
  type: string,
}

const statusOptions: { label: string, value: undefined | IPropertyStatus }[] =
  [
    {
      label: "Choose Type",
      value: undefined
    },
    {
      label: "Pending",
      value: "pending"
    },
    {
      label: "Approved",
      value: "approved"
    },

    {
      label: "Rejected",
      value: "rejected"
    }
  ]

const propertyTypeOptions: { label: string, value: undefined | IPropertyType }[] =
  [
    {
      label: "Choose Type",
      value: undefined
    },
    {
      label: "Condominium",
      value: "condominium"
    },
    {
      label: "Fully-Detached Duplex",
      value: "fully_detached_duplex"
    },

    {
      label: "Semi-detached Duplex",
      value: "semi_detached_duplex"
    },
    {
      label: "Detached Bungalows",
      value: "detached_bungalows"
    },
    {
      label: "Apartments",
      value: "apartments"
    },
    {
      label: "Flats",
      value: "flats"
    },
    {
      label: "Terraces",
      value: "terraces"
    },
    {
      label: "Maisonette",
      value: "maisonette"
    },
    {
      label: "Penthouse",
      value: "penthouse"
    },
    {
      label: "Terrace Bungalows",
      value: "terrace_bungalows"
    },
    {
      label: "Semi Detached Bungalow",
      value: "semi_detached_bungalow"
    },
    {
      label: "Terrace Duplex",
      value: "terrace_duplex"
    },
    {
      label: "Fully Detached Duplex",
      value: "fully_detached_duplex"
    },
  ]

export default function PropertyFilter({ className, qparams, ...rest
}: IProps) {
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues = useMemo(
    () =>
      QueryParamsHelper.stripInvalidPropertyParams({
        from_date: searchParams.get("from_date") ?? '',
        to_date: searchParams.get("to_date") ?? '',
        baths: searchParams.get("baths") ?? '',
        beds: searchParams.get("beds") ?? '',
        location: searchParams.get("location") ?? '',
        type: searchParams.get("type") ?? '',
      }),
    [searchParams]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INhfFilterDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<INhfFilterDto> = (data: INhfFilterDto) => {
    setSearchParams(
      QueryParamsHelper.generatePropertyQueryParams(QueryParamsHelper.stripInvalidPropertyParams({
        ...qparams, ...data
      }))
    );
    setShow(false)
  }

  return (
    <DropDownButton
      text="Filter"
      show={show}
      icon={<Filter />}
      setShow={setShow}
      {...rest}
      className={`${className} ${styles.container}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.dropdown}
      >
        <h3>Property Filter</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormGroup>
            <Controller
              name="baths"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Baths"
                />
              )}
            />
            {errors.baths && <FormError>{errors.baths.message}</FormError>}
          </FormGroup>
          <FormGroup>
            <Controller
              name="beds"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Beds"
                />
              )}
            />
            {errors.beds && <FormError>{errors.beds.message}</FormError>}
          </FormGroup>
        </div>
        <FormGroup className="w-full">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Location"
              />
            )}
          />
          {errors.location && <FormError>{errors.location.message}</FormError>}
        </FormGroup>
        <FormGroup className="w-full">
          <FormLabel>Type</FormLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={undefined}>
                {propertyTypeOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors?.type && <FormError>{errors?.type?.message}</FormError>}
        </FormGroup>

        <FormGroup className="w-full">
          <FormLabel>Status</FormLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={undefined}>
                {statusOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.status && <FormError>{errors.status.message}</FormError>}
        </FormGroup>

        <h3>Date Range</h3>
        <FormGroup className="w-full">
          <div className="grid gap-4 grid-cols-2">
            <Controller
              name="from_date"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                />
              )}
            />
            <Controller
              name="to_date"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  max={formatDate(new Date())}
                />
              )}
            />
          </div>
          {errors.to_date && <FormError>{errors.to_date.message}</FormError>}
          {errors.from_date && (
            <FormError>{errors.from_date.message}</FormError>
          )}
        </FormGroup>
        <Button type="submit">Apply</Button>
      </form>
    </DropDownButton>
  );
}
