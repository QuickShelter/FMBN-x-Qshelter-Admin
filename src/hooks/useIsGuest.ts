import { useAppSelector } from '@/redux/store';

function useIsGuest() {

    const { token } = useAppSelector(state => state.auth)

    return token == null;
}

export default useIsGuest;
