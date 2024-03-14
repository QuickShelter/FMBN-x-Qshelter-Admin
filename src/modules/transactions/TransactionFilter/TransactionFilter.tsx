import {
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import styles from "./TransactionFilter.module.css";
import Button from "@/modules/common/Button/Button";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import DateInput from "@/modules/common/form/DateInput";
import DropDownButton from "@/modules/common/DropDownButton";
import { formatDate } from "@/helpers/dateFormat";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import FormError from "@/modules/common/form/FormError";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import Filter from "@/modules/common/icons/Filter";
import Select from "@/modules/common/form/Select";
import { ITransactionType } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  qparams: Record<string, string | null | number | ''>
}

export interface ITransactionFilterDto {
  date_from: string;
  date_to: string;
  type: ITransactionType | '',
}

const typeOptions: { label: string, value: ITransactionType | '' }[] =
  [
    {
      label: "Choose Type",
      value: ''
    },
    {
      label: "Credit",
      value: "credit"
    },
    {
      label: "Debit",
      value: "debit"
    }
  ]

export default function TransactionFilter({ className, qparams, ...rest
}: IProps) {
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues = useMemo(
    () =>
      QueryParamsHelper.stripInvalidTransactionParams({
        date_from: searchParams.get("date_from") ?? '',
        date_to: searchParams.get("date_to") ?? '',
        type: searchParams.get("type") ?? ''
      }),
    [searchParams]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransactionFilterDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<ITransactionFilterDto> = (data) => {
    setSearchParams(
      QueryParamsHelper.generateTransactionQueryParams({
        ...qparams, ...data
      })
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
        <h3>Transaction Filter</h3>
        <FormGroup className="w-full">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={undefined}>
                {typeOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.type && <FormError>{errors.type.message}</FormError>}
        </FormGroup>

        <h3>Date Range</h3>
        <FormGroup className="w-full">
          <div className="grid gap-4 grid-cols-2">
            <Controller
              name="date_from"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                />
              )}
            />
            <Controller
              name="date_to"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  max={formatDate(new Date())}
                />
              )}
            />
          </div>
          {errors.date_to && <FormError>{errors.date_to.message}</FormError>}
          {errors.date_from && (
            <FormError>{errors.date_from.message}</FormError>
          )}
        </FormGroup>
        <Button type="submit">Apply</Button>
      </form>
    </DropDownButton>
  );
}
