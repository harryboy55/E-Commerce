import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'; // Import PhoneInput from react-phone-input-2
import 'react-phone-input-2/lib/style.css'; // Import the styles for PhoneInput

const Checkout = () => {
  const location = useLocation();
  const { totalAmount } = location.state || {}; // Get totalAmount from the location state
  const navigate = useNavigate();

  if (!totalAmount) {
    message.error('Total amount not found');
    navigate('/');
  }

  // Load Stripe using the public key from the environment variable
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6">Checkout</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Form layout="vertical" autoComplete="off">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { max: 50, message: 'Name cannot be longer than 50 characters' },
            ]}
          >
            <Input placeholder="Enter your full name" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please enter your address' },
              { max: 100, message: 'Address cannot be longer than 100 characters' },
            ]}
          >
            <Input placeholder="Enter your address" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^\d{8,14}$/, message: 'Please enter a valid phone number' }, // Adjust the regex as needed
            ]}
          >
            <PhoneInput
              country="pk"  // Default country (can be changed)
              disableCountryCode={false} // Allow country code in the dropdown
              inputStyle={{
                width: '100%',
                padding: '50px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
              dropdownStyle={{
                fontSize: '16px',
                borderRadius: '5px',
              }}
            />
          </Form.Item>

          <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={totalAmount} />
          </Elements>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
