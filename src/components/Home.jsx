import { CartState } from '../context/Context';
import Filters from './Filters';
import Product from './Product';

const Home = () => {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };

  return (
    <div className='w-full mt-3 flex flex-col sm:flex-row'>
      {/* Sidebar -  Filters Section */}
      <div className='flex-2 bg-slate-600 sm:h-[70vh] sm:w-[20%] mt-3'>
        <Filters />
      </div>
      {/* Products - List of cards */}
      <div className='w-[97%] sm:flex sm:flex-wrap flex-1  m-3'>
        {transformProducts().map((prod) => {
          return <Product product={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
