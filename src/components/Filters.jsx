import Rating from './Rating';
import { CartState } from '../context/Context.js';

const Filters = () => {
  const {
    filterState: { byStock, byFastDelivery, byRating, sort },
    filterDispatch,
  } = CartState();

  //console.log(byStock, byFastDelivery, byRating, sort);

  return (
    <div className='p-3 space-y-3 font-light'>
      <div className='space-x-2 '>
        <input
          type='radio'
          name='sort_asc'
          onChange={() =>
            filterDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'lowToHigh',
            })
          }
          checked={sort === 'lowToHigh' ? true : false}
        />
        <label className='text-white' htmlFor='sort_asc'>
          Ascending
        </label>
      </div>
      <div className='space-x-2 '>
        <input
          type='radio'
          name='sort_desc'
          onChange={() =>
            filterDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'highToLow',
            })
          }
          checked={sort === 'highToLow' ? true : false}
        />
        <label className='text-white' htmlFor='sort_desc'>
          Descending
        </label>
      </div>
      <div className='space-x-2 '>
        <input
          type='checkbox'
          name='stock'
          onChange={() =>
            filterDispatch({
              type: 'FILTER_BY_STOCK',
            })
          }
          checked={byStock}
        />
        <label className='text-white' htmlFor='stock'>
          Include Out of Stock
        </label>
      </div>
      <div className='space-x-2'>
        <input
          type='checkbox'
          name='fast'
          onChange={() =>
            filterDispatch({
              type: 'FILTER_BY_DELIVERY',
            })
          }
          checked={byFastDelivery}
        />
        <label className='text-white' htmlFor='fast'>
          Fast Delivery Only
        </label>
      </div>
      <div className='flex space-x-2 items-center text-yellow-300'>
        <label className='text-white' htmlFor='fast'>
          Rating:
        </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            filterDispatch({
              type: 'FILTER_BY_RATING',
              payload: i + 1,
            })
          }
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div>
        <button
          className='bg-slate-200 text-center rounded-lg p-1 w-full'
          onClick={() =>
            filterDispatch({
              type: 'CLEAR_FILTERS',
            })
          }>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
