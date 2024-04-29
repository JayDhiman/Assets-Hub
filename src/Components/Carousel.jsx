import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdDevices } from "react-icons/md";
// import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";



const Carousel = () => {
  // I have  added the responsive array in settings Objects for the smaller screens.

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
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
      <div className="w-auto overflow-auto bg-gradient-to-t from-stone-700 to-stone-900 rounded-tr-[55px] rounded-tl-lg rounded-br-lg rounded-bl-[55px] ">
       
          <div className="">
            <h2 className="text-gray-100 font-bold text-2xl text-center max-md:text-sm pt-4">
            Intractive Dashboard
            </h2>
          </div>
     
        {/* I have added the container class in the slider component */}
        <div className="container mx-auto  pb-4 text-center pt-3  ">
          <Slider
            {...settings}
            className="flex flex-wrap gap-3 items-center justify-between  w-full p-2 max-md:justify-evenly max-md:gap-2 max-md:scale-90  "
          >
            {/* card-1 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200 ">
              
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mt-2 text-orange-500">
                <FaRegUser/>
                </div>

              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit text-center mx-auto max-md:text-sm ">
                  Employee Manegment
                </div>
              </div>
            </div>

            {/* card-2 */}

            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200 ">
              
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mt-2 text-orange-500">
                <MdDevices/>
                </div>

              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit text-center mx-auto max-md:text-sm ">
                  Asset Manegment
                </div>
              </div>
            </div>

    {/* card-3 */}
    {/* <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200 ">
              
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mt-2 text-orange-500">
                <MdOutlineDashboardCustomize/>
                </div>

              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit text-center mx-auto max-md:text-sm ">
                  Dashboard
                </div>
              </div>
            </div> */}
                {/* card-4 */}
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200  hover:-translate-y-2 mt-3 hover:duration-200">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mt-2 text-orange-500">
                <MdCategory/>
                </div>
              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Different Asset Catgeories
                </div>
              </div>
            </div>

                {/* card-5
            <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card5}
                alt="Sunset in the mountains"
              />
              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Asset Bookings
                </div>
              </div>
            </div>

            {/* card-6 */}
            {/* <div className="w-3/4 rounded-xl overflow-auto shadow-lg bg-slate-200 hover:-translate-y-2 mt-3 hover:duration-200">
              <img
                className="w-fit mx-auto my-2 py-1"
                src={card6}
                alt="Sunset in the mountains"
              />
              <div className="px-2 py-4">
                <div className="font-semi-bold text-xl mb-2 w-fit mx-auto max-md:text-sm ">
                  Print your own tags
                </div>
              </div>
            </div>  */}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousel;

