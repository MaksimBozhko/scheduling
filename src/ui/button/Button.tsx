import { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './button.module.scss';
import { Mods } from '@/common/lib/classNames/classNames';
import { classNames } from '@/common/lib/classNames';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean
}

export const Button: FC<IButton> = memo((props) => {
  const {
    className,
    disabled,
    children,
    ...otherProps
  } = props;

  const mode: Mods = {
    [cls.disabled]: disabled,
  }

  return (
    <button
      type="button"
      className={classNames(cls.button, mode, [className, cls.primary])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
