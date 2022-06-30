import React, { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { categoryNames } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFiltres,
} from '../redux/slices/filterSlice';
import axios from 'axios';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  //const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);

  const { items, status } = useSelector(pizzaSelector);

  const sortType = sort;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const skeleton = [...new Array(6)].map((element, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((value, index) => (
    <PizzaBlock {...value} key={index} />
  ));

  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.replace('?', ''));

      const sort = categoryNames.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFiltres({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          setValue={(id) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>По данному запросу пицц не найдено!</h2>
          <p>
            При загрузке страницы произошла ошибка, либо пицц по данному запросу
            не найдено. Обновите страницу либо попробуйте немного позже
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
