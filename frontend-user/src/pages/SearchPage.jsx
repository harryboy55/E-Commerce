// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { message, Spin, Row, Col, Typography } from 'antd';
import ProductCard from '../components/ProductCard'; // Adjust the path if needed

const { Title } = Typography;

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const searchQuery = query.get('q');
  const category = query.get('category');

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetch(`http://localhost:5000/api/products/search?q=${searchQuery}&category=${category || ''}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProducts(data.products);
          } else {
            message.error('Error fetching search results');
          }
        })
        .catch((error) => {
          console.error(error);
          message.error('Error fetching search results');
        })
        .finally(() => setLoading(false));
    }
  }, [searchQuery, category]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">Search Results</Title>

      {products.length > 0 ? (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-gray-500">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
