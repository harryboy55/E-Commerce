import React from 'react';
import { Layout, Row, Col, Input, Button, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer className="bg-black text-white py-12 mt-12">
      <div className="container mx-auto px-6">
        <Row gutter={[16, 16]} justify="space-between">
          {/* Footer Left Section: Company Info */}
          <Col xs={24} sm={8} md={6}>
            <h2 className="text-3xl font-semibold mb-4">BOOKSHOP</h2>
            <p className="text-sm mb-4">Your one-stop destination for all your book needs. Explore, discover, and buy books with ease.</p>
            <div>
              <Button
                icon={<FacebookOutlined />}
                className="text-black mx-2"
                shape="circle"
                size="large"
              />
              <Button
                icon={<TwitterOutlined />}
                className="text-black mx-2"
                shape="circle"
                size="large"
              />
              <Button
                icon={<InstagramOutlined />}
                className="text-black mx-2"
                shape="circle"
                size="large"
              />
              <Button
                icon={<LinkedinOutlined />}
                className="text-black mx-2"
                shape="circle"
                size="large"
              />
            </div>
          </Col>

          {/* Footer Middle Section: Navigation Links */}
          <Col xs={24} sm={8} md={6}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400">Home</a></li>
              <li><a href="/products" className="hover:text-gray-400">Products</a></li>
              <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
              <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
            </ul>
          </Col>

          {/* Footer Right Section: Newsletter Subscription */}
          <Col xs={24} sm={8} md={6}>
            <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-sm mb-4">Get the latest updates, news, and special offers.</p>
            <Space direction="vertical" className="w-full">
              <Input
                placeholder="Enter your email"
                className="text-black rounded-lg py-3 px-4 mb-4"
              />
              <Button type="primary" className="w-full"
              color='danger'
              variant='solid'
              >
                Subscribe
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Footer Bottom Section: Copyright */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} BOOKSHOP. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
