import { useToastContext } from '@/context/ToastContext_';

function usePushToast() {
    const { pushToast } = useToastContext()
    return pushToast;
}

export default usePushToast;
