import cls from './groupInfo.module.scss'
import { FC, memo, useMemo } from 'react'
import { classNames } from '@/common/lib/classNames';
import { IGroupInfo } from '@/store/types/types';

interface IGroup {
  className?: string
  groupInfo: IGroupInfo
}

export const GroupInfo: FC<IGroup> = memo((props) => {
  const { className, groupInfo } = props

  const info = useMemo(() => ([
    {
      name: 'Группа',
      value: groupInfo.groupName
    },
    {
      name: 'Курс',
      value: groupInfo.course
    },
    {
      name: 'Количество курсантов',
      value: groupInfo.studentsNumber
    },
    {
      name: 'Семестр',
      value: groupInfo.semestr
    },
  ]), [groupInfo])

  return (
    <div className={classNames(cls.groupInfo, {}, [className])}>
      {info.map((item) => {
        return (
          <div className={cls.item} key={item.name}>
            <span className={cls.name}>
              {item.name}
            </span>
            <span className={cls.value}>
              {item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
})
