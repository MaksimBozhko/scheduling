import React, { FC, InputHTMLAttributes, memo, useCallback, } from 'react';
import cls from './textarea.module.scss'
import { classNames } from '@/common/lib/classNames';

type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'readOnly'>

interface ITextArea extends HTMLTextAreaProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Textarea: FC<ITextArea> = memo((props) => {
  const {
    className,
    value,
    onChange,
    readonly,
    ...otherProps
  } = props


  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }, [onChange])

  return (
    <div className={classNames(cls.textareaWrapper, {}, [className])}>
      <textarea
        value={value}
        onChange={onChangeHandler}
        className={cls.textarea}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  )
})
