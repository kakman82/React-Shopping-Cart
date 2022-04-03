import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { CartState } from '../context/Context';

const Header = () => {
  const {
    state: { cart },
    filterDispatch,
  } = CartState();
  return (
    <div className='h-[80px] bg-gray-800 p-5 items-center flex justify-between'>
      {/* Left -  Title */}
      <Link to='/'>
        <p className='font-extrabold text-3xl ml-10 text-teal-300 cursor-pointer'>
          Shopflix
        </p>
      </Link>
      {/* Center - Search Bar - for mobile hidden */}
      <div className='hidden sm:flex'>
        <input
          className=' sm:w-[400px] rounded border-2 p-1 hover:border-teal-400'
          placeholder='Search a product...'
          onChange={(e) =>
            filterDispatch({
              type: 'FILTER_BY_SEARCH',
              payload: e.target.value.toLowerCase(),
            })
          }
        />
      </div>
      {/* Right - Go to Cart Button with BAdge and Dropdown */}
      <Link to='/cart'>
        <div className='flex mr-11'>
          <MdOutlineShoppingCart className='w-10 h-10 text-teal-300' />
          {cart.length > 0 && (
            <div className='text-red-500 rounded-full px-1.5 bg-slate-200 font-semibold absolute top-2 right-1.5 mr-9'>
              {cart.length}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Header;
