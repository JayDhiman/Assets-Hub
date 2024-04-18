import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import Input from "../../Input";

const SoftwareForm = ({ onSubmit, onClose, initialValues }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "installation",
  });

  const softwareOptions = ["MS-Office", "AutoCAD", "MS-Excel", "VS-Code"];

  const handleFormSubmit = (data) => {
    onSubmit(data);
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
            {/* Software form fields */}
            <div className="grid grid-cols-4 gap-6">
              {/* Software ID */}
              <Input
                label="Software ID"
                placeholder="Enter expirationDate"
                type="text"
                {...register("software_id", { required: true })}
              />

              {/* Software */}
              <div>
                <label htmlFor="software" className="font-medium text-gray-700">Software</label>
                <select
                  id="software"
                  {...register("software", { required: true })}
                  className="w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  {softwareOptions.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Version */}
              <Input
                label="Version"
                placeholder="Enter version"
                type="text"
                {...register("version", { required: true })}
              />

              {/* Purchase Date */}
              <Input
                label="Purchase Date"
                placeholder="Enter purchase date"
                type="date"
                {...register("purchaseDate", { required: true })}
              />

              {/* Expiry */}
              <Input
                label="Expiration Date"
                placeholder="Enter expiration date"
                type="date"
                {...register("expirationDate", { required: true })}
              />

              {/* Vendor */}
              <Input
                label="Vendor"
                placeholder="Enter vendor"
                type="text"
                {...register("vendor", { required: true })}
              />

              {/* License Type */}
              <Input
                label="License Type"
                placeholder="Enter license type"
                type="text"
                {...register("licenseType", { required: true })}
              />

              {/* License Key */}
              <Input
                label="License Key"
                placeholder="Enter license key"
                type="text"
                {...register("licenseKey", { required: true })}
              />

              {/* Support Contact */}
              <Input
                label="Support Contact"
                placeholder="Enter support contact"
                type="text"
                {...register("supportContact", { required: true })}
              />

              {/* Status */}
              <Input
                label="Status"
                placeholder="Enter status"
                type="text"
                {...register("status", { required: true })}
              />
            </div>

            {/* Installation section */}
            <div className="flex gap-2 my-2 mt-3 pt-4 pb-3">
              <h3 className="text-lg font-medium mb-1">Installation</h3>
              <button
                type="button"
                onClick={() => append({})}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-0 rounded"
              >
                Add
              </button>
            </div>

            <div className="col-span-4 overflow-y-auto max-h-40">
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Input
                    label="Laptop ID"
                    placeholder="Enter laptop ID"
                    type="text"
                    {...register(`installation.${index}.laptopId`, { required: true })}
                  />
                  <Input
                    label="Installation Date"
                    placeholder="Enter installation date"
                    type="date"
                    {...register(`installation.${index}.installationDate`, { required: true })}
                  />
                  <Input
                    label="Serial Number"
                    placeholder="Enter serial number"
                    type="text"
                    {...register(`installation.${index}.serialNo`, { required: true })}
                  />
                  <Input
                    label="Employee ID"
                    placeholder="Enter employee ID"
                    type="text"
                    {...register(`installation.${index}.employeeId`, { required: true })}
                  />
                  <Input
                    label="Employee Name"
                    placeholder="Enter employee name"
                    type="text"
                    {...register(`installation.${index}.empName`, { required: true })}
                  />
                  <button
                    className="mt-7 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Submit button */}
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

export default SoftwareForm;
