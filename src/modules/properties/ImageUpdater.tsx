import { useState, ChangeEventHandler } from "react";
import { IBase64Upload } from "@/types";
import Card from "@/modules/common/Card/Card";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import GalleryExport from "@/modules/common/icons/GalleryExport";
import buttonStyles from "@/module-styles/buttons.module.css";
import ControlledImageSlider from "./ControlledImageSlider";
import ImageHelper from "@/helpers/ImageHelper";
import { useToastContext } from "@/context/ToastContext_";

interface IProps {
  photos: (IBase64Upload | string)[];
  setValue: (value: (IBase64Upload | string)[]) => void,
  field: "aerial_image" | "display_image" | "floor_plan_image" | "model_3d_image"
}

export default function ImageUpdater({ photos, field, setValue }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pushToast } = useToastContext()

  const handleImagePicked: ChangeEventHandler = async (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.files?.[0];

    if (!value) {
      return
    }

    try {
      const { base64, extension } = await ImageHelper.getBase64AndExtension(value)
      const newPhotos = [...photos]

      if (field === 'display_image') {
        newPhotos.splice(currentIndex, 1, { attachment: base64, attachment_ext: extension })
        setCurrentIndex(prevState => prevState < 0 ? prevState + 1 : prevState)
        setValue(newPhotos)
      } else {
        newPhotos.splice(currentIndex + 1, 0, { attachment: base64, attachment_ext: extension })
        setCurrentIndex(prevState => prevState + 1)
        setValue(newPhotos)
      }

    } catch (error) {
      console.log(error)
      pushToast({
        message: 'Something went wrong',
        type: 'error'
      })
    } finally {
      target.value = ''
    }

  };

  const handleDeleteImage = async () => {
    const newPhotos = [...photos]
    newPhotos.splice(currentIndex, 1)

    setValue(newPhotos)
    setCurrentIndex(prevState => prevState > -1 ? prevState - 1 : prevState)
  };

  if (!photos) return null;

  return (
    <Card className="p-[1.25rem] h-fit">
      <fieldset className="">
        <div className="flex justify-between">
          <div className="">Images</div>
          <div className="text-neutral-500 text-sm font-normal leading-[16.80px]">
            {`${currentIndex + 1}/${photos?.length}`}
          </div>
        </div>
        {photos && (
          <ControlledImageSlider
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            width={280}
            height={280}
            images={photos}
          />
        )}
        <div className="grid grid-cols-2 gap-4">
          <Button
            disabled={photos?.length < 1}
            onClick={handleDeleteImage}
            variant="secondary"
            className="bg-white rounded-[10px] shadow border border-zinc-100" // The combination of styles was intentional
            leadingIcon={<GalleryExport />}
          >
            Remove
          </Button>
          <FormLabel
            className={`bg-white rounded-[10px] shadow border border-zinc-100 ${buttonStyles.secondary}`}
          >
            <GalleryExport />
            Pick
            <input
              onChange={handleImagePicked}
              type="file"
              accept=".jpg, .jpeg, .png"
              hidden
            />
          </FormLabel>
        </div>
      </fieldset>
    </Card>
  );
}
