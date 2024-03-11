import { useAppSelector } from '@/redux/store';

function useGetCurrentUser() {

    const { profile } = useAppSelector(state => state.auth)

    return profile;
}

export default useGetCurrentUser;
