import React from "react";
import Input from "../../Input";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";



const EmpForm = () => {
  return (
    <>
     <div className="container mx-auto w-full p-2 ">

    {/* search options */}
      <div className="flex items-center flex-wrap gap-4 w-full">
        {/* search input */}
        <div className=" mx-2 max-md:w-full flex-1">
          <Input placeholder={"Search here"} />
        </div>

        

       
        <div className="inline-block relative">
          <select className="block appearance-none bg-stone-800 border border-stone-800 text-white py-3 px-2 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-stone-900 focus:border-stone-900 "
            id="dog-names"
            name="dog-names"
          >
          

            <option  value="Designation">Designation</option>
            <option value="Brand">Brand</option>
            <option value="Title">Title</option>
            <option value="CPU">CPU</option>
       
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <IoIosArrowDown/>
          </div>
        </div>


        <div className="">
          <button className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950">
            Search
          </button>
        </div>


        <div className="">
          <button className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex">
           <span className="text-2xl px-1"><IoAddOutline/></span>
           <span className="max-sm:hidden">ADD</span> 
          </button>
        </div>


      </div>



      </div>
    </>
  );
};

export default EmpForm;