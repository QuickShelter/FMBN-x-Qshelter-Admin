import { DetailedHTMLProps, HTMLAttributes, useMemo, useState } from "react";
import styles from "./RequestFilter.module.css";
import Button from "@/modules/common/Button/Button";
import DateInput from "@/modules/common/form/DateInput";
import { formatDate } from "@/helpers/dateFormat";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/modules/common/form/FormError";
import DropDownButton from "@/modules/common/DropDownButton";
import Filter from "@/modules/common/icons/Filter";
import { IRequestFilter, IRequestStatus, IRequestType } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import CheckRadio from "@/modules/common/form/CheckRadio";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import { useSearchParams } from "react-router-dom";
import StringHelper from "@/helpers/StringHelper";

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

  const requestType = searchParams.get("type") ?? ''

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestFilter>({ defaultValues });

  const onSubmit: SubmitHandler<IRequestFilter> = (data) => {
    setSearchParams(
      QueryParamsHelper.generateRequestQueryParams({
        ...qparams, ...data
      })
    );
    setShow(false)
  };

  const possibleStatuses: IRequestStatus[] = useMemo(() => {
    const mortgageClass: IRequestStatus[] = ['ready_for_mortgage', 'cancelled', 'completed', 'approved', 'send_offer_letter_from_bank']

    switch (requestType as IRequestType) {
      case 'nhf':
        return mortgageClass

      case 'rto':
        return mortgageClass

      case 'contribution':
        return mortgageClass

      case 'application_form':
        return ['received', 'approved']

      default:
        return ['on_going', 'pending', 'completed', 'cancelled']
    }
  }, [requestType])

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
        {possibleStatuses?.map(status =>
          <FormGroup>
            <FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CheckRadio
                    {...field}
                    id="status"
                    value={status}
                    defaultChecked={field.value === status}
                  />
                )}
              />
              {StringHelper.stripUnderscores(status)}
            </FormLabel>
          </FormGroup>
        )}
        {errors.status && <FormError>{errors.status.message}</FormError>}
        <Button type="submit">Apply</Button>
      </form>
    </DropDownButton>
  );
}
