import { useState, useEffect } from 'react';
import advance from '../../../assets/Image/Facilites/Advance Equiment.png';
import pharmacy from '../../../assets/Image/Facilites/Pharmacy.png';
import accessibility from '../../../assets/Image/Facilites/Accessibility.png';
import room from '../../../assets/Image/Facilites/Waiting Room.png';

const Facilities = () => {
  const images = [
    {
      id: 1,
      name: 'Advance Equipment',
      image: advance,
    },
    {
      id: 2,
      name: 'Accessibility',
      image: pharmacy,
    },
    {
      id: 3,
      name: 'Pharmacy',
      image: accessibility,
    },
    {
      id: 4,
      name: 'Waiting Room',
      image: room,
    },
  ];

  // Create extended array for infinite loop effect
  const extendedImages = [...images, ...images, ...images];
  const [activeIndex, setActiveIndex] = useState(images.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset to the middle set when reaching the end, without transition
    if (activeIndex >= images.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(images.length);
      }, 700);
    } else if (activeIndex < images.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(images.length * 2 - 1);
      }, 700);
    }
  }, [activeIndex, images.length]);

  const cardWidth = 280; // 256px image + 24px margin

  return (
    <section className="max-w-6xl mx-auto my-12 px-6 md:px-10 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Facilities
      </h2>

      <div className="relative w-full overflow-hidden py-10">
        <div
          className={`flex ${
            isTransitioning
              ? 'transition-transform duration-700 ease-in-out'
              : ''
          }`}
          style={{
            transform: `translateX(calc(50% - ${activeIndex * cardWidth}px - ${
              cardWidth / 2
            }px))`,
          }}
        >
          {extendedImages.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className={`flex-shrink-0 mx-3 transition-all duration-500 ${
                i === activeIndex
                  ? 'scale-110 opacity-100'
                  : 'scale-90 opacity-60'
              }`}
              style={{ width: '256px' }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <p className="text-center mt-3 font-medium text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
