import { CartState } from '../context/Context';
import Rating from './Rating';

const Product = ({ product }) => {
  const { id, name, price, image, inStock, fastDelivery, ratings } = product;

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const checkDisable = (val) => {
    if (val === 0) return 'cursor-not-allowed opacity-25 text-red-500';
  };

  return (
    <div className='flex flex-col items-start justify-center border-2 rounded border-slate-600 p-2 sm:w-[30%] sm:h-[70vh] mb-3 sm:ml-3'>
      <img src={image} alt='product_picture' width={640} height={480} />
      <p className='my-2 font-bold text-xl'>{name}</p>

      <p className='font-bold text-teal-600'>€ {price.split('.')[0]}</p>
      <p>{fastDelivery ? 'Fast Delivery' : '3 Workdays Delivery'}</p>
      <div className='flex text-yellow-400'>
        <Rating rating={ratings} style={{ cursor: 'none' }} />
      </div>
      {cart.some((prod) => prod.id === id) ? (
        <button
          onClick={() =>
            dispatch({
              type: 'REMOVE_FROM_CART',
              payload: product,
            })
          }
          className='w-full rounded-lg bg-red-500 px-2 py-1 text-center my-3 text-white font-bold'>
          Remove From Cart
        </button>
      ) : (
        <button
          onClick={() =>
            dispatch({
              type: 'ADD_TO_CART',
              payload: product,
            })
          }
          className={`w-full rounded-lg border bg-teal-300 px-2 py-1 text-center my-3  text-slate-500 font-bold ${checkDisable(
            inStock
          )} `}>
          {inStock === 0 ? 'Out of Stock!' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
};

export default Product;
