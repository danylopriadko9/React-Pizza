import debounce from 'lodash.debounce';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import style from './input.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Index = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
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
