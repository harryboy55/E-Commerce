// ProductCard.js
import React from 'react';
import { Card, Button, message } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const imageUrl = `http://localhost:5000/${product.image.replace('\\', '/')}`;

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        message.error('User not logged in');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: 1,
        userId: user._id
      });

      if (response.status === 200) {
        message.success('Product added to cart!');
      } else {
        message.error('Failed to add product to cart');
      }
    } catch (error) {
      message.error('Error adding product to cart');
      console.error(error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        message.error('User not logged in');
        return;
      }
  
      const response = await axios.post('http://localhost:5000/api/wishlist/add', {
        productId: product._id,
        userId: user._id
      });
  
      if (response.status === 200) {
        message.success('Product added to wishlist!');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.warning('Product already in wishlist');
      } else {
        message.error('Error adding product to wishlist');
        console.error(error);
      }
    }
  };
  
  
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={imageUrl} className="h-64 w-full object-contain p-5" />}
      className="rounded-lg shadow-md max-w-lg mx-auto"
    >
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
        <p className="text-xl font-bold mt-2">Rs.{product.price}</p>

        <div className="flex flex-wrap justify-between mt-4 space-x-2">
          <Button
            icon={<HeartOutlined />}
            shape="round"
            className="mr-2 text-red-500 hover:text-white border-red-500 hover:bg-red-500"
            onClick={handleAddToWishlist}
          >
            Wishlist
          </Button>
          <Button
            icon={<ShoppingCartOutlined />}
            shape="round"
            className="text-black border-black hover:bg-black hover:text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
