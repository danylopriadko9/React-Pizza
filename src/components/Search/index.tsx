import debounce from 'lodash.debounce';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './input.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Index: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <i className='fa-solid fa-magnifying-glass'></i>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        type='text'
        placeholder='Найти пиццу...'
      />
      {value && <i onClick={onClickClear} className='fa-solid fa-xmark'></i>}
    </div>
  );
};

export default Index;
