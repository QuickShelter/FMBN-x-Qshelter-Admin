import Button from "@/modules/common/Button/Button";
import styles from "./LogoutConfirmation.module.css";
import { persistor } from "@/redux/store";
import ConfirmationModal from "../../modals/ConfirmationModal";

interface IProps {
  onCancel: () => void;
  show: boolean;
}

export default function LogoutConfirmation(props: IProps) {
  return (
    <ConfirmationModal
      {...props}
      className="sm:min-w-[300px]"
      secondaryButton={
        <Button
          stretch
          type="submit"
          className={styles.close}
          variant="secondary"
          onClick={props.onCancel}
        >
          Stay
        </Button>
      }
      primaryButton={<Button onClick={
        () => {
          persistor.purge()
          props.onCancel()
        }
      }>Logout</Button>}
      prompt="Are you sure you want to leave?"
    />
  );
}
