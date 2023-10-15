import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/types/types';

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
