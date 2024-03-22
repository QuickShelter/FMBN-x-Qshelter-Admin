import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import FormGroup from "@/modules/common/form/FormGroup/FormGroup";
import FormLabel from "@/modules/common/form/FormLabel/FormLabel";
import Button from "@/modules/common/Button/Button";
import { useAppSelector } from "@/redux/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "@/modules/common/form/Select/Select";
import {
    IAPIError,
    IApartment,
    IUnitStatus,
    IUnitStatusUpdateDto,
    IUnitUpdateDto,
} from "@/types";
import FormError from "@/modules/common/form/FormError";
import { useUpdateUnitByIdMutation } from "@/redux/services/api";
import PropertyHelper from "@/helpers/PropertyHelper";
import useToast from "@/hooks/useToast";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    unit: IApartment;
    closeModal: () => void
}

function resolveSold(status: IUnitStatus) {
    switch (status) {
        case 'sold':
            return true

        case 'available':
            return false

        case 'locked':
            return false

        default:
            return false
    }
}

function resolveAvailability(status: IUnitStatus) {
    switch (status) {
        case 'available':
            return true

        case 'locked':
            return false

        case 'sold':
            return false

        default:
            return false
    }
}

export default function ChangeUnitStatusForm({ unit, closeModal, ...rest }: IProps) {
    const profile = useAppSelector((state) => state.auth.profile);
    const [updateUnit, { isLoading }] = useUpdateUnitByIdMutation()
    const { pushToast } = useToast()

    const defaultValues = useMemo(() => {
        return {
            status: PropertyHelper.resolveUnitStatus(unit) ?? 'locked',
            user_id: profile?.id ?? '',
            id: unit?.id ?? ''
        }
    }, [unit, profile?.id])


    const statusOptions: {
        label: string;
        value: string;
    }[] = [
        {
            label: "Sold",
            value: "sold",
        },
        {
            label: "Locked",
            value: "locked",
        },
        {
            label: "Available",
            value: "available",
        },
    ].filter(option => option.value !== PropertyHelper.resolveUnitStatus(unit));

    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm<IUnitStatusUpdateDto>({
        defaultValues
    });

    const onSubmit: SubmitHandler<IUnitStatusUpdateDto> = async (data) => {
        const payload: IUnitUpdateDto = {
            user_id: data.user_id,
            id: data.id,
            name: unit.name,
            bedroom_count: unit.bedroom_count,
            bathroom_count: unit.bathroom_count,
            floor: unit.floor,
            available: resolveAvailability(data.status),
            sold: resolveSold(data.status)
        }
        await handleUpdateStatus(payload);
    };

    const handleUpdateStatus = async (payload: IUnitUpdateDto) => {
        try {
            const response = await updateUnit(payload).unwrap()

            if (response?.ok) {
                pushToast({
                    message: "Updated",
                    type: "success",
                })

                reset(defaultValues)
                await trigger('status')
            }
        } catch (error) {
            pushToast({
                message:
                    (error as IAPIError)?.data?.data?.error ?? "Something went wrong",
                type: "error",
            })
        } finally {
            closeModal()
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...rest}
            className={`${rest.className} p-4 flex flex-col gap-5 min-w-[300px] sm:min-w-[350px]`}
        >
            <div>
                <h3>Change Status</h3>
            </div>
            <FormGroup>
                <FormLabel>Unit Status</FormLabel>
                <Controller
                    name="status"
                    defaultValue={undefined}
                    control={control}
                    rules={{ required: 'Choose status' }}
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
                {errors.status && <FormError>{errors?.status?.message}</FormError>}
            </FormGroup>
            <Button
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
            >
                Change Status
            </Button>
        </form>
    );
}
