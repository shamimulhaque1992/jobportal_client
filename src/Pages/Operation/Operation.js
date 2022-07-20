import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading/Loading";
import EditModal from "./EditModal.js/EditModal";

const Operation = () => {
  const [edit, setEdit] = useState(null);
  const {
    isLoading,
    error,
    refetch,
    data: jobs,
  } = useQuery(["repoData"], () =>
    fetch(`https://gentle-peak-55740.herokuapp.com/jobs`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(jobs);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDeleteProduct = (_id) => {
    const conferm = window.confirm("Are you sure you want to remove this Job?");
    if (conferm) {
      fetch(`https://gentle-peak-55740.herokuapp.com/jobs/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("The job is deleted successfully!");
          refetch();
        });
    }
  };
  return (
    <>
      <div className="text-5xl text-warning mt-5 mb-5">Edit Or Remove</div>
      <div>
        <h1 className="text-2xl">Total Jobs: {jobs?.length}</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>S.NO</th>
                <th>Job ID.</th>
                <th>Job Info.</th>
                <th>Experience & Education</th>
                <th>Required Skills</th>
                <th>Remove Job</th>
                <th>Edit Job</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job, index) => (
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>{index + 1}</td>
                  <td>{job?._id}</td>

                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={job?.img}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{job?.title}</div>
                        <div className="text-sm opacity-50">
                          {job?.description
                            ? job?.description.slice(0, 40)
                            : ""}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span>
                      Experience Required: at least {job?.jobexperience}{" "}
                      years...
                    </span>
                    <br />
                    Educational Requirments: {job?.education}{" "}
                  </td>
                  <td>{job?.skills}</td>

                  <th>
                    <button
                      onClick={() => handleDeleteProduct(job._id)}
                      className="btn hover:text-white btn-error btn-outline btn-sm flex justify-between items-center"
                    >
                      <i className="fa-solid text-red fa-trash-can"></i>
                      <span>Remove Job</span>
                    </button>
                  </th>
                  <th>
                    <label
                      for="edit-modal"
                      onClick={() => setEdit(job)}
                      className="btn btn-success btn-outline btn-sm  flex justify-center items-center "
                    >
                      <span className="text-center">Edit jobs</span>
                    </label>
                  </th>
                  {edit && <EditModal edit={edit}></EditModal>}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th>S.NO</th>
                <th>Job ID.</th>
                <th>Job Info.</th>
                <th>Experience & Education</th>
                <th>Required Skills</th>
                <th>Remove Job</th>
                <th>Edit Job</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Operation;
