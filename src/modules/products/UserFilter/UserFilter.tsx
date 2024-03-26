import {
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import styles from "./UserFilter.module.css";
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
import { IUserFilterDto } from "@/types";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  qparams: Record<string, string>
}

export default function PropertyFilter({ className, qparams, ...rest
}: IProps) {
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues = useMemo(
    () =>
      QueryParamsHelper.stripInvalidUserParams({
        date_from: searchParams.get("date_from") ?? '',
        date_to: searchParams.get("date_to") ?? '',
      }),
    [searchParams]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFilterDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IUserFilterDto> = (data: IUserFilterDto) => {
    setSearchParams(
      QueryParamsHelper.generateUserQueryParams(QueryParamsHelper.stripInvalidUserParams({
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
        <h3>User Filter</h3>
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
