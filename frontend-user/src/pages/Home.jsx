import React from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <>
      <Banner />
      <div className="container mx-auto p-6">
        <div className='text-center'>
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 tracking-wide transform transition-all duration-300 hover:scale-105 shadow-lg p-4 mt-10">
            Featured Products
          </h2>
        </div>
        
        <ProductsGrid role="feature" />
        
        <div className='text-center'>
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 tracking-wide transform transition-all duration-300 hover:scale-105 shadow-lg p-4 mt-10">
            Trending Products
          </h2>
        </div>
        
        <ProductsGrid role="trend" />
      </div>
    </>
  );
};

export default Home;
