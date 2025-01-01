// src/pages/OrderDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { message, Button, Descriptions, Card, Select } from 'antd';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        console.log('Fetched order:', data.order); // Debug log to check the fetched order
        setOrder(data.order);
        setStatus(data.order.status); // Set the initial status
      } else {
        message.error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      message.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!status) {
      message.error('Please select a status');
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch(`http://localhost:5000/api/orders/update-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.message) {
        message.success('Order status updated successfully');
        setOrder(data.order); // Update the order data after successful status update
      } else {
        message.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div  className="container mx-auto p-6">
      <Card title={`Order ID: ${order._id}`} style={{ marginBottom: 16 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Customer Name">{order.user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.user.email}</Descriptions.Item>
          <Descriptions.Item label="Total Amount">Rs.{order.totalAmount}</Descriptions.Item>
          <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Ordered Items" style={{ marginBottom: 16 }}>
        {/* Render the ordered items */}
        <ul>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <li key={index}>
                {/* Check if item.product exists */}
                {item.product ? (
                  <>
                    <strong>{item.product.name}</strong> (x{item.quantity}) - Rs.{item.product.price}
                  </>
                ) : (
                  <span>Product details not available</span>
                )}
              </li>
            ))
          ) : (
            <li>No items in this order</li>
          )}
        </ul>
      </Card>

      <Card title="Update Order Status" style={{ marginBottom: 16 }}>
        <Select
          value={status}
          onChange={setStatus}
          style={{ width: 200, marginRight: 10 }}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="pending">In Process</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
        <Button
          type="primary"
          onClick={handleStatusChange}
          loading={updating}
          disabled={updating}
        >
          Update Status
        </Button>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
