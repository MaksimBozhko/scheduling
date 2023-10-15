import { RootState } from '@/store/store';
import { KeyType } from '@/components/teachersSelector/TeachersSelector';
import { createSelector } from 'reselect';

export const getError = (state: RootState): string => state.subject.error || ''
export const getIsLoading = (state: RootState) => state.subject.isLoading
export const getData = (state: RootState) => state.subject.data || []
export const getTeachers = (state: RootState) => state.subject.teachers

export const getAdditionalInfo = (id: string) => (state: RootState) => {
  const subject = state.subject.data.find((subject) => subject.uniqueId === id)
  if (subject) {
    return subject.additionalInfo
  }
}

export const getPodgroupValue = (id: string, podgroupNumber: number, key?: KeyType) => (state: RootState) => {
  const subject = state.subject.data.find((subject) => subject.uniqueId === id)
  if (subject && key) {
    return subject.podgroups[podgroupNumber][key]
  }
}

export const getTeacherValue = (id: string, podgroupNumber: number, key?: KeyType) =>
  createSelector(getTeachers,
    getPodgroupValue(id, podgroupNumber, key),
    (teachers, id) => {
      const teacher = teachers.find(teacher => teacher.id == id)
      if (teacher) {
        return teacher.name
      }
      return teachers[0].name
    }
  )
