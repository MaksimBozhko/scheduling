import './styles/App.scss'
import { useEffect } from 'react';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { Dashbord } from '@/components';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getData, getError, getIsLoading } from '@/store/selectors/selectors';
import { Loader } from '@/ui';
import { PageError } from '@/components/pageError';
import { asyncActions } from '@/store/acitons/asyncActions';
import { SaveButton } from '@/components/saveButton';

function App() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getData)
  const isLoading = useAppSelector(getIsLoading)
  const error = useAppSelector(getError)

  useEffect(() => {
    dispatch(asyncActions.fetchData())
  }, [dispatch])

  if (error) {
    return <PageError/>
  }
  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      <div className={'content'}>
        {
          data.map((subject) => (
            <Dashbord
              key={subject.uniqueId}
              data={subject}
            />
          ))
        }
      </div>
      <SaveButton className={'btn'}/>
    </div>
  )
}

export default App
