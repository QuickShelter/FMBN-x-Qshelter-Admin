import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./TransactionsExportForm.module.css";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import BlockRadio from "@/modules/common/form/BlockRadio/BlockRadio";
import Button from "@/modules/common/Button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DateHelper from "@/helpers/DateHelper";
import { formatDate } from "@/helpers/dateFormat";
import { ITransactionExportDto, ITransactionStatus, ITransactionType } from "@/types";
import FormError from "../../common/form/FormError";
import DateInput from "../../common/form/DateInput";
import Select from "../../common/form/Select";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  module: "user" | "request" | "property" | "transaction";
  hasDateRange?: boolean;
  onExport: (
    dto: ITransactionExportDto
  ) => Promise<void>;
  isFetching: boolean;
  onClose: () => void;
}

export default function TransactionsExportForm(props: IProps) {
  const { module, title, onExport, hasDateRange = true, onClose, isFetching, ...rest } = props;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ITransactionExportDto>({
    defaultValues: {
      from_date: formatDate(DateHelper.getMinExportDate()),
      to_date: formatDate(new Date()),
      format: "pdf",
      type: "",
      status: ""
    },
  });

  const [localFromDate, setLocalFromDate] = useState(
    DateHelper.getMinExportDate(new Date())
  );

  const onSubmit: SubmitHandler<ITransactionExportDto> = async ({ format, ...params }) => {
    const fromDate = new Date(params.from_date);
    const toDate = new Date(params.to_date);

    if (fromDate > toDate) {
      setError("to_date", {
        type: "manual",
        message: "From_date cannot be after to_date",
      });
    }

    if (Math.abs(DateHelper.getMonthDifference(fromDate, toDate)) > 3) {
      setError("to_date", {
        type: "manual",
        message: "3 months max range",
      });
    }

    if (!params.status || params.status.length < 1) {
      delete params.status
    }

    if (!params.type || params.type.length < 1) {
      delete params.type
    }

    await onExport({ format, ...params });
    onClose();
  };

  const typeOptions: {
    label: string;
    value: ITransactionType | "";
  }[] = [
      {
        label: "Credit",
        value: "credit",
      },
      {
        label: "Debit",
        value: "debit",
      },
    ];

  const statusOptions: {
    label: string;
    value: ITransactionStatus | "";
  }[] = [
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
      className={`${props.className} ${styles.container}`}
    >
      <div>
        <h3>{title}</h3>
        <p>Export transaction data into a csv or pdf file.</p>
      </div>
      <FormGroup>
        <FormLabel>Type</FormLabel>
        <Controller
          name="type"
          defaultValue={undefined}
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Select {...field}>
              <option value="">Choose Type</option>
              {typeOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.type && <FormError>{errors.type.message}</FormError>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Status</FormLabel>
        <Controller
          name="status"
          defaultValue={undefined}
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Select {...field}>
              <option value="">Choose Status</option>
              {statusOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.status && <FormError>{errors.status.message}</FormError>}
      </FormGroup>

      <FormGroup>
        <FormLabel>Select format</FormLabel>
        <div className={styles.options}>
          <Controller
            name="format"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <BlockRadio
                defaultChecked={field.value === "pdf"}
                id="pdf"
                label="PDF"
                {...field}
                value="pdf"
                checked={field.value === "pdf"}
              />
            )}
          />
          <Controller
            name="format"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <BlockRadio
                defaultChecked={field.value === "csv"}
                label="CSV"
                id="csv"
                {...field}
                value="csv"
                checked={field.value === "csv"}
              />
            )}
          />
        </div>
        {errors.format && <FormError>{errors.format.message}</FormError>}
      </FormGroup>
      {hasDateRange && (
        <FormGroup>
          <div className={styles.dates}>
            <Controller
              name="from_date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DateInput
                  {...field}
                  readOnly
                  value={formatDate(localFromDate)}
                />
              )}
            />
            <Controller
              name="to_date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DateInput
                  {...field}
                  max={formatDate(new Date())}
                  onChange={(e) => {
                    setLocalFromDate(
                      DateHelper.getMinExportDate(new Date(e.target.value))
                    );
                  }}
                />
              )}
            />
          </div>
          {errors.to_date && <FormError>{errors.to_date.message}</FormError>}
          {errors.from_date && (
            <FormError>{errors.from_date.message}</FormError>
          )}
        </FormGroup>
      )}
      <Button isLoading={isFetching} type="submit" disabled={isFetching}>
        Export
      </Button>
    </form>
  );
}
