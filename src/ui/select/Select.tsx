import * as React from 'react';
import { FC, RefObject, useRef, useState } from 'react';
import cls from './select.module.scss'
import { classNames } from '@/common/lib/classNames';

interface ISelect {
  Icon: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>
  className?: string
  optionsList: OptionsList[];
  onChange: (id: string) => void
  value: string
  disabled?: boolean
}

export interface OptionsList {
  id: string;
  name: string;
}

export const Select: FC<ISelect> = (props) => {
  const {
    Icon,
    onChange,
    value,
    optionsList,
    className,
    disabled
  } = props

  const [openselect, setOpenSelect] = useState<boolean>(false);
  const leagueInput = useRef() as RefObject<HTMLInputElement>;

  const selectValue = (id: string) => {
    if (onChange) {
      onChange(id)
    }
    setOpenSelect(false);
  }

  const openOption = () => {
    if (!disabled) {
      setOpenSelect(prevState => !prevState);
    }
  }

  return (
    <div className={classNames(cls.select, {[cls.disabled]: disabled}, [className])}>
      <div className={classNames(cls.input, {})} onClick={openOption}>
        <input
          value={value}
          onBlur={() => {
            setOpenSelect(false);
          }}
          ref={leagueInput}
          id="league"
          type="text"
          readOnly
          disabled={disabled}
        />
        <div className={classNames(cls.prefix, {[cls.disabled]: disabled})}>
          <Icon className={classNames(cls.icon, {[cls.active]: openselect})} width={10}/>
        </div>
      </div>
      <div className={classNames(cls.options, {[cls.active]: openselect})}>
        {optionsList.map((item, index) => (
          <li
            onClick={() => selectValue(item.id)}
            key={index}
          >
            {item.name}
          </li>
        ))}
      </div>
    </div>
  );
}
