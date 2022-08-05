import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import photo from "../../assets/job-icon.png";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

const Job = ({job}) => {



  const {_id, title, description,jobexperience, education, img, skills} = job;

  return (
    <>
      <div class="mt-20 card w-72 glass mx-auto">
        <figure>
          <img style={{height:"200px"}} src={img} alt="car!" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <small className="text-left font-bold">Job ID: {_id}</small>
          <kbd class="kbd kbd-sm">Skills Required</kbd>
          <p>{skills}</p>
          <kbd class="kbd kbd-sm">Experience Required:</kbd>
          <ul className="felx flex-col text-left">
            <li>Educational Requirments: {education}</li>
            <li>Job Experience: at least {jobexperience} years of experience in related jobs</li>
          </ul>
          <kbd class="kbd kbd-sm">Job Description</kbd>
          <p>{description}</p>
          <div class="card-actions justify-end">
            <Link to="/operation">
            <button class="btn btn-primary">View Details</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
