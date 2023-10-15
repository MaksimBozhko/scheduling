import { ICountStudents, IData, IResponseData } from '@/store/types/types';
import {
  ADD_PODGROUP,
  REMOVE_PODGROUP,
  SET_ADDITIONAL_INFO,
  SET_ALL_TEACHER,
  SET_COUNT_STUDENTS,
  SET_DATA,
  SET_ERROR,
  SET_IS_LOADING,
  SET_TEACHER
} from '@/store/const/const';
import { KeyType } from '@/components/teachersSelector/TeachersSelector';

export const actions = {
  setData: (data: IData<IResponseData>) => ({type: SET_DATA, payload: data} as const),
  setIsLoading: (isLoading: boolean) => ({type: SET_IS_LOADING, payload: isLoading} as const),
  setError: (error: string) => ({type: SET_ERROR, payload: error} as const),
  setTeacher: (id: string, teacherId: string, podgroupNumber: number, key?: KeyType) => ({
    type: SET_TEACHER,
    payload: {id, teacherId, podgroupNumber, key}
  } as const),
  setAdditionalInfo: (id: string, value: string) => ({type: SET_ADDITIONAL_INFO, payload: {id, value}} as const),
  setCountStudents: ({groupId, podgroupNumber, countStudents}: ICountStudents) => ({
    type: SET_COUNT_STUDENTS,
    payload: {groupId, podgroupNumber, countStudents}
  } as const),
  addPodgroup: (groupId: string) => ({type: ADD_PODGROUP, payload: groupId} as const),
  removePodgroup: (groupId: string) => ({type: REMOVE_PODGROUP, payload: groupId} as const),
  setAllTeacher: (groupId: string, podgroupNumber: number, teacherId: string) => ({
    type: SET_ALL_TEACHER,
    payload: {groupId, podgroupNumber, teacherId}
  } as const),
}
