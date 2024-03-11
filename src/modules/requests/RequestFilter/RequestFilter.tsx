import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./RequestFilter.module.css";
import Button from "@/modules/common/Button/Button";
import DateInput from "@/modules/common/form/DateInput";
import { formatDate } from "@/helpers/dateFormat";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/modules/common/form/FormError";
import DropDownButton from "@/modules/common/DropDownButton";
import Filter from "@/modules/common/icons/Filter";
import { IRequestFilter, IRequestStatus } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import CheckRadio from "@/modules/common/form/CheckRadio";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleSubmit: SubmitHandler<IRequestFilter>;
  to_date?: string;
  from_date?: string;
  status: IRequestStatus;
}

export default function RequestFilter({
  handleSubmit: _onSubmit,
  to_date,
  from_date,
  status,
  ...rest
}: IProps) {
  const defaultValues: IRequestFilter = {
    from_date,
    to_date,
    status: "pending",
  };

  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestFilter>({ defaultValues });

  const onSubmit: SubmitHandler<IRequestFilter> = (data) => {
    setShow(false);
    _onSubmit(data);
  };

  return (
    <DropDownButton
      text="Filter"
      icon={<Filter />}
      show={show}
      setShow={setShow}
      {...rest}
      className={`${rest.className} ${styles.container}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.dropdown}>
        <h3>Date Range</h3>
        <div className={styles.dates}>
          <div className={styles.dates}>
            <Controller
              name="from_date"
              control={control}
              render={({ field }) => <DateInput {...field} />}
            />
            <Controller
              name="to_date"
              control={control}
              render={({ field }) => (
                <DateInput {...field} max={formatDate(new Date())} />
              )}
            />
          </div>
          {errors.to_date && <FormError>{errors.to_date.message}</FormError>}
          {errors.from_date && (
            <FormError>{errors.from_date.message}</FormError>
          )}
        </div>
        {errors.from_date && <FormError>{errors.from_date.message}</FormError>}
        {errors.to_date && <FormError>{errors.to_date.message}</FormError>}
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
