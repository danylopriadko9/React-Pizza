import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62b46568a36f3a973d3314f5.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        console.error(error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vel saepe
        quaerat illum placeat cum amet! Iusto accusamus non minus ullam
        blanditiis. Quos error debitis deserunt facilis quidem ipsam deleniti?
      </p>
      <h2>{pizza.price} ₽</h2>
    </>
  );
};

export default FullPizza;
