import React, { useEffect, useState } from 'react';

const useJobs = () => {
    const [jobs, setJobs]= useState([])
    useEffect(() =>{
        fetch("http://localhost:5000/jobs",{
            method:"GET",
            headers:{
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
        })
        .then(response => response.json())
        .then(data =>setJobs(data))
    },[])
    return [jobs, setJobs];
};

export default useJobs;