import React, { useState } from 'react';

const Categories = ({ value, setValue }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];
  return (
    <>
      <div className='categories'>
        <ul>
          {categories.map((element, index) => {
            return (
              <li
                onClick={() => setValue(index)}
                className={index == value ? 'active' : ''}
                key={index}
              >
                {element}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Categories;
