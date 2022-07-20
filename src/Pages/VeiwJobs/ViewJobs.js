import React from "react";
import Loading from "../Shared/Loading/Loading";
import Job from "./Job";
import { useQuery } from "react-query";
import useJobs from "../../hooks/useJobs";
import { Grid } from "@mui/material";

const ViewJobs = () => {
  const [jobs, setJobs] = useJobs();
  console.log(jobs);
  /* const {
    data: jobs,
    isloading,
    refetch,
  } = useQuery("jobs", () =>
    fetch("http://localhost:5000/jobs", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(jobs);

  if (isloading) {
    return <Loading></Loading>;
  } */
  return (
    <div  className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs?.map((job, index) => (
        <Job key={index} job={job}></Job>
      ))}
    </div>
  );
};

export default ViewJobs;
