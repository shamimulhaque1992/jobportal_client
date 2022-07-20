import React from 'react';
import useJobs from '../../hooks/useJobs';
import Job from '../VeiwJobs/Job';

const Home = () => {
    const [jobs, setJobs]=useJobs([]);
    return (
        <>
        <div className="text-5xl text-success mt-5 mb-5 border ">Some of our Jobs</div>
        <div  className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {
                jobs?.slice(0,3).map((job,index) =><Job key={index} job={job}></Job>)
            }
        </div>
        </>
    );
};

export default Home;