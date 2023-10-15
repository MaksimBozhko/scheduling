import cls from './header.module.scss'
import { FC, memo } from 'react'
import Logo from '@/assets/book.svg?react';
import { classNames } from '@/common/lib/classNames';

interface IHeader {
  className?: string
  subjectName?: string
}

export const Header: FC<IHeader> = memo((props) => {
  const { className, subjectName } = props

  return (
    <div className={classNames(cls.header, {}, [className])}>
      <Logo width={30}/>
      {subjectName}
    </div>
  )
})
