import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PostJobs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const url = `https://gentle-peak-55740.herokuapp.com/jobs`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((info) => {
        if (info.insertedId) {
          toast("Job posted successfully!");
        } else {
          toast("Something went wrong!");
        }
        console.log(info);
      });
    console.log(data);
    // navigate("/about");
    reset();
  };
  return (
    <div>
      <h1 className="text-3xl text-primary mb-5">Post A Job</h1>
      <div className="card mx-auto flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-20">
        <div className="card-body">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                {...register("title", {
                  required: {
                    value: true,
                    message: "Job title is required",
                  },
                  max: {
                    value: 200000,
                    message: "Too long",
                  },
                })}
                type="text"
                placeholder="Job title"
                className="input input-bordered"
              />
              <label className="label">
                {errors.title?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.title.message}
                  </span>
                )}
                {errors.title?.type === "maxLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "job description is required",
                  },
                })}
                type="text"
                placeholder="job description"
                className="input input-bordered"
              />
              <label className="label">
                {errors.description?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Required Skills</span>
              </label>
              <input
                {...register("skills", {
                  required: {
                    value: true,
                    message: "job Skills is required",
                  },
                })}
                type="text"
                placeholder="skills"
                className="input input-bordered"
              />
              <label className="label">
                {errors.skills?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.skills.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Experience</span>
              </label>
              <input
                {...register("jobexperience", {
                  required: {
                    value: true,
                    message: "job Experience is required",
                  },
                })}
                type="text"
                placeholder="job experience"
                className="input input-bordered"
              />
              <label className="label">
                {errors.jobexperience?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.jobexperience.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Educational Requirment</span>
              </label>
              <input
                {...register("education", {
                  required: {
                    value: true,
                    message: "quantity is required",
                  },
                })}
                type="text"
                placeholder="Educational Requirment"
                className="input input-bordered"
              />
              <label className="label">
                {errors.education?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.education.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("img", {
                  required: {
                    value: true,
                    message: "photo URL is required",
                  },
                })}
                type="text"
                placeholder="photo URL of the Job"
                className="input input-bordered"
              />
              <label className="label">
                {errors.img?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.img.message}
                  </span>
                )}
              </label>
            </div>

            <input
              className="btn btn-primary w-full max-w-xs mt-3 text-white"
              type="submit"
              value="Post the job"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
