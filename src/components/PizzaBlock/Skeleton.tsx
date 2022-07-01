import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={300}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='132' cy='139' r='125' />
    <rect x='0' y='284' rx='13' ry='13' width='280' height='20' />
    <rect x='0' y='321' rx='15' ry='15' width='280' height='88' />
    <rect x='0' y='429' rx='10' ry='10' width='100' height='30' />
    <rect x='123' y='420' rx='21' ry='21' width='152' height='45' />
  </ContentLoader>
);

export default Skeleton;
