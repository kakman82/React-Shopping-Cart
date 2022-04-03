import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <p
          className='cursor-pointer'
          key={i}
          onClick={() => onClick(i)}
          style={style}>
          {rating > i ? <AiFillStar /> : <AiOutlineStar />}
        </p>
      ))}
    </>
  );
};

export default Rating;
