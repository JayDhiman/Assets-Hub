import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { IoIosCloseCircle } from "react-icons/io";

const Form = ({ fieldsConfig, initialValues, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: initialValues || {},
  });

  const handleFormSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      onSubmit(data);
      reset();
    }
  };

  // Check if all fields are filled
  const isAllFieldsFilled = Object.keys(dirtyFields).length === fieldsConfig.length;

  return (
    <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
          onClick={onClose}
        >
          <IoIosCloseCircle className="text-[25px]" />
        </button>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Render form fields based on fieldsConfig */}
            {fieldsConfig.map((field) => (
              <div key={field.name}>
                <Input
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type} // Set the type dynamically here
                  {...register(field.name, {
                    required: field.required ? field.required : false,
                  })}
                  disabled={!!field.disabled}
                  className={`${
                    field.disabled
                      ? "opacity-30 cursor-pointer border focus:border-red-400 hover:border-red-600"
                      : ""
                  }`}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm block">{errors[field.name].message}</span>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              className={`${
                !isAllFieldsFilled || Object.keys(errors).length > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded`}
              disabled={!isAllFieldsFilled || Object.keys(errors).length > 0} // Disable the button if not all fields are filled or there are errors
            >
              {initialValues ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
