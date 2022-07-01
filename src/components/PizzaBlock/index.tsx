import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, cartItemByTitleSelector } from '../../redux/slices/cartSlice';

type PizzaBlockProps = {
  id: number;
  title: string;
  count: number;
  imageUrl: string;
  price: number;
  types: number[];
  sizes: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
  id,
}) => {
  const [size, setSize] = useState(0);
  const [type, setType] = useState(0);
  const dispatch = useDispatch();

  const typeNames = ['тонкое', 'традиционное'];
  const sizeValues = ['26 cм.', '30 cм.', '40 cм.'];

  const pizzaQty = useSelector(cartItemByTitleSelector(title));

  const onClickAdd = () => {
    const item = {
      id: Date.now(),
      title,
      price,
      imageUrl,
      type: typeNames[type],
      size: sizeValues[size],
    };

    dispatch(addItem(item));
  };

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link to={`/pizza/${id}`}>
          <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        </Link>

        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((value, index) => (
              <li
                onClick={() => setType(index)}
                className={type === index ? 'active' : ''}
                key={index}
              >
                {typeNames[value]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((value, index) => (
              <li
                onClick={() => setSize(index)}
                className={size === index ? 'active' : ''}
                key={index}
              >
                {value} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <div
            className='button button--outline button--add'
            onClick={onClickAdd}
          >
            <span>Добавить</span>
            {pizzaQty > 0 && <i>{pizzaQty}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
