import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../Input";


const AssetsForm = ({ intialvalue, onSubmit, onClose }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: intialvalue || {}, // Use defaultValues to pre-fill the form fields
  });

  const handleAssetForm = async (data) => {
    try {
      await trigger();
      if (Object.keys(errors).length === 0) {
        onSubmit(data);
        reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
      <div className=" bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="text-center font-primary font-semibold text-xl my-2">
          {intialvalue ? "UPDATE ASSETS" : "ADD ASSETS"}
        </h1>
        <form onSubmit={handleSubmit(handleAssetForm)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Input
              label="EMP_ID"
              placeholder="emp_id"
              type="text"
              {...register("emp_id",
              {
                required: true,
              }
              )}
              disabled ={!!intialvalue}
              className = {`${intialvalue ? 'opacity-30 cursor-pointer border focus:border-red-400 hover:border-red-600 ':''}`}
              />
            <Input
              label="EMP_NAME"
              placeholder="employee name"
              type="text"
              {...register("emp_Name", {
                required: true,
              })}
              />
              
              
              


           
            <Input
              label="PROCESSOR:"
              placeholder="Enter PROCESSOR"
              type="text"
              {...register("processor", {
                required: "required",
              })}
            />
            {errors.processor?.type === "required" && (
              <p className="text-red-500">{errors.processor.message}</p>
            )}
            <Input
              label="OS:"
              placeholder="Enter OS"
              type="text"
              {...register("os", {
                required: "required",
              })}
            />
            {errors.os?.type === "required" && (
              <p className="text-red-500">{errors.os.message}</p>
            )}
            <Input
              label="LICENSE:"
              placeholder="Enter License"
              type="text"
              {...register("license", {
                required: "required",
              })}
            />
            {errors.license?.type === "required" && (
              <p className="text-red-500">{errors.license.message}</p>
            )}
            <Input
              label="UPDATE:"
              placeholder="Enter Update"
              type="text"
              {...register("update", {
                required: "required",
              })}
            />
            {errors.update?.type === "required" && (
              <p className="text-red-500">{errors.update.message}</p>
            )}
            <Input
              label="BRAND:"
              placeholder="Enter Brand"
              type="text"
              {...register("brand", {
                required: "required",
              })}
            />
            {errors.brand?.type === "required" && (
              <p className="text-red-500">{errors.brand.message}</p>
            )}
            <Input
              label="EXPIRY:"
              placeholder="Enter Expiry"
              type="text"
              {...register("expiry", {
                required: "required",
              })}
            />
            {errors.expiry?.type === "required" && (
              <p className="text-red-500">{errors.expiry.message}</p>
            )}
            
            {errors.software?.type === "required" && (
              <p className="text-red-500">{errors.software.message}</p>
            )}
          </div>
          <div className="text-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {intialvalue ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};





export default AssetsForm;
