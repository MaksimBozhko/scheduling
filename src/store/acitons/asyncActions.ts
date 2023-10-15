import { subjectApi } from '@/api';
import { actions } from '@/store/acitons/actions';
import { AppThunk } from '@/store/types/types';



const fetchData = (): AppThunk => async (dispatch) => {
  dispatch(actions.setIsLoading(true))
  try {
    const response = await subjectApi.fetchData()
    dispatch(actions.setData(response))
  }
  catch (e: any) {
    dispatch(actions.setError(e.message ? e.message : 'Some error occurred'))
  }
  finally {
    dispatch(actions.setIsLoading(false))
  }
};

const saveData = (): AppThunk => async (dispatch, getState) => {
  const data = getState().subject.data.map(item => {
    const {hours, groupInfo, ...rest} = item;
    return Object.assign({}, rest, hours, groupInfo);
  })

  try {
    await subjectApi.saveData(data)
  } catch (e: any) {
    dispatch(actions.setError(e.message ? e.message : 'Some error occurred'))
  }
};

export const asyncActions = {
  fetchData,
  saveData
}
