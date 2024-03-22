import { DetailedHTMLProps, FormEventHandler, HTMLAttributes } from "react";
import Modal from "@/modules/common/Modal";
import PillCheck from "@/modules/common/form/PillCheck";
import Button from "@/modules/common/Button";
import { IAPIError, IBuilding } from "@/types";
import PropertyHelper from "@/helpers/PropertyHelper";
import { useAppSelector } from "@/redux/store";
import { useUpdateBlockMutation } from "@/redux/services/api";
import Spinner from "@/modules/common/Spinner";
import useToast from "@/hooks/useToast";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    show: boolean;
    onCancel: () => void
    block: IBuilding
}

const amenities = [
    '24Hrs Security',
    'All Rooms Ensuite',
    'Boys Quarter',
    'CCTV Camera',
    'C of O',
    'Elevator',
    'Free Wifi',
    'Fully Furnished',
    'Gym',
    'POP Ceiling',
    'Serviced',
    'Street Light',
]

/**
 * 
 *
 * @param props
 * @returns
 */
export default function AmenitiesSelectModal({ className, block, show, onCancel, ...rest }: IProps) {
    const initialValue = PropertyHelper.getAmenitiesFromBuilding(block)
    const { profile } = useAppSelector(state => state.auth)
    const { pushToast } = useToast()
    const [updateBlock, { isLoading }] = useUpdateBlockMutation()

    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const amenities: string[] = formData.getAll('amenities') as string[]

        try {
            const response = await updateBlock({
                name: block.name,
                building_id: block.id ?? "",
                user_id: profile?.id ?? "",
                amenities
            }).unwrap()

            if (response.ok) {
                pushToast({
                    message: response.message,
                    type: 'success'
                })
            }
        } catch (error) {
            const err = error as IAPIError
            pushToast({
                message: err.data.message,
                type: 'error'
            })
        } finally {
            onCancel()
        }
    }

    return (
        <Modal show={show} onCancel={onCancel}>
            <form {...rest}
                onSubmit={onSubmit}
                className={`${className} p-6 max-w-[500px] flex flex-col gap-4 `}
            >
                <div className="text-slate-900 text-2xl font-semibold leading-normal">Select Amenities</div>
                <div className="flex flex-wrap gap-2">
                    {amenities.map(amenity =>
                        <PillCheck value={amenity} name="amenities" defaultChecked={initialValue.includes(amenity)}>{amenity}</PillCheck>
                    )}
                </div>
                <Button disabled={isLoading} type="submit" variant="primary" className="w-fit ml-auto">{isLoading && <Spinner size="sm" />} Save</Button>
            </form>
        </Modal>
    );
}
