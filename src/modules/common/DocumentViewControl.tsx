import { useAppDispatch, useAppSelector } from "@/redux/store"
import LinkButton from "./LinkButton"
import Spinner from "./Spinner"
import Button from "./Button"
import { IAPIError } from "@/types"
import { useState } from "react"
import { useCreatePresignedUrlMutation } from "@/redux/services/api"
import { addUrl } from "@/redux/services/presignerSlice"
import { useToastContext } from "@/context/ToastContext_"

interface IProps {
    url: string
}

export default function DocumentViewControl({ url }: IProps) {
    const dispatch = useAppDispatch()
    const { pushToast } = useToastContext()
    const { cache } = useAppSelector(state => state.presigner)
    const [presignedUrl, setPresignedUrl] = useState<string | null | undefined>(() => {
        const item = cache.find(item => item.orginal == url)

        if (!item) {
            return null
        }

        return item.expiration > Date.now() ? item.presigned : null
    })

    const [createUrl, { isLoading: isCreatingUrl }] = useCreatePresignedUrlMutation()

    const createPresignedUrl = async () => {
        try {
            const response = await createUrl(url).unwrap()
            setPresignedUrl(response)
            dispatch(addUrl({
                original: url,
                presigned: response
            }))

            pushToast({
                message: 'Secure URL Created',
                type: 'success'
            })
        } catch (err) {
            const error = err as IAPIError
            pushToast({
                message: error.data.message,
                type: 'error'
            })

        }
    }

    return (
        <>
            {presignedUrl && <LinkButton
                className="h-fit"
                variant="outline"
                to={presignedUrl}
                target="_blank"
            >
                View
            </LinkButton>}
            {!presignedUrl && <Button variant="outline" onClick={createPresignedUrl}>{isCreatingUrl && <Spinner size="sm" />} Unlock</Button>}
        </>
    )
}
