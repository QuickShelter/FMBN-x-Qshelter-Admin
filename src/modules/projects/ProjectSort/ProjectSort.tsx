
import { IProjectSortType } from "@/types";
import Select from "@/modules/common/form/Select";
import { InputHTMLAttributes, useMemo } from "react";
import Sort from "@/modules/common/icons/Sort";
import { useSearchParams } from "react-router-dom";
import QueryParamsHelper from "@/helpers/QueryParamsHelper";
import { Controller, useForm } from "react-hook-form";
import FormGroup from "@/modules/common/form/FormGroup";

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
  qparams: Record<string, string>
}

interface IData {
  sortBy: IProjectSortType
}

export default function ProjectSort({ className, qparams, ...rest }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortOptions: Array<{
    label: string,
    value: IProjectSortType
  }> = [
      {
        label: 'ID ASC',
        value: "id:ASC"
      },
      {
        label: 'ID DESC',
        value: "id:DESC"
      }
    ]

  const defaultValues: IData = useMemo(() => {
    return {
      sortBy: (searchParams.get('sortBy') as IProjectSortType) ?? 'id:DESC'
    }
  }, [searchParams])

  const {
    control,
    handleSubmit,
  } = useForm<{ sortBy: IProjectSortType }>({
    defaultValues,
  });

  const onSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Controller
          control={control}
          name="sortBy"
          render={({ field }) => (
            <Select {...rest} onChange={(e) => {
              const params = QueryParamsHelper.generateProjectQueryParams({
                ...qparams,
                sortBy: e.target.value as IProjectSortType,
              });
              field.onChange(e)
              setSearchParams(params);
            }} className={`${className} card font-semibold`} defaultValue={'id:DESC'} tralingIcon={<Sort />}>
              {sortOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )} />
      </FormGroup>
    </form>
  );
}
