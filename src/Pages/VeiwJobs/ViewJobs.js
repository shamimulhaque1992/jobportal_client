import React from "react";
import Loading from "../Shared/Loading/Loading";
import Job from "./Job";
import { useQuery } from "react-query";
import useJobs from "../../hooks/useJobs";
import { Grid } from "@mui/material";

const ViewJobs = () => {
  const [jobs, setJobs] = useJobs();
  console.log(jobs);
  
  return (
    <>
   <div className="text-5xl text-success border-4 mt-5 mb-5">All Available Jobs</div>
    <div  className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 justify-items-center">
        {jobs?.map((job, index) => (
        <Job key={index} job={job}></Job>
      ))}
    </div>
     </>
  );
};

export default ViewJobs;
