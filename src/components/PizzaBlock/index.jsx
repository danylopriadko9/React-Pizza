import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const PizzaBlock = ({ title, price, imageUrl, sizes, types, id }) => {
  const [size, setSize] = useState(0);
  const [type, setType] = useState(0);
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  console.log(cartItem);

  const addedCount = cartItem ? cartItem.count : '';

  const typeNames = ['тонкое', 'традиционное'];
  const sizeValues = ['26 cм.', '30 cм.', '40 cм.'];

  const onClickAdd = () => {
    const item = {
      //было просто id
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
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
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
            {addedCount && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
