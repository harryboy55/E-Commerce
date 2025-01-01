import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animation
import { Button } from 'antd'; // You can use Ant Design's Button component

const ConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally redirect the user after a certain amount of time
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000); // Redirect to the home page after 5 seconds

    return () => clearTimeout(timeout); // Cleanup timeout if the component unmounts
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-teal-500 to-blue-700 text-white"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center p-10 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-blur-lg">
        <motion.h1
          className="text-5xl font-bold mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Your transaction has been completed successfully. Thank you for your purchase.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/')}
            className="bg-green-500 text-white"
          >
            Go to Home
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConfirmationPage;
