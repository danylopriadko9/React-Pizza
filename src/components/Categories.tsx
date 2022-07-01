import React from 'react';

type CategoriesProps = {
  value: number;
  setValue: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, setValue }) => {
  const categories: string[] = [
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
