import cls from './table.module.scss'
import { FC, memo } from 'react'
import { classNames } from '@/common/lib/classNames';
import { IHours, IPodgroup } from '@/store/types/types';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

interface ITable {
  className?: string
  groupId: string
  hours: IHours
  exam: boolean
  offset: boolean
  podgroups: IPodgroup[]
  countPodgroups: string
}

export const Table: FC<ITable> = memo((props) => {
  const {
    className,
    groupId,
    hours,
    exam,
    offset,
    podgroups,
    countPodgroups
  } = props


  return (
    <table className={classNames(cls.table, {}, [className])}>
      <thead>
      <TableHead
        groupId={groupId}
        countPodgroups={countPodgroups}
      />
      </thead>
      <tbody>
      <TableBody
        hours={hours}
        exam={exam}
        offset={offset}
        podgroups={podgroups}
        groupId={groupId}
        countPodgroups={countPodgroups}
      />
      </tbody>
    </table>
  );
})
