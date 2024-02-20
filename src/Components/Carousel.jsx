import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import card1 from "../assets/card1.svg";
import card2 from "../assets/card2.svg";
import card3 from "../assets/card3.svg";
import card4 from "../assets/card4.svg";
import card5 from "../assets/card5.svg";
import card6 from "../assets/card5.svg";

const Carousel = () => {
  // I have  added the responsive array in settings Objects for the smaller screens.

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-auto overflow-auto bg-sky-900 rounded-tr-[55px] rounded-tl-lg rounded-br-lg rounded-bl-[55px]">
       
          <div className="">
            <h2 className="text-gray-100 font-bold text-2xl text-center max-md:text-sm pt-4">
              Streamline your asset operations
            </h2>
          </div>
     
     {/* I have added the container class in the slider component */}
        <div className="container mx-auto  mb-10 text-center pt-3 mt-4 ">
          <Slider
            {...settings}
            className="flex flex-wrap gap-3 items-center justify-between  w-full p-2 max-md:justify-evenly max-md:gap-2 max-md:scale-90  "
          >
            {/* card-1 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200 ">
              <img
                className="w-fit mx-auto my-2 py-1 max-md:text-sm "
                src={card1}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit text-center mx-auto max-md:text-sm ">
                  Quick and Easy Tagging
                </div>
              </div>
            </div>

            {/* card-2 */}

            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card2}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-lg mb-2 w-fit mx-auto max-md:text-sm ">
                  QR Code Scanning
                </div>
              </div>
            </div>

    {/* card-3 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200  hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card3}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Location Tracking
                </div>
              </div>
            </div>
                {/* card-4 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200  hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card4}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Asset Database
                </div>
              </div>
            </div>

                {/* card-5 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card5}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Asset Bookings
                </div>
              </div>
            </div>

            {/* card-6 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card6}
                alt="Sunset in the mountains"
              />
              <div class="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Print your own tags
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousel;

