import React from 'react';

const SubStep1: React.FC = () => {
  return (
    <div>
      <h2>Organization Profile Setup</h2>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Tell Us About Your Organization</b>
      </p>
      <p>
        This is the first step in setting up your site-specific and personalized DER analysis with Bradley. <br />
        I will ask you a series of questions around the use of your facility, gather some key information <br />
        about your energy use in order to conceptually design the ideal distributed energy resource, <br />
        identify potential incentives (rebates, grants, tax benefits), and deliver accurate results.
      </p>
      <p>
        This will take about 5 minutes.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Organizational Details</b> <br />
        Your input helps us understand your organization's structure and <br />
        operations, which influence how Bradley will generate DER <br />
        concepts that best fit your prioritization.
      </li>
    </div>
  );
};

export default SubStep1;
