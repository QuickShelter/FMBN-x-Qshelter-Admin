import { DetailedHTMLProps, HTMLAttributes } from "react";
import Modal from "@/modules/common/Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@/modules/common/Button";
import { IAPIError, IBuilding, IBuildingEditDto } from "@/types";
import FormGroup from "@/modules/common/form/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel";
import TextInput from "@/modules/common/form/TextInput";
import { useAppSelector } from "@/redux/store";
import { useUpdateBlockMutation } from "@/redux/services/api";
import PropertyHelper from "@/helpers/PropertyHelper";
import Spinner from "@/modules/common/Spinner";
import useToast from "@/hooks/useToast";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    show: boolean;
    onCancel: () => void
    building: IBuilding
}

/**
 * Has only styling information, and nothing about layout
 *
 * @param props
 * @returns
 */
export default function BuildingEditModal({ className, building, show, onCancel, ...rest }: IProps) {
    const { profile } = useAppSelector(state => state.auth)
    const { pushToast } = useToast()
    const [updateBlock, { isLoading }] = useUpdateBlockMutation()

    const { control, handleSubmit } = useForm<IBuildingEditDto>({
        defaultValues: {
            bathroom_count: building.bathroom_count ?? 0,
            bedroom_count: building.bedroom_count ?? 0,
            units: building.units ?? 0,
            name: building.name ?? "",
            user_id: profile?.id ?? "",
            building_id: building.id,
            amenities: PropertyHelper.getAmenitiesFromBuilding(building)
        }
    })

    const onSubmit: SubmitHandler<IBuildingEditDto> = async (payload) => {

        try {
            const response = await updateBlock({ ...payload, amenities: undefined, units: undefined }).unwrap()

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
            <div {...rest} className=" p-6 max-w-[500px] flex flex-col gap-4">
                <form

                    onSubmit={handleSubmit(onSubmit)}
                    className={`${className} flex flex-col gap-4 `}
                >
                    <div className="text-slate-900 text-2xl font-semibold leading-normal">{building.name}</div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormGroup className="col-span-2">
                            <FormLabel>Name</FormLabel>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) =>
                                    <TextInput {...field} />
                                }
                            />
                        </FormGroup>
                        <FormGroup className="">
                            <FormLabel>Number of Floors</FormLabel>
                            <Controller
                                name="floor_count"
                                control={control}
                                render={({ field }) =>
                                    <TextInput type='number' {...field} />
                                }
                            />
                        </FormGroup>
                        <FormGroup className="">
                            <FormLabel>Bedrooms</FormLabel>
                            <Controller
                                name="bedroom_count"
                                control={control}
                                render={({ field }) =>
                                    <TextInput type='number' {...field} />
                                }
                            />
                        </FormGroup>
                        <FormGroup className="">
                            <FormLabel>Bathrooms</FormLabel>
                            <Controller
                                name="bathroom_count"
                                control={control}
                                render={({ field }) =>
                                    <TextInput type='number' {...field} />
                                }
                            />
                        </FormGroup>
                    </div>
                    <Button disabled={isLoading} type="submit" variant="primary" className="w-fit ml-auto">{isLoading && <Spinner size="sm" />} Save</Button>
                </form>
            </div>
        </Modal>
    );
}
