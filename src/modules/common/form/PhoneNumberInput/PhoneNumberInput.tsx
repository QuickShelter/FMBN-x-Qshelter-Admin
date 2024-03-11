import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useMemo,
  RefObject,
} from "react";
import styles from "./PhoneNumberInput.module.css";
import { useState } from "react";
import ChevronDown from "../../icons/ChevronDown";
import NG from "../../icons/NG";
import GB from "../../icons/GB";
import US from "../../icons/US";
import { useClickAway } from "@uidotdev/usehooks";
import CA from "../../icons/CA";
import Hr from "../../Hr";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  required?: boolean;
  setPnPrefix: (val: string) => void;
}

type ICountry = "NG" | "GB" | "US" | "CA";

const prefixMap: Record<ICountry, string> = {
  NG: "+234",
  GB: "+44",
  US: "+1",
  CA: "+1",
};

export default function PhoneNumberInput(props: IProps) {
  const [option, setOption] = useState<ICountry>("NG");
  const [showOptions, setShowOptions] = useState(false);
  const { required = false, ...rest } = props;

  const toggleShowOptions = () => setShowOptions((prev) => !prev);

  const flagMap = useMemo(() => {
    const _flagMap: Record<ICountry, ReactElement> = {
      NG: <NG className={styles.img} />,
      GB: <GB className={styles.img} />,
      US: <US className={styles.img} />,
      CA: <CA className={styles.img} />,
    };

    return _flagMap;
  }, []);

  const ref = useClickAway(() => {
    setShowOptions(false);
  });

  const allowedOptions = useMemo(() => {
    return Object.keys(flagMap).filter((value) => value !== option);
  }, [flagMap, option]);

  return (
    <div className={`${props.className} ${styles.container}`}>
      <div ref={ref as RefObject<HTMLDivElement>} className={styles.wrapper}>
        <button type="button" onClick={toggleShowOptions} className={styles.dropdownButton}>
          {flagMap[option as ICountry]}
          <ChevronDown
            stroke="#A6ACB5"
            className={`${styles.chevron} ${showOptions ? styles.show : ""}`}
          />
        </button>
        {showOptions && (
          <div className={styles.dropdown}>
            {allowedOptions.map((value, index) => {
              return (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setOption(value as ICountry);
                      props.setPnPrefix(value);
                      setShowOptions(false);
                    }}
                  >
                    {flagMap[value as ICountry]}
                  </button>
                  {index < allowedOptions.length - 1 ? <Hr /> : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.preview}>{prefixMap[option]}</div>
      <input
        {...rest}
        onBlur={(e) => {
          const value = e.target.value

          if (value && value.length > 0 && value?.[0] === '0') {
            e.target.value = e.target.value.slice(1)
          }
        }}
        onChange={(e) => {
          const value = e.target.value

          if (value && value.length > 0 && value?.[0] === '0') {
            e.target.value = e.target.value.slice(1)
          }
          return rest.onChange ? rest.onChange(e) : true
        }}
        maxLength={15}
        required={required}
        type={"tel"}
        className={styles.input}
      />
    </div>
  );
}
