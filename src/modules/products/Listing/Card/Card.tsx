import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./Card.module.css";
import { IProduct } from "@/types";
import More from "@/modules/common/More/More";
import Button from "@/modules/common/Button/Button";
import Hr from "@/modules/common/Hr/Hr";
import Eye from "@/modules/common/icons/Eye";
import Edit from "@/modules/common/icons/Edit";
import LinkButton from "@/modules/common/LinkButton";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  data: IProduct;
  perPage: number;
  index: number
}

export default function Card(props: IProps) {
  const { data, index, ...rest } = props;
  const {
    activeLoans,
    interest,
    maxAmount,
    maxTenor,
    name,
    pastLoans,
  } = data;

  const [showMore, setShowMore] = useState(false);
  return (
    <tr {...rest} className={`${props.className} ${styles.container}`}>
      <td>{index}</td>
      <td>{name}</td>
      <td >{activeLoans}</td>
      <td>{pastLoans}</td>
      <td>{interest}</td>
      <td>{maxTenor}</td>
      <td>{maxAmount}</td>
      <td className="flex justify-end">
        <More
          show={showMore}
          onClose={() => setShowMore(false)}
          onOpen={() => setShowMore(true)}
          dropdownClassName={styles.more}
          onClick={() => {
            setShowMore(true);
          }}
          className="h-fit"
        >
          <LinkButton to={`/products/nhf`} variant="clear" stretch>
            <Eye /> View
          </LinkButton>
          <Hr />
          <Button
            leadingIcon={<Edit />}
            variant="clear"
            onClick={() => {
              setShowMore(false);
            }}
          >
            Edit
          </Button>
        </More>
      </td >
    </tr >
  );
}
