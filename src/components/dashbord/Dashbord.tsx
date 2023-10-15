import cls from './dashbord.module.scss'
import { FC, memo, useCallback } from 'react'
import { classNames } from '@/common/lib/classNames';
import { GroupInfo, Header, Table } from '@/components';
import { Button, Card } from '@/ui';
import { IGroupsInfo } from '@/store/types/types';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { asyncActions } from '@/store/acitons/asyncActions';

interface IDashbord {
  className?: string
  data: IGroupsInfo
}

export const Dashbord: FC<IDashbord> = memo((props) => {
  const { className, data } = props
  const dispatch = useAppDispatch()

  const saveDataHandler = useCallback(() => {
    dispatch(asyncActions.saveData())
  }, [dispatch])

  return (
    <Card className={classNames(cls.dashbord, {}, [className])}>
      <Header subjectName={data.subjectName}/>
      <GroupInfo groupInfo={data.groupInfo}/>
      <Table
        className={cls.table}
        groupId={data.uniqueId}
        podgroups={data.podgroups}
        offset={data.offset}
        exam={data.exam}
        hours={data.hours}
        countPodgroups={data.countPodgroups}
      />
      <Button
        className={cls.btn}
        onClick={saveDataHandler}
        title={'Сохранить'}
      />
    </Card>
  )
})
