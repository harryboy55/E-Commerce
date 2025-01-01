import React from 'react';
import { Carousel } from 'antd';
import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.webp';

const Banner = () => {
  const bannerImages = [
    {
      url: banner1,
      title: 'Discover Amazing Books',
      subtitle: 'Dive into the world of imagination and knowledge.',
    },
    {
      url: banner2,
      title: 'Find Your Next Adventure',
      subtitle: 'Explore our curated collection of bestsellers.',
    },
    {
      url: banner3,
      title: 'Stories That Inspire',
      subtitle: 'Books that touch your soul and inspire greatness.',
    },
  ];

  return (
    <div className="banner w-full">
      <Carousel autoplay>
        {bannerImages.map((item, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-[600px] object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h2>
              <p className="text-lg md:text-xl">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
