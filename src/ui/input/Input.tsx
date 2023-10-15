import React, { FC, InputHTMLAttributes, memo, useRef, } from 'react';
import cls from './Input.module.scss'
import { classNames } from '@/common/lib/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface IInput extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Input: FC<IInput> = memo((props) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    readonly,
    ...otherProps
  } = props

  const ref = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      <input
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        type={type}
        className={cls.input}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  )
})
