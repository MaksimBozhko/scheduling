import cls from './dashbord.module.scss'
import { FC, memo } from 'react'
import { classNames } from '@/common/lib/classNames';
import { GroupInfo, Header, Table } from '@/components';
import { Card } from '@/ui';
import { IGroupsInfo } from '@/store/types/types';

interface IDashbord {
  className?: string
  data: IGroupsInfo
}

export const Dashbord: FC<IDashbord> = memo((props) => {
  const {className, data} = props

  return (
    <Card className={classNames(cls.dashbord, {}, [className])} max>
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
    </Card>
  )
})
