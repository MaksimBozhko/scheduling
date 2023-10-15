import { FC, HTMLAttributes, memo, ReactNode } from 'react'
import cls from './card.module.scss'
import { classNames } from '@/common/lib/classNames';


interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  max?: boolean;
}

export const Card: FC<ICardProps> = memo((props) => {
  const {
    className,
    children,
    max,
    ...otherProps
  } = props

  return (
    <div
      {...otherProps}
      className={classNames(cls.card, { [cls.max]: max }, [className])}
    >
      {children}
    </div>
  )
})
