import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { ContainerOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Title level={2} className="text-center mb-8">Admin Dashboard</Title>
      <Row gutter={[16, 16]}>
        {/* Total Products Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            className="shadow-lg"
            title="Total Products"
            extra={<ContainerOutlined className="text-blue-600 text-2xl" />}
          >
            <p className="text-4xl font-bold text-blue-600">{dashboardData.totalProducts}</p>
          </Card>
        </Col>

        {/* Total Orders Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            className="shadow-lg"
            title="Total Orders"
            extra={<ShoppingCartOutlined className="text-green-600 text-2xl" />}
          >
            <p className="text-4xl font-bold text-green-600">{dashboardData.totalOrders}</p>
          </Card>
        </Col>

        {/* Total Users Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            className="shadow-lg"
            title="Total Users"
            extra={<UserOutlined className="text-purple-600 text-2xl" />}
          >
            <p className="text-4xl font-bold text-purple-600">{dashboardData.totalUsers}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
