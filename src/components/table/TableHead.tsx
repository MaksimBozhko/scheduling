import cls from './table.module.scss'
import { classNames } from '@/common/lib/classNames';
import { FC, useCallback } from 'react';
import AddIcon from '@/assets/add.svg?react';
import RemoveIcon from '@/assets/remove.svg?react';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { actions } from '@/store/acitons/actions';

interface ITableHead {
  className?: string
  groupId: string
  countPodgroups: string
}

export const TableHead: FC<ITableHead> = (props) => {
  const {
    groupId,
    countPodgroups
  } = props

  const dispatch = useAppDispatch()

  const clickAddPodgroupHandler = useCallback(() => {
    dispatch(actions.addPodgroup(groupId))
  }, [dispatch, groupId])

  const clickRemovePodgroupHandler = useCallback(() => {
    dispatch(actions.removePodgroup(groupId))
  }, [dispatch, groupId])

  return (
    <tr className={cls.header}>
      <th scope="col" className={classNames(cls.cell, {}, [cls.cellTitle])}>Занятие</th>
      <th scope="col" className={classNames(cls.cell, {}, [cls.cellHours])}>Часы</th>
      {
        countPodgroups === '2'
          ? (
            <>
              <th scope="col" className={classNames(cls.cell, {}, [cls.cellTitle])}>Подгруппа 1</th>
              <th scope="col" className={classNames(cls.cell, {}, [cls.cellTitle])}>
                <div className={cls.centerBlock}>
                  <span>Подгруппа 2</span>
                  <RemoveIcon
                    width={17}
                    onClick={clickRemovePodgroupHandler}
                    className={cls.icon}
                  />
                </div>
              </th>
            </>
          )
          : (
            <th scope="col" className={classNames(cls.cell, {}, [cls.cellTitle])}>
              <div className={cls.centerBlock}>
                <span>Преподаватель</span>
                <AddIcon
                  width={17}
                  onClick={clickAddPodgroupHandler}
                  className={cls.icon}
                />
              </div>
            </th>
          )

      }
    </tr>
  )
}
