import React from 'react';

const ResultDisplay = ({ result }) => {
  const isStructuredResult = result.matchPercentage !== undefined || result.missingSkills || result.suggestions;
  const percentage = result.matchPercentage || 0;

  return (
    <div className="result-section">
      <h2>Analysis Results</h2>

      {isStructuredResult ? (
        <>
          <div className="result-card">
            <h3>Match Percentage</h3>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${percentage}%` }}
              >
                {percentage}%
              </div>
            </div>
          </div>

          <div className="result-card">
            <h3>Missing Skills</h3>
            {result.missingSkills?.length > 0 ? (
              <ul>
                {result.missingSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No missing skills found!</p>
            )}
          </div>

          <div className="result-card">
            <h3>Suggestions</h3>
            {result.suggestions?.length > 0 ? (
              <ul>
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            ) : (
              <p>No suggestions available</p>
            )}
          </div>
        </>
      ) : (
        <div className="result-card">
          <h3>Analysis Result (Unstructured)</h3>
          <pre>{JSON.stringify(result.analysis || result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
