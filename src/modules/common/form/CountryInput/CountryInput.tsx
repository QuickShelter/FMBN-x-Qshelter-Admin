import { InputHTMLAttributes } from "react";
import styles from "./CountryInput.module.css";
import TextInput from "../TextInput";
import { useGetCountriesQuery } from "@/redux/services/api";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function CountryInput({ className, ...rest }: IProps) {
  const { data: countries } = useGetCountriesQuery()

  return (
    <>
      <TextInput
        {...rest}
        list="country-list"
        className={`${styles.container} ${className}`}
        type="text"
      />
      <datalist id="country-list">
        {
          countries?.map((country: string) => <option key={country} value={country}>country</option>)
        }
      </datalist>
    </>
  );
}
