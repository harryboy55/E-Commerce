import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  // Open edit modal
  const handleEdit = (product) => {
    setCurrentProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category, // Set category field
    });
    setIsModalVisible(true);
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success('Product deleted successfully');
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  // Handle modal form submission (update product)
  const handleUpdate = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, values);
      toast.success('Product updated successfully');
      setIsModalVisible(false);
      // Update products list
      setProducts(products.map(product =>
        product._id === currentProduct._id ? { ...product, ...values } : product
      ));
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category', // New column for category
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <Table columns={columns} dataSource={products} rowKey="_id" />

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={{
            name: currentProduct?.name,
            description: currentProduct?.description,
            price: currentProduct?.price,
            category: currentProduct?.category, // Include category in the modal
          }}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          {/* Category Input in the Edit Modal */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input the product category!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
