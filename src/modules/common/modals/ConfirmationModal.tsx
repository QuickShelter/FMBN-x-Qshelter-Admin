import {
  DetailedHTMLProps,
  FormEventHandler,
  HTMLAttributes,
  ReactNode,
} from "react";
import Modal from "../Modal";

interface IProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  prompt: string;
  secondaryButton: ReactNode;
  primaryButton: ReactNode;
  onCancel: () => void;
  show: boolean;
}

export default function ConfirmationModal(props: IProps) {
  const { show, prompt, onCancel, secondaryButton, primaryButton, ...rest } =
    props;

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      onCancel={onCancel}
      show={show}
      onSubmit={handleSubmit}
      {...rest}
      closeFormClassName=""
      className={`${props.className} min-w-[300px]`}
    >
      <div className={`flex flex-col gap-6`}>
        <div className="mt-4 text-slate-900 text-l font-normal leading-normal px-4">
          {prompt}
        </div>
        <div className="px-4 pb-4 flex flex-col gap-2 sm:flex-row sm:justify-between items-center">
          <div className="flex gap-[10px] ml-auto">
            {secondaryButton && secondaryButton}
            {primaryButton && primaryButton}
          </div>
        </div>
      </div>
    </Modal>

  );
}
