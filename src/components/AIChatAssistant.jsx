// client/src/components/AIChatAssistant.jsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './AIChatAssistant.css';
import { db } from '../firebaseConfig'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

function AIChatAssistant() {
  const [formData, setFormData] = useState({
    date: '',
    guests: '',
    location: '',
    style: '',
    budget: '',
  });

  const [aiPlan, setAiPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [planId, setPlanId] = useState(null); // To store the ID of the saved plan
  const [saveStatus, setSaveStatus] = useState(''); // New state for save status

  const questions = [
    { id: 'date', label: 'Preferred Wedding Date or Time of Year (e.g., "next summer", "Dec 2025"):', placeholder: 'e.g., "next summer", "Dec 2025"' },
    { id: 'guests', label: 'Approximate Number of Guests:', placeholder: 'e.g., "150 guests"' },
    { id: 'location', label: 'Wedding Location in Zimbabwe:', placeholder: 'e.g., "Harare", "Victoria Falls"' },
    { id: 'style', label: 'Desired Wedding Style or Theme:', placeholder: 'e.g., "traditional", "modern", "cultural"' },
    { id: 'budget', label: 'Estimated Budget Range:', placeholder: 'e.g., "$5,000 - $10,000", "modest", "luxury"' },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const parseChecklist = (fullPlanText) => {
    const checklistSectionRegex = /## 9\. Comprehensive Wedding Planning Checklist\n\n([\s\S]*?)(?=\n\n##|$)/;
    const checklistMatch = fullPlanText.match(checklistSectionRegex);

    if (!checklistMatch || !checklistMatch[1]) {
      console.warn("Checklist section not found or empty.");
      return [];
    }

    const checklistContent = checklistMatch[1];
    const itemRegex = /^- \[(\w+)\] (.+?): (.+)$/gm;
    let match;
    const parsedItems = [];

    while ((match = itemRegex.exec(checklistContent)) !== null) {
      const type = match[1];
      const task = match[2];
      const description = match[3];
      parsedItems.push({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        type: type.toUpperCase(),
        task,
        description,
        isCompleted: false,
      });
    }
    return parsedItems;
  };

  // NEW FUNCTION: Handle saving the plan explicitly
  const handleSavePlan = async () => {
    if (!aiPlan || planId) { // Only save if a plan exists and hasn't been saved explicitly yet
      setSaveStatus('Plan already saved or no plan to save.');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    setSaveStatus('Saving...');
    try {
      const parsedChecklist = parseChecklist(aiPlan); // Ensure checklist is parsed before saving
      const docRef = await addDoc(collection(db, "weddingPlans"), {
        formData: formData,
        aiPlanFullText: aiPlan,
        checklist: parsedChecklist,
        createdAt: new Date(),
      });
      setPlanId(docRef.id);
      setSaveStatus('Plan saved successfully!');
      console.log("Document explicitly saved with ID: ", docRef.id);
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error('Error saving plan:', err);
      setSaveStatus('Failed to save plan.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAiPlan(''); // Clear previous plan when submitting a new one
    setCopied(false); // Reset copied state
    setPlanId(null); // Reset plan ID
    setSaveStatus(''); // Reset save status

    for (const key in formData) {
      if (!formData[key].trim()) {
        setError(`Please fill in your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} for a comprehensive plan.`);
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectedAnswers: formData,
          stage: 'GENERATE_FULL_PLAN_FROM_FORM',
          originalQuery: 'Generate a full wedding plan based on provided details.',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate plan.');
      }

      const data = await response.json();
      const generatedPlan = data.response;
      setAiPlan(generatedPlan);

      // Automatically save to Firestore upon successful generation
      const parsedChecklist = parseChecklist(generatedPlan);
      const docRef = await addDoc(collection(db, "weddingPlans"), {
        formData: formData,
        aiPlanFullText: generatedPlan,
        checklist: parsedChecklist,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setPlanId(docRef.id); // Store the ID for display
      setSaveStatus('Plan generated and saved!'); // Indicate automatic save
      setTimeout(() => setSaveStatus(''), 3000); // Clear message after 3 seconds

    } catch (err) {
      console.error('Error generating plan:', err);
      setError(`Error: ${err.message || 'Could not generate the wedding plan. Please try again.'}`);
      setSaveStatus('Generation failed, plan not saved.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyPlanToClipboard = () => {
    if (aiPlan) {
      navigator.clipboard.writeText(aiPlan)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const startNewPlan = () => {
    setFormData({
      date: '',
      guests: '',
      location: '',
      style: '',
      budget: '',
    });
    setAiPlan('');
    setError('');
    setCopied(false);
    setIsLoading(false);
    setPlanId(null);
    setSaveStatus(''); // Clear save status on new plan
  };

  return (
    <div className="ai-main-wrapper">
      {/* Form Card */}
      <div className="ai-card ai-form-card">
        <h3>AI Wedding Planning Assistant</h3>
        <p>Fill out the details below, and I'll generate a personalized wedding plan for you!</p>

        <form onSubmit={handleSubmit} className="ai-planner-form">
          {questions.map((q) => (
            <div className="form-group" key={q.id}>
              <label htmlFor={q.id}>{q.label}</label>
              <input
                type="text"
                id={q.id}
                value={formData[q.id]}
                onChange={handleChange}
                placeholder={q.placeholder}
                required
                disabled={isLoading}
              />
            </div>
          ))}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Plan...' : 'Generate My Wedding Plan'}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <p>Please wait, the AI is crafting your plan...</p>
        </div>
      )}

      {/* AI Response Content */}
      {aiPlan && (
        <div className="ai-plan-content-block">
          <div className="ai-plan-header">
            <h4>Your Personalized Wedding Plan:</h4>
            <div className="plan-actions">
              {/* "Save to My Plans" button */}
              {!planId && ( // Show only if a plan is generated but not yet explicitly saved (or if initial save failed)
                <button
                  onClick={handleSavePlan}
                  className="action-button primary-action"
                  disabled={isLoading}
                >
                  Save to My Plans
                </button>
              )}
              <button onClick={copyPlanToClipboard} className="action-button primary-action" disabled={copied}>
                {copied ? 'Copied!' : 'Copy Plan'}
              </button>
              <button onClick={startNewPlan} className="action-button secondary-action">
                Start New Plan
              </button>
            </div>
          </div>

          {/* Display Plan ID and Save Status */}
          {planId && (
            <p className="plan-info">
              **Plan ID:** <span className="plan-id-text">{planId}</span> (You can use this to retrieve your plan later!)
            </p>
          )}
          {saveStatus && <p className="save-status-message">{saveStatus}</p>}

          <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiPlan}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AIChatAssistant;