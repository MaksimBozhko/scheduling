import { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './button.module.scss';
import { Mods } from '@/common/lib/classNames/classNames';
import { classNames } from '@/common/lib/classNames';
import { Loader } from '@/ui';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean
  fullWidth?: boolean
  title: string
  isLoading?: boolean
}

export const Button: FC<IButton> = memo((props) => {
  const {
    className,
    disabled,
    fullWidth,
    title,
    isLoading,
    ...otherProps
  } = props;

  const mode: Mods = {
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  }

  return (
    <button
      type="button"
      className={classNames(cls.button, mode, [className, cls.primary])}
      disabled={disabled}
      {...otherProps}
    >
      {
        isLoading
          ? <Loader/>
          : title
      }
    </button>
  )
})
