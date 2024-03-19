// DynamicForm.js
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";

const Form = ({ fieldsConfig, initialValues, onSubmit, onClose }) => {
  console.log(initialValues)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: initialValues || {}
  });

  const handleFormSubmit = async (data) => {
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
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
          onClick={onClose}
        >
          X
        </button>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Render form fields based on fieldsConfig */}
            {fieldsConfig.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                {...register(field.name, {
                  required: field.required ? "required" : false,
                })}
                disabled={!!field.disabled}
                className={`${field.disabled ? 'opacity-30 cursor-pointer border focus:border-red-400 hover:border-red-600 ' : ''}`}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {initialValues ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
