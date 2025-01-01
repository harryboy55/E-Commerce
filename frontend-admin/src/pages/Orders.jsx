// src/pages/OrderListPage.jsx
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]); // All orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for search
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fetch all orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders); // Initially set filtered orders to all orders
      } else {
        message.error('Failed to load orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  // Real-time search function
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Filter orders based on search text
    const filtered = orders.filter(
      (order) =>
        order._id.includes(value) || // Search by order ID
        order.user?.name.toLowerCase().includes(value.toLowerCase()) || // Search by customer name
        order.status.toLowerCase().includes(value.toLowerCase()) // Search by status
    );
    setFilteredOrders(filtered);
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Columns for the table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <Link to={`/orders/${text}`}>{text}</Link>,
    },
    {
      title: 'Customer Name',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user?.name || 'Unknown',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `Rs.${text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" href={`/orders/${record._id}`}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search orders..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredOrders} // Use filtered orders for display
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderListPage;
