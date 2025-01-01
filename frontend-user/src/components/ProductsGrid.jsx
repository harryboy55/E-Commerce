import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductGrid = ({ role }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');

        if (Array.isArray(response.data)) {
          if (role === 'trend') {
            setProducts(response.data.slice(0, 6)); 
          } else if (role === 'feature') {
            setProducts(response.data.slice(6, 50)); 
          }
        } else {
          console.error('API response is not an array:', response.data);
        }

        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [role]); 

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center mt-8" />;
  }

  if (products.length === 0) {
    return <div className="text-center mt-8">No products available.</div>;
  }

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
