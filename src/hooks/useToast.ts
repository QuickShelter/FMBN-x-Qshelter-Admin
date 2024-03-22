import { useToastContext } from '@/context/ToastContext_';

function useToast() {
    const { pushToast, toasts } = useToastContext()
    return {
        toasts,
        pushToast
    };
}

export default useToast;
