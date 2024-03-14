import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./RequestFilter.module.css";
import Button from "@/modules/common/Button/Button";
import DateInput from "@/modules/common/form/DateInput";
import { formatDate } from "@/helpers/dateFormat";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/modules/common/form/FormError";
import DropDownButton from "@/modules/common/DropDownButton";
import Filter from "@/modules/common/icons/Filter";
import { IRequestFilter } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import CheckRadio from "@/modules/common/form/CheckRadio";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import { useSearchParams } from "react-router-dom";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  qparams: Record<string, string | null | number | ''>
}

export default function RequestFilter({
  className,
  qparams,
  ...rest
}: IProps) {
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues: IRequestFilter = {
    date_from: searchParams.get("date_from") ?? '',
    date_to: searchParams.get("date_to") ?? '',
    status: searchParams.get("status") ?? '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestFilter>({ defaultValues });

  const onSubmit: SubmitHandler<IRequestFilter> = (data) => {
    setSearchParams(
      QueryParamsHelper.generateRequestQueryParams(QueryParamsHelper.stripInvalidRequestParams({
        ...qparams, ...data
      }))
    );
    setShow(false)
  };

  return (
    <DropDownButton
      text="Filter"
      icon={<Filter />}
      show={show}
      setShow={setShow}
      {...rest}
      className={`${className} ${styles.container}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.dropdown}>
        <h3>Date Range</h3>
        <div className={styles.dates}>
          <div className={styles.dates}>
            <Controller
              name="date_from"
              control={control}
              render={({ field }) => <DateInput {...field} />}
            />
            <Controller
              name="date_to"
              control={control}
              render={({ field }) => (
                <DateInput {...field} max={formatDate(new Date())} />
              )}
            />
          </div>
          {errors.date_to && <FormError>{errors.date_to.message}</FormError>}
          {errors.date_from && (
            <FormError>{errors.date_from.message}</FormError>
          )}
        </div>
        {errors.date_from && <FormError>{errors.date_from.message}</FormError>}
        {errors.date_to && <FormError>{errors.date_to.message}</FormError>}
        <FormGroup>
          <FormLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CheckRadio
                  {...field}
                  id="status"
                  value="pending"
                  defaultChecked={status === "on_going"}
                />
              )}
            />
            Pending
          </FormLabel>
        </FormGroup>
        <FormGroup>
          <FormLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CheckRadio
                  {...field}
                  id="status"
                  value="competed"
                  defaultChecked={status === "completed"}
                />
              )}
            />
            Treated
          </FormLabel>
        </FormGroup>
        {errors.status && <FormError>{errors.status.message}</FormError>}
        <Button type="submit">Apply</Button>
      </form>
    </DropDownButton>
  );
}
