import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // Import EmailJS

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Function to send email to the user
  
  const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    console.log(userEmail)
    const templateParams = {
      user_email: userEmail,  // The recipient email
      name: orderDetails.name, // Customer's name
      order_total: orderDetails.total, // Total amount
      order_id: orderDetails.id, // Order ID
    };
  
    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_4lmvsxd', // Your service ID
        'template_qpfpgk4', // Your template ID
        templateParams, // Template parameters with dynamic values
        'xsUldZiGsgMChXayF' // Your public key
      );
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  
  

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
  
    const cardElement = elements.getElement(CardElement);
    setIsLoading(true);
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;
  
      if (!userId) {
        message.error('User not authenticated');
        setIsLoading(false);
        return;
      }
  
      // Fetch cart data
      const cartResponse = await fetch('http://localhost:5000/api/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
  
      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart items.');
      }
  
      const cartData = await cartResponse.json();
      console.log('Cart data:', cartData); // Log to inspect the structure
  
      const items = cartData.map(cartItem => ({
        product: cartItem.product, // Assuming the product object is nested inside cartItem
        quantity: cartItem.quantity,
      }));
  
      console.log('Mapped items:', items);
  
      if (!items.length) {
        message.error('Cart is empty. Cannot proceed with payment.');
        setIsLoading(false);
        return;
      }
  
      // Create Payment Intent
      const paymentIntentResponse = await fetch('http://localhost:5000/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });
  
      const paymentIntentData = await paymentIntentResponse.json();
  
      if (paymentIntentData.clientSecret) {
        const confirmPayment = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
          payment_method: { card: cardElement, billing_details: { name: user.name || 'Customer Name' } },
        });
  
        if (confirmPayment.paymentIntent.status === 'succeeded') {
          message.success('Payment successful!');
  
          // Save order to database first
          const orderSaved = await saveOrder(userId, items, totalAmount, user);
  
          if (orderSaved) {
            // Send email confirmation to user after saving the order
            await sendOrderConfirmationEmail(user.email, orderSaved);
  
            // Clear cart after payment
            await clearCartAfterPayment(userId);
  
            // Navigate to confirmation page
            navigate('/confirmation');
          }
        } else {
          message.error('Payment failed.');
        }
      } else {
        message.error('Failed to create payment intent.');
      }
    } catch (error) {
      message.error('Error processing payment. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const clearCartAfterPayment = async (userId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error('Failed to clear the cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const saveOrder = async (userId, items, totalAmount, user) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items, totalAmount }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('Order saved successfully:', data.order);
        return {
          id: data.order._id, // Return saved order with ID
          total: totalAmount,
          date: new Date().toISOString(),
          name: user.name,
          items: items
        };
      } else {
        console.error('Failed to save order:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  };
  

  return (
    <Form onFinish={handleSubmit} autoComplete="off">
      <Form.Item label="Card Details" required>
        <div className="StripeElement">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-blue-500 text-white"
      >
        {isLoading ? 'Processing...' : `Pay Rs.${totalAmount}`}
      </Button>
    </Form>
  );
};

export default CheckoutForm;
