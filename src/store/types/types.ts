import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionsType, RootState, store } from '@/store/store';

export interface IData<D> {
  data: D[]
  teachers: ITeacher[]
  isLoading: boolean
  error: string
}

export interface IGroupsInfo {
  subjectName: string
  groupInfo: IGroupInfo
  hours: IHours
  exam: boolean
  offset: boolean
  additionalInfo: string
  countPodgroups: string
  uniqueId: string
  podgroups: IPodgroup[]
}

export interface IGroupInfo {
  course: string
  semestr: string
  studentsNumber: string
  groupName: string
}

export interface IHours {
  lecturesHours: string
  laboratoryHours: string
  practicHours: string
  seminarHours: string
}

export interface IPodgroup {
  countStudents: string
  laboratoryTeacher: string
  lectureTeacher: string
  practiceTeacher: string
  seminarTeacher: string
  examTeacher: string
  offsetTeacher: string
}

export interface ITeacher {
  id: string
  name: string
}

export interface IResponseData {
  subjectName: string
  "course": string
  "semestr": string
  "studentsNumber": string
  "groupName": string
  lecturesHours: string
  laboratoryHours: string
  practicHours: string
  seminarHours: string
  exam: boolean
  offset: boolean
  additionalInfo: string
  countPodgroups: string
  uniqueId: string
  podgroups: IPodgroup[]
}

export interface ICountStudents {
  groupId: string
  podgroupNumber: number
  countStudents: string
}

export type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type AppThunk = ThunkAction<void | any, RootState, unknown, ActionsType>
export type AppDispatch = typeof store.dispatch
export type IAppDispatch = ThunkDispatch<RootState, any, ActionsType>
