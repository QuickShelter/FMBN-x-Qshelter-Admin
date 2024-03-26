import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./UserSort.module.css";
import Button from "@/modules/common/Button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/modules/common/form/FormError";
import DropDownButton from "@/modules/common/DropDownButton";
import { ISortOrder, IUserSortDto } from "@/types";
import CheckRadio from "@/modules/common/form/CheckRadio";
import FormLabel from "@/modules/common/form/FormLabel";
import FormGroup from "@/modules/common/form/FormGroup";
import Sort from "@/modules/common/icons/Sort";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleSubmit: SubmitHandler<IUserSortDto>;
  sort: ISortOrder;
}

export default function UserSort({
  handleSubmit: _onSubmit,
  sort,
  ...rest
}: IProps) {
  const defaultValues: Pick<IUserSortDto, "sort"> = {
    sort,
  };

  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSortDto>({ defaultValues });

  const onSubmit: SubmitHandler<IUserSortDto> = (data) => {
    setShow(false);
    _onSubmit(data);
  };

  return (
    <DropDownButton
      text="Sort"
      icon={<Sort />}
      show={show}
      setShow={setShow}
      {...rest}
      className={`${rest.className} ${styles.container}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.dropdown}>
        <h3>Date Range</h3>
        <div className="flex flex-col gap-4">
          <FormGroup>
            <FormLabel>
              <Controller
                name="sort"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CheckRadio
                    {...field}
                    id="sort"
                    value="asc"
                    defaultChecked={sort === "asc"}
                  />
                )}
              />
              Ascending
            </FormLabel>
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <Controller
                name="sort"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CheckRadio
                    {...field}
                    id="sort"
                    value="desc"
                    defaultChecked={sort === "desc"}
                  />
                )}
              />
              Descending
            </FormLabel>
          </FormGroup>
        </div>
        {errors.sort && <FormError>{errors.sort.message}</FormError>}
        <Button type="submit">Apply</Button>
      </form>
    </DropDownButton>
  );
}
