import React from 'react';

type CategoriesProps = {
  value: number;
  setValue: (index: number) => void;
};

const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = ({ value, setValue }) => {
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
