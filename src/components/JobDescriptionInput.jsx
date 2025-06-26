import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="job-desc-section">
      <h3>Job Description</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        rows={10}
      />
    </div>
  );
};

export default JobDescriptionInput;