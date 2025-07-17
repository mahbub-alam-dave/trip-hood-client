// components/ImageSlider.jsx
// components/ImageSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Import the module
import 'swiper/css';

const ImageSlider = ({ images = [], className = '' }) => {
  if (!images.length) return null;

  return (
    <div className={`w-full h-full min-h-[16rem] ${className}`}>
      <Swiper
        modules={[Autoplay]} // ✅ Add Autoplay module
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="w-full h-full">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;

