import { instance } from './api';
import { IData, IResponseData } from '@/store/types/types';

export const subjectApi = {
  fetchData() {
    return instance.get<IData<IResponseData>>(`test`)
      .then(res => res.data)
  },
  saveData(data: IResponseData[]) {
    return instance.put(`test_result`, data)
      .then(res => res.data)
  },

}
