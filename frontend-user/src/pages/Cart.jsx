import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, InputNumber, message, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingCost] = useState(200);

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (!userId) {
        message.error('User not logged in');
        return;
      }

      const { data } = await axios.post('http://localhost:5000/api/cart/', { userId });
      setCartItems(data);
    } catch (error) {
      message.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (!userId) {
        message.error('User not logged in');
        return;
      }

      await axios.patch('http://localhost:5000/api/cart/update', {
        userId,
        productId,
        quantity,
      });

      fetchCartItems();
    } catch (error) {
      message.error('Failed to update cart item');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (!userId) {
        message.error('User not logged in');
        return;
      }

      await axios.delete('http://localhost:5000/api/cart/remove', {
        data: { userId, productId },
      });

      fetchCartItems();
      message.success('Item removed from the cart');
    } catch (error) {
      message.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    const totalAmount = totalBill;
    navigate('/checkout', { state: { totalAmount } });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const totalPrice = calculateTotal();
  const totalBill = cartItems.length > 0 ? totalPrice + shippingCost : totalPrice;

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center mt-8" />;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-black">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <Card
              key={item._id}
              className="border border-gray-300 p-4 rounded-lg"
              hoverable
              cover={
                <img
                  alt={item.product.name}
                  src={`http://localhost:5000/${item.product.image.replace(/\\/g, '/')}`}
                  className="h-64 w-full object-fit rounded-t-lg py-2 px-12"
                />
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.description}</p>
                </div>
                <div>
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.product._id, value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold">Rs.{item.product.price * item.quantity}</p>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Billing Details Section */}
      <div className="mt-8">
        <Card className="p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Subtotal:</span>
            <span className="text-lg font-semibold">Rs.{totalPrice.toFixed(2)}</span>
          </div>
          {cartItems.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Shipping Cost:</span>
              <span className="text-lg font-semibold">Rs.{shippingCost.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">Rs.{totalBill.toFixed(2)}</span>
          </div>
          <div className="text-center">
            <Button
              type="primary"
              size="large"
              onClick={handleCheckout}
              disabled={cartItems.length === 0} // Disable if cart is empty
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddToCart;

