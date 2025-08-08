import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './AIChatAssistant.css';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

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
  const [planId, setPlanId] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // **NEW: State for booking functionality**
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [bookingStatus, setBookingStatus] = useState('');

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

  // **NEW: Handler for booking form inputs**
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
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

  const handleSavePlan = async () => {
    if (!aiPlan || planId) {
      setSaveStatus('Plan already saved or no plan to save.');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    setSaveStatus('Saving...');
    try {
      const parsedChecklist = parseChecklist(aiPlan);
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
    setAiPlan('');
    setCopied(false);
    setPlanId(null);
    setSaveStatus('');
    setShowBookingForm(false); // Hide booking form on new submission
    setBookingStatus(''); // Clear booking status

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
      setPlanId(docRef.id);
      setSaveStatus('Plan generated and saved!');
      setTimeout(() => setSaveStatus(''), 3000);

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
    setSaveStatus('');
    setShowBookingForm(false);
    setBookingStatus('');
    setBookingDetails({
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleBookNow = async () => {
    if (!planId) {
        setBookingStatus('Please wait for the plan to be saved before booking, or generate a new plan.');
        return; // Stop the function here
    }

    setBookingStatus('Submitting booking...');
    try {
      const response = await fetch('http://localhost:5000/api/book-wedding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          ...bookingDetails,
          ...formData, // Include original form data for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Booking failed.');
      }

      const data = await response.json();
      setBookingStatus('Booking successful! We will contact you shortly.');
      console.log('Booking successful:', data);
      setTimeout(() => setBookingStatus(''), 5000);

    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus(`Booking failed: ${error.message}`);
    }
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
      {aiPlan && !showBookingForm && (
        <div className="ai-plan-content-block">
          <div className="ai-plan-header">
            <h4>Your Personalized Wedding Plan:</h4>
            <div className="plan-actions">
              {!planId && (
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
              <button 
                onClick={() => setShowBookingForm(true)} 
                className="action-button primary-action"
                disabled={!planId} // Ensure plan is saved before booking
              >
                Book Now
              </button>
            </div>
          </div>

          {planId && (
            <p className="plan-info">
              **Plan ID:** <span className="plan-id-text">{planId}</span> (You can use this to retrieve your plan later!)
            </p>
          )}
          {saveStatus && <p className="save-status-message">{saveStatus}</p>}

          <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiPlan}</ReactMarkdown>
        </div>
      )}

      {/* Booking Form Component */}
      {showBookingForm && (
        <div className="ai-card booking-form-card">
          <h3>Book Your Wedding</h3>
          <p>Please confirm your details to book this wedding plan.</p>
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={bookingDetails.name} 
              onChange={handleBookingChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={bookingDetails.email} 
              onChange={handleBookingChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={bookingDetails.phone} 
              onChange={handleBookingChange} 
              required 
            />
          </div>

          <div className="booking-info">
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Guests:</strong> {formData.guests}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p>A copy of your full plan is attached to this booking request.</p>
          </div>
          
          <button onClick={handleBookNow} className="action-button primary-action">
            Confirm Booking
          </button>
          <button onClick={() => setShowBookingForm(false)} className="action-button secondary-action">
            Cancel
          </button>
          {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
        </div>
      )}
    </div>
  );
}

export default AIChatAssistant;