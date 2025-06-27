import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultDisplay from './components/ResultDisplay';
import './styles.css';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescText) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://resume-analyzer-backend-wd2z.onrender.com/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobDescText }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Resume-Job Description Analyzer</h1>
      
      <div className="input-section">
        <FileUpload onTextExtracted={setResumeText} />
        <JobDescriptionInput value={jobDescText} onChange={setJobDescText} />
      </div>

      <button 
        onClick={handleAnalyze} 
        disabled={loading || !resumeText || !jobDescText}
        className="analyze-button"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <div className="error">{error}</div>}

      {analysisResult && <ResultDisplay result={analysisResult} />}
    </div>
  );
}

export default App;