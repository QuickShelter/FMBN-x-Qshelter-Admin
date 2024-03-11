import {
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import styles from "./ProjectFilter.module.css";
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

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  qparams: Record<string, string>
}

export interface IProjectFilterDto {
  from_date: string;
  to_date: string;
}

export default function ProjectFilter({ className, qparams, ...rest
}: IProps) {
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues = useMemo(
    () =>
      QueryParamsHelper.stripInvalidProjectParams({
        from_date: searchParams.get("from_date") ?? '',
        to_date: searchParams.get("to_date") ?? '',
      }),
    [searchParams]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectFilterDto>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IProjectFilterDto> = (data: IProjectFilterDto) => {
    setSearchParams(
      QueryParamsHelper.generateProjectQueryParams(QueryParamsHelper.stripInvalidProjectParams({
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
        <h3>Project Filter</h3>
        <h3>Date Range</h3>
        <FormGroup className="">
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
