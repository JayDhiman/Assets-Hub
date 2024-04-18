import React from "react";
import Input from "../../Input";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";

const AssetForm = ({ onSubmit, onClose, initialValues, fieldsConfig }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Destructure errors from formState
    watch,
  } = useForm({
    defaultValues: initialValues,
  });

  const watchStatus = watch("status"); // Watch the status field
const handleFormSubmit = (data) => {
  // Filter out disabled fields if status is not "In Use"
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([fieldName]) =>
        !(
          (fieldName === "empName" ||
            fieldName === "empID" ||
            fieldName === "email" ||
            fieldName === "contact" ||
            fieldName === "returnDate" ||
            fieldName === "assignedDate") &&
          watchStatus !== "In Use"
        )
    )
  );

  onSubmit(filteredData);
};


  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
          <button
            className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
            onClick={onClose}
          >
            <IoIosCloseCircle className="text-[25px]" />
          </button>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-3 gap-6">
              {fieldsConfig.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      {...register(field.name, {
                        required: field.required, // Apply required validation
                      })}
                      className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select...</option> {/* Add an empty option */}
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      placeholder={field.placeholder}
                      type={field.type}
                      {...register(field.name, {
                        required: field.required, // Apply required validation
                      })}
                      disabled={
                        (field.name === "empName" ||
                          field.name === "empID" ||
                          field.name === "email" ||
                          field.name === "contact" ||
                          field.name === "returnDate" ||
                          field.name === "assignedDate") &&
                        watchStatus !== "In Use"
                      }
                      className={`${
                        (field.name === "empName" ||
                          field.name === "empID" ||
                          field.name === "email" ||
                          field.name === "contact" ||
                          field.name === "returnDate" ||
                          field.name === "assignedDate") &&
                        watchStatus !== "In Use"
                          ? "border border-red-500 focus:border-red-500 hover:border-red-600 opacity-30"
                          : "border focus:border-blue-500 hover:border-blue-600"
                      } w-full px-4 py-2 mt-1 bg-white rounded-md focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    />
                  )}
                  {errors[field.name] && ( // Display validation error message
                    <span className="text-red-500">
                      {field.required ? `${field.label} is required` : ""}
                    </span>
                  )}
                </div>
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
    </>
  );
};

export default AssetForm;
