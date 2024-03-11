
import { IProjectSortType } from "@/types";
import Select from "@/modules/common/form/Select";
import { InputHTMLAttributes } from "react";
import Sort from "@/modules/common/icons/Sort";

export default function ProjectSort({ className, ...rest }: InputHTMLAttributes<HTMLSelectElement>) {

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

  return (
    <Select {...rest} className={`${className} card`} defaultValue={'id:DESC'} tralingIcon={<Sort />}>
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
