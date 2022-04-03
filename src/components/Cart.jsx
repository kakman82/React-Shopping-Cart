import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { MdDelete } from 'react-icons/md';
import Rating from './Rating';

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    setCartTotal(
      cart?.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className='w-full mt-3 flex flex-col-reverse sm:flex-row'>
      {/* Left - Cart Items */}
      <div className='sm:flex-2 sm:flex-grow'>
        {cart.length > 0 ? (
          <table className='w-[98%] shadow-lg flex justify-center sm:table border-2 border-slate-500 mb-2 sm:border-none  '>
            <thead className='hidden sm:table-header-group'>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {cart?.map((prod) => (
                <tr
                  key={prod.id}
                  className='flex flex-col space-y-1  sm:table-row mb-3'>
                  <td>
                    <div className='w-[35vw] h-[35vw] sm:w-[100px] sm:h-[100px] m-auto'>
                      <img
                        src={prod.image}
                        alt='product_pic'
                        className='object-cover'
                      />
                    </div>
                  </td>
                  <td>
                    <span className='font-semibold text-yellow-700 text-lg'>
                      {prod.name}
                    </span>
                  </td>
                  <td>
                    <div className='flex justify-center text-yellow-400'>
                      <Rating
                        rating={prod.ratings}
                        style={{ cursor: 'none' }}
                      />
                    </div>
                  </td>

                  <td>
                    <span className="before:content-['Price:__'] before:font-bold before:text-lg sm:before:content-none ">
                      € {prod.price.split('.')[0]}
                    </span>
                  </td>
                  <td>
                    <div className="before:content-['Quantity:__'] before:font-bold before:text-lg sm:before:content-none "></div>
                    <select
                      className='w-12 h-8 text-center rounded border border-teal-300'
                      onChange={(e) =>
                        dispatch({
                          type: 'CHANGE_QUANTITY',
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          },
                        })
                      }>
                      {[...Array(prod.inStock).keys()].map((val) => (
                        <option key={val + 1}>{val + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className="font-bold text-lg  before:content-['TOTAL:__'] before:font-bold before:text-xl sm:before:content-none">
                      € {Number(prod.price) * prod.qty}
                    </span>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      <MdDelete
                        className='w-6 h-6 text-red-500 text-center cursor-pointer'
                        onClick={() =>
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: prod,
                          })
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='p-5 shadow-md sm:w-[50%]  sm:h-[50%] text-left align-middle space-y-3'>
            <p className='text-3xl font-bold mb-6'>Your cart is empty!</p>
            <Link to='/'>
              <span className='underline text-blue-400 cursor-pointer'>
                Go to product page{' '}
              </span>
            </Link>
          </div>
        )}
      </div>
      {/* Right -  Checkotu Section */}
      <div className='flex-2 bg-slate-600 sm:h-[70vh] sm:w-[20%] mt-3 mb-5 text-slate-200 p-3'>
        <p className='font-extrabold text-2xl'>
          Subtotal ({cart.length}) items
        </p>
        <p className='my-4 font-bold text-xl underline'>
          Total: € {cartTotal}{' '}
        </p>
        <button className='w-full rounded-lg bg-teal-300 px-2 py-1 text-center my-3 text-slate-500 font-bold'>
          Checkout!
        </button>
      </div>
    </div>
  );
};

export default Cart;
