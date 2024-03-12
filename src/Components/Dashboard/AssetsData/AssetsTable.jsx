import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const AssetsTable = ({ assets, onEdit, onDelete }) => {
  
  return (
    <div className="mt-12 overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 border-collapse">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="p-2 px-3 border border-gray-300">CPU</th>
            <th className="p-2 px-3 border border-gray-300">OS</th>
            <th className="p-2 px-3 border border-gray-300">LICENSE</th>
            <th className="p-2 px-3 border border-gray-300">UPDATE</th>
            <th className="p-2 px-3 border border-gray-300">BRAND</th>
            <th className="p-2 px-3 border border-gray-300">EXPIRY</th>
            <th className="p-2 px-3 border border-gray-300">DETAILS</th>
            <th className="p-2 px-3 border border-gray-300">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index} className="bg-gray-200 hover:bg-blue-100">
              <td className="p-2 px-3 border border-gray-300">{asset.cpu}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.os}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.license}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.update}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.brand}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.expiry}</td>
              <td className="p-2 px-3 border border-gray-300">{asset.details}</td>
              {/* Table data cells */}
              <td className="p-2 px-3 border border-gray-300">
                {/* Update button */}
                <button
                  className="text-lg px-1 text-blue-500"
                  onClick={() => onEdit(asset)}
                >
                  <RxUpdate className="hover:scale-110 transition duration-200" />
                </button>
                {/* Delete button */}
                <button
                  className="text-lg px-1 text-red-500"
                  onClick={() => onDelete(asset)}
                >
                  <MdOutlineDelete className="hover:scale-110 transition duration-200" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsTable;
