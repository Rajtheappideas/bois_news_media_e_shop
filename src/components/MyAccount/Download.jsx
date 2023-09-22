import React from "react";
import { useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";

const Download = () => {
  const { magazines, loading } = useSelector((state) => state.root.shop);

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="border border-gray-300 w-full overflow-x-scroll scrollbar ">
          <table className="w-full overflow-x-scroll">
            <thead className="w-full border-b border-gray-300">
              <th className="md:p-4 p-2 text-left">Product</th>
              <th className="md:p-4 p-2 text-left">Purchase Date</th>
              <th className="md:p-4 p-2 text-center">Action</th>
            </thead>
            <tbody>
              {magazines.length > 0 ? (
                magazines.map((magazine) => (
                  <tr key={magazine?._id}>
                    <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap flex md:flex-row flex-col items-center justify-start gap-3">
                      <img
                        src={BaseUrl.concat(magazine?.image)}
                        alt={magazine?.title}
                        className="w-fit md:h-48 h-32 object-contain object-center"
                      />
                      <p>
                        <b>{magazine?.title}</b>
                      </p>
                    </td>
                    <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap">
                      August 23, 2023
                    </td>

                    <td className="md:p-4 p-3 font-medium text-center">
                      <a href={BaseUrl.concat(magazine?.pdf)} download>
                        <button className="uppercase gray_button">
                          download
                        </button>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Downloads here.</tr>
              )}
              <tr>
                <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap flex md:flex-row flex-col items-center justify-start gap-3">
                  <img
                    src={require("../../assests/images/Product image-2.png")}
                    alt=""
                    className="w-fit md:h-48 h-32 object-contain object-center"
                  />
                  <p>
                    <b>BOISmag n°213</b>
                  </p>
                </td>
                <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap">
                  August 23, 2023
                </td>

                <td className="md:p-4 p-3 font-medium text-center">
                  <button className="uppercase gray_button">download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Download;
