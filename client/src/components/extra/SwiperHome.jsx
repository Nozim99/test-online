import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {useNavigate} from "react-router-dom";

const SwiperHome = () => {
  const navigate = useNavigate();

  const telegramGroup = () => {
    window.open("https://t.me/mezesTest", "_blank");
  }

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mx-5 md:mx-auto md:w-100 h-32 xs:h-52 border border-neutral-300 rounded-md mt-10 dark:border-blue-400 transition dark:shadow-lg dark:shadow-blue-400/50 dark:hover:border-blue-500 dark:hover:shadow-blue-500/50 dark:border-2"
      >
        <SwiperSlide onClick={()=>navigate("/search")} className="relative cursor-pointer">
          <img className="object-cover w-full h-full" src="pexels-andy-barbour-6683394.jpg" alt="Testni Boshlash"/>
          <h3 className="SwiperSlideTitle">Testni Boshlash</h3>
        </SwiperSlide>
        <SwiperSlide onClick={()=>navigate("/create/test")} className="relative cursor-pointer">
          <img className="object-cover w-full h-full" src="pexels-sora-shimazaki-5668869 (1).jpg" alt="Testni Boshlash"/>
          <h3 className="SwiperSlideTitle">Test Yaratish</h3>
        </SwiperSlide>
        <SwiperSlide onClick={telegramGroup} className="relative cursor-pointer">
          <img className="object-cover w-full h-full" src="Telegram-logo-Featured-1024x538.jpg" alt="Testni Boshlash"/>
          <h3 className="SwiperSlideTitle">Telegram guruh</h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperHome;