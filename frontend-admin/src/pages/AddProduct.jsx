import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, Input, InputNumber, Button } from 'antd';

const AddProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // To store the selected image
  const [fileName, setFileName] = useState(''); // To display the name of the selected file

  // Handle form submission
  const onFinish = async (values) => {
    if (!file) {
      toast.error('Please upload an image!');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('category', values.category); // Append category to form data
    formData.append('image', file); // Append the file to form data

    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      if (response.status === 201) {
        toast.success('Product added successfully');
        navigate('/products');
      }
    } catch (error) {
      toast.error('Error adding product');
      console.error(error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file
      setFileName(selectedFile.name); // Display the file name
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Product</h2>
      <Form
        name="add-product"
        onFinish={onFinish}
        initialValues={{
          price: 0,
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input className="border border-gray-300 p-2 rounded-md" />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Please input the product description!' }]}
        >
          <Input.TextArea rows={4} className="border border-gray-300 p-2 rounded-md" />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} className="border border-gray-300 p-2 rounded-md" />
        </Form.Item>

        {/* New Category Input */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input the product category!' }]}
        >
          <Input className="border border-gray-300 p-2 rounded-md" />
        </Form.Item>

        {/* Image upload using a standard file input */}
        <Form.Item
          label="Product Image"
          name="image"
          rules={[{ required: true, message: 'Please upload the product image!' }]}
        >
          <div className="flex flex-col items-start">
            <input
              type="file"
              accept="image/*" // Allow only image files
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-md"
            />
            {/* Display the selected file name */}
            {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-green-500 hover:bg-green-700 text-white rounded-md">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
