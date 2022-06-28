import debounce from 'lodash.debounce';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SearchContext } from '../../App';
import style from './input.module.scss';

const Index = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    []
  );

  const onChangeInput = (event) => {
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
