import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Button, Card } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist data
  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        window.location.href = '/login'; // Redirect to login if no user
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/wishlist/${user._id}`);

      if (response.status === 200) {
        setWishlist(response.data); // Update wishlist state
      } else {
        console.error('Error fetching wishlist:', response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist(); // Load wishlist when the component is mounted
  }, []);

  // Handle remove from wishlist
  const handleDeleteFromWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (!userId) {
        message.error('User not logged in');
        return;
      }

      // Remove the product from the wishlist
      const response = await axios.delete('http://localhost:5000/api/wishlist/remove', {
        data: { userId, productId },
      });

      if (response.status === 200) {
        // Update the wishlist state to reflect the removal
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.productId._id !== productId)
        );
        message.success('Item removed from wishlist');
      } else {
        message.error('Failed to remove item');
      }
    } catch (error) {
      message.error('Failed to remove item');
      console.error(error);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        message.error('User not logged in');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/cart/add', {
        productId,
        quantity: 1,
        userId: user._id,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-black">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card
              key={item._id}
              className="border border-gray-300 p-4 rounded-lg"
              hoverable
              cover={
                <img
                  alt={item.productId.name}
                  src={`http://localhost:5000/${item.productId.image.replace(/\\/g, '/')}`}
                  className="h-64 w-full object-cover rounded-t-lg py-2 px-12"
                />
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600">{item.productId.description}</p>
                </div>
                <div className="text-lg font-semibold">${item.productId.price}</div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button
            icon={<ShoppingCartOutlined />}
            shape="round"
            className="text-black border-black hover:bg-black hover:text-white"
            onClick={() => handleAddToCart(item.productId._id)}
          >
            Add to Cart
          </Button>
                <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteFromWishlist(item.productId._id)}
            >
              Remove
            </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
