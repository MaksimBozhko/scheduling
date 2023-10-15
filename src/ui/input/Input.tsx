import { ChangeEvent, FC, InputHTMLAttributes, memo, } from 'react';
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      <input
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
