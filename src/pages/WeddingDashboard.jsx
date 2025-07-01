import React, { useState, useEffect, useRef } from "react";
import "./WeddingDashboard.css"; // Assuming your CSS file is in the same directory

// --- Onboarding Questions (Same as before) ---
const onboardingQuestions = [
  {
    category: "Your Wedding Vision & Foundation",
    description: "Let's capture the core essence and scale of your dream wedding.",
    questions: [
      { key: "names", label: "Couple's Names", type: "text", placeholder: "e.g. Alex & Jamie" },
      { key: "contact", label: "Best Contact Email or Phone", type: "text", placeholder: "e.g. +26377xxxxxxx" },
      { key: "totalBudget", label: "Total Estimated Wedding Budget (USD or ZWL equivalent)", type: "text", placeholder: "e.g. $50,000 or ZWL equivalent. Be realistic!", isRequired: true },
      { key: "budgetPriorities", label: "Top 3 Budget Priorities (where do you want to splurge?)", type: "text", placeholder: "e.g. Food & Drinks, Live Band, Photography, Venue Decor" },
      { key: "estimatedGuests", label: "Estimated Number of Guests (final headcount is critical for big weddings)", type: "number", placeholder: "e.g. 250", isRequired: true },
      { key: "guestConsiderations", label: "Any special considerations for guests? (e.g., many international guests, elderly needing accessibility, many children, specific cultural groups)", type: "textarea", placeholder: "e.g. Many guests flying from UK, Grandparents need wheelchair access." },
      { key: "weddingDate", label: "Target Wedding Date(s) or Season", type: "date", isRequired: true },
      { key: "weddingStyle", label: "Overall Wedding Style/Vibe", type: "radio", options: ["Elegant & Formal", "Lively & Celebratory", "Rustic & Natural", "Modern & Chic", "Traditional & Cultural", "Intimate & Relaxed", "Destination", "Other"] },
      { key: "ceremonyType", label: "Type(s) of Ceremony/Celebration", type: "textarea", placeholder: "e.g. Religious church ceremony, Civil ceremony, Traditional Lobola, Combined" },
      { key: "culturalTraditions", label: "Are there any specific cultural/religious traditions you MUST include or avoid?", type: "textarea", placeholder: "e.g. Lobola ceremony, Ziyara, specific traditional dances, no alcohol" },
    ],
  },
  {
    category: "Venue & Key Vendor Selection",
    description: "Crucial decisions that set the stage and define your event's capabilities.",
    questions: [
      { key: "venueNameKnown", label: "Venue Name (if already booked or shortlisted)", type: "text", placeholder: "e.g. Wild Geese Lodge, The Venue, Private Estate" },
      { key: "venueRequirements", label: "Essential Venue Requirements (e.g., on-site catering, capacity, parking, multiple spaces, indoor/outdoor options, reliable power backup)", type: "textarea", placeholder: "e.g. Must seat 250+, ample parking, separate ceremony/reception areas, reliable generator." },
      { key: "fullWeddingPlanner", label: "Do you plan to hire a full wedding planner, day-of coordinator, or manage mostly yourselves?", type: "radio", options: ["Full Planner", "Day-of Coordinator", "Mostly Self-Planned with AI"] },
      { key: "cateringStyle", label: "Preferred Catering Style", type: "radio", options: ["Formal Plated Dinner", "Elaborate Buffet", "Interactive Food Stations", "Family Style", "Cocktail Reception with Heavy Hors d'oeuvres", "Other"] },
      { key: "dietaryNeeds", label: "Significant Dietary Requirements/Allergies for Guests?", type: "textarea", placeholder: "e.g. 20 vegetarians, 5 nut allergies, 3 gluten-free, Kosher options" },
      { key: "alcoholPreference", label: "Alcohol/Bar Service Preference", type: "radio", options: ["Full Open Bar", "Wine & Beer Only", "Cash Bar", "Specific Signature Cocktails", "No Alcohol", "Other"] },
      { key: "entertainmentVision", label: "Vision for Music & Entertainment (e.g., large live band, multiple DJs, traditional performers, MC preferences)", type: "textarea", placeholder: "e.g. 10-piece live band for reception, separate DJ for after-party, traditional drummers for entrance." },
      { key: "photographyVideoVision", label: "Photography & Videography Vision (e.g., drone, multiple photographers, specific moments, live-streaming for diaspora)", type: "textarea", placeholder: "e.g. Must have drone, 2 photographers, videographer for full day, live stream for international family." },
    ],
  },
  {
    category: "Guest Experience & Logistics",
    description: "Ensuring all your guests have a comfortable and memorable experience.",
    questions: [
      { key: "preWeddingEvents", label: "Are you planning any pre-wedding events? (e.g., Lobola, Engagement Party, Kitchen Party, Bridal Shower, Bachelor/Bachelorette)", type: "textarea", placeholder: "e.g. Lobola in July, Welcome Dinner day before wedding" },
      { key: "postWeddingEvents", label: "Are you planning any post-wedding events? (e.g., Farewell Brunch, Gift Opening, After-party)", type: "textarea", placeholder: "e.g. Farewell brunch Sunday morning, gift opening party next week" },
      { key: "guestAccommodation", label: "Will you provide/arrange guest accommodation or hotel blocks?", type: "radio", options: ["Yes, for all", "Yes, for out-of-town guests", "No, guests arrange their own"] },
      { key: "guestTransportation", label: "Will guest transportation be provided/needed? (e.g., shuttles from hotels, between venues)", type: "radio", options: ["Yes, shuttles", "Yes, for VIPs only", "No, guests arrange"] },
      { key: "bridalPartyDetails", label: "Bridal Party Details (number of bridesmaids/groomsmen, roles, special needs)", type: "textarea", placeholder: "e.g. 6 bridesmaids, 6 groomsmen, plus flower girl & ring bearer. Need transport for bridal party." },
      { key: "vipGuests", label: "Key VIP Guests requiring special attention/logistics? (e.g., elderly parents, dignitaries, distant relatives)", type: "textarea", placeholder: "e.g. Groom's elderly grandmother needs dedicated transport; Pastor needs private room." },
      { key: "giftManagement", label: "Gift Registry Preference and Secure Gift Management needs?", type: "textarea", placeholder: "e.g. Online registry, cash preferred. Need secure room for gifts at venue." },
      { key: "invitationsRSVP", label: "What is your approach to invitations and RSVPs for your large guest list? (e.g., primarily digital, traditional paper, tiered invitations, specific RSVP tracking needs?)", type: "textarea", placeholder: "e.g., Traditional paper invites, need online RSVP tracking system." },
      { key: "internationalGuestSupport", label: "For international guests, what level of support do you anticipate needing to provide regarding travel logistics, local guidance, or visa information?", type: "textarea", placeholder: "e.g., Need to provide visa guidance, suggest local attractions and transport." },
    ],
  },
  {
    category: "Legal, Personal Touches & Post-Wedding",
    description: "Covering the formalities, unique elements, and follow-through after the celebration.",
    questions: [
      { key: "marriageLicense", label: "Do you need guidance/reminders for marriage license and legal requirements?", type: "radio", options: ["Yes", "No", "Already handled"] },
      { key: "officiantConfirmation", label: "Officiant Type/Preference? (e.g., family pastor, professional officiant, specific cultural leader)", type: "textarea", placeholder: "e.g. Our family pastor. Need to confirm his availability and requirements." },
      { key: "convoyPreference", label: "Bridal Party Transportation/Convoy Preferences?", type: "textarea", placeholder: "e.g. Luxury sedans for couple, kombis for bridal party, traditional vehicles." },
      { key: "honeymoonPlans", label: "Honeymoon Plans (location, dates, specific requirements)?", type: "textarea", placeholder: "e.g. Zanzibar for 7 days in October, need visa guidance." },
      { key: "postWeddingTasks", label: "Any post-wedding tasks the AI should remind you about? (e.g., thank-you notes, name change, photo album creation, vendor final payments)", type: "textarea", placeholder: "e.g. Send thank you notes by X date, process name change, order photo album." },
    ],
  },
  {
    category: "Unique Details & Custom Requests",
    description: "Tell us about anything truly unique or specific to your wedding vision that wasn't covered.",
    questions: [
      { key: "customDetails", label: "Any unique or special requests you want to incorporate that aren't listed? (e.g., specific decor elements, guest experiences, surprises, vendor type preferences like in-house vs. external catering)", type: "textarea", placeholder: "e.g. Fireworks display, cultural dancers during reception, custom guest favors. We prefer external catering for more flexibility." },
      { key: "userCustomQuestions", label: "Add any other specific questions or details you want the AI to consider for your personalized plan:", type: "textarea", placeholder: "e.g. My fiancé really wants a specific type of rare flower. How do we source it? / We have a limited timeframe for setup at the venue. What does that mean for decor?" },
    ],
  },
];

// Reusable Flower Icon component
function FlowerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" fill="#e67e88" />
      <circle cx="14" cy="8" r="4" fill="#ffe3ee" />
      <circle cx="20" cy="14" r="4" fill="#ffe3ee" />
      <circle cx="14" cy="20" r="4" fill="#ffe3ee" />
      <circle cx="8" cy="14" r="4" fill="#ffe3ee" />
    </svg>
  );
}

export default function WeddingDashboard() {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [structuredChecklist, setStructuredChecklist] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]); // NEW: State for AI suggestions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Budget State
  const [budgetData, setBudgetData] = useState(() => {
    const savedBudget = localStorage.getItem('weddingBudget');
    return savedBudget ? JSON.parse(savedBudget) : {
      total: 0,
      spent: 0,
      remaining: 0,
      categories: {
        venue: { estimated: 0, actual: 0, items: [] },
        catering: { estimated: 0, actual: 0, items: [] },
        decor: { estimated: 0, actual: 0, items: [] },
        photography: { estimated: 0, actual: 0, items: [] },
        attire: { estimated: 0, actual: 0, items: [] },
        entertainment: { estimated: 0, actual: 0, items: [] },
        stationery: { estimated: 0, actual: 0, items: [] },
        lobola: { estimated: 0, actual: 0, items: [] },
        transport: { estimated: 0, actual: 0, items: [] },
        contingency: { estimated: 0, actual: 0, items: [] },
        other: { estimated: 0, actual: 0, items: [] },
      },
    };
  });

  // State for Add Task Modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    category: "", // To pre-fill if adding within a category
    title: "",
    goal: "",
    estimatedCost: 0, // NEW: Estimated cost for new task
    subtasks: [],
  });
  const [addingToCategoryIndex, setAddingToCategoryIndex] = useState(null); // Which category index we're adding to

  const handleFormChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const toggleSubtaskCompletion = (categoryIndex, taskIndex, subtaskIndex) => {
    setStructuredChecklist(prevList => {
      const newList = JSON.parse(JSON.stringify(prevList)); // Deep copy
      const subtask = newList[categoryIndex].tasks[taskIndex].subtasks[subtaskIndex];
      subtask.completed = !subtask.completed;

      const newCompletedCount = newList.flatMap(cat => cat.tasks).flatMap(task => task.subtasks).filter(st => st.completed).length;
      setCompletedTasksCount(newCompletedCount);

      localStorage.setItem('weddingChecklist', JSON.stringify(newList));
      return newList;
    });
  };

  const getTotalSubtasks = () => {
    return structuredChecklist.flatMap(cat => cat.tasks).flatMap(task => task.subtasks).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = onboardingQuestions.flatMap(cat => cat.questions).filter(q => q.isRequired);
    for (const field of requiredFields) {
        if (!form[field.key]) {
            setError(`Please fill out the required field: ${field.label}`);
            return;
        }
    }

    setSubmitted(true);
    setLoading(true);
    setStructuredChecklist([]);
    setAiSuggestions([]); // Clear previous suggestions
    setError("");

    try {
      const prompt = generatePrompt(form);
      console.log("Prompt sent to AI:", prompt);
      const response = await fetch("http://localhost:5000/api/ai/wedding-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: prompt }),
      });
      const data = await response.json();

      if (data.full_response) { // Assuming backend sends full response text
        const { checklist, suggestions } = parseAiOutput(data.full_response);
        setStructuredChecklist(checklist);
        setAiSuggestions(suggestions); // Set suggestions
        setCompletedTasksCount(0);
        localStorage.setItem('weddingChecklist', JSON.stringify(checklist));
        localStorage.setItem('aiSuggestions', JSON.stringify(suggestions)); // Persist suggestions
      } else {
        setError(data.error || "No checklist was generated.");
      }
    } catch (err) {
      setError("Failed to generate checklist. Please try again. Ensure backend is running.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Add Expense Function for Budget Tracker ---
  const addExpense = (categoryKey, amount, description) => {
    setBudgetData(prev => {
        const newCategories = { ...prev.categories };
        if (!newCategories[categoryKey]) { // Handle dynamic categories if needed
            newCategories[categoryKey] = { estimated: 0, actual: 0, items: [] };
        }
        newCategories[categoryKey].actual += amount;
        newCategories[categoryKey].items.push({ amount, description, date: new Date().toISOString() });

        const newSpent = prev.spent + amount;
        const newRemaining = prev.total - newSpent;

        const newBudget = {
            ...prev,
            spent: newSpent,
            remaining: newRemaining,
            categories: newCategories,
        };
        localStorage.setItem('weddingBudget', JSON.stringify(newBudget));
        return newBudget;
    });
  };

  // --- NEW: Remove Task Function with Importance Warning ---
  const removeTask = (categoryIndex, taskIndex, isAIGenerated = true) => {
    const taskTitle = structuredChecklist[categoryIndex].tasks[taskIndex].title;
    let confirmationMessage = `Are you sure you want to remove "${taskTitle}"?`;

    if (isAIGenerated) {
      confirmationMessage += "\n\nThis task was automatically generated by the AI and is often important for successful wedding planning. Removing it might lead to overlooked details. Proceed with caution!";
    }

    if (window.confirm(confirmationMessage)) {
      setStructuredChecklist(prevList => {
        const newList = JSON.parse(JSON.stringify(prevList));
        newList[categoryIndex].tasks.splice(taskIndex, 1);

        // Re-calculate completed tasks count
        const newCompletedCount = newList.flatMap(cat => cat.tasks).flatMap(task => task.subtasks).filter(st => st.completed).length;
        setCompletedTasksCount(newCompletedCount);

        localStorage.setItem('weddingChecklist', JSON.stringify(newList));
        return newList;
      });
    }
  };

  // --- NEW: Add New Task Logic ---
  const openAddTaskModal = (categoryIndex) => {
    setIsAddTaskModalOpen(true);
    setAddingToCategoryIndex(categoryIndex);
    setNewTask({ ...newTask, category: structuredChecklist[categoryIndex].category });
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewTask = () => {
    const cost = parseFloat(newTask.estimatedCost || 0);

    if (cost > budgetData.remaining) {
      alert(`Cannot add task: Estimated cost ($${cost.toLocaleString()}) exceeds your remaining budget ($${budgetData.remaining.toLocaleString()}). Adjust your budget or the task's cost.`);
      return;
    }

    setStructuredChecklist(prevList => {
      const newList = JSON.parse(JSON.stringify(prevList));
      if (addingToCategoryIndex !== null) {
        newList[addingToCategoryIndex].tasks.push({
          title: newTask.title,
          goal: newTask.goal,
          estimatedCost: cost, // Store estimated cost
          subtasks: newTask.subtasks.split('\n').filter(s => s.trim() !== '').map(s => ({ text: s.trim(), completed: false })),
          tips: [], // User added tasks start with no AI tips
          dependencies: [], // User added tasks start with no dependencies
          isUserAdded: true, // Flag to identify user-added tasks
        });
      }

      // Automatically add expense to budget tracker for this new task
      addExpense('other', cost, `New Task: ${newTask.title}`); // Can make category dynamic later

      localStorage.setItem('weddingChecklist', JSON.stringify(newList));
      return newList;
    });

    setIsAddTaskModalOpen(false);
    setNewTask({ category: "", title: "", goal: "", estimatedCost: 0, subtasks: [] }); // Reset form
  };


  // --- Effects for loading from localStorage ---
  useEffect(() => {
    const savedChecklist = localStorage.getItem('weddingChecklist');
    if (savedChecklist) {
      const parsed = JSON.parse(savedChecklist);
      setStructuredChecklist(parsed);
      setSubmitted(true);
      const newCompletedCount = parsed.flatMap(cat => cat.tasks).flatMap(task => task.subtasks).filter(st => st.completed).length;
      setCompletedTasksCount(newCompletedCount);
    }

    const savedBudget = localStorage.getItem('weddingBudget');
    if (savedBudget) {
      setBudgetData(JSON.parse(savedBudget));
    }

    const savedSuggestions = localStorage.getItem('aiSuggestions');
    if (savedSuggestions) {
        setAiSuggestions(JSON.parse(savedSuggestions));
    }
  }, []);

  useEffect(() => {
    if (form.totalBudget && budgetData.total === 0) {
        const total = parseFloat(form.totalBudget.replace(/[^0-9.]/g, '')) || 0;
        setBudgetData(prev => {
            const newBudget = { ...prev, total: total, remaining: total - prev.spent };
            localStorage.setItem('weddingBudget', JSON.stringify(newBudget));
            return newBudget;
        });
    }
  }, [form.totalBudget, budgetData.total]);


  // --- UPDATED: AI Prompt with Request for Suggestions ---
  function generatePrompt(form) {
    let lines = [];
    lines.push(`Generate a highly detailed, comprehensive, and actionable wedding planning checklist for a large-scale wedding. The plan should cover all phases from initial conception to post-wedding tasks, be organized by timeline/category, and include specific advice and considerations based on the provided details. Focus on making each item actionable with sub-tasks and tips. Ensure all suggestions are relevant to a wedding in Zimbabwe, especially for large guest counts, incorporating cultural nuances and practical challenges unique to the region (e.g., power backup, water supply, transportation logistics, cultural ceremonies like Lobola/Roora, and managing international guests).`);
    lines.push(`Adopt the persona of a highly experienced, meticulous, and culturally-aware Zimbabwean wedding planner.`);
    lines.push(`\n--- Wedding Details Provided by Couple ---`);

    onboardingQuestions.forEach(categoryGroup => {
      lines.push(`\n**${categoryGroup.category}:**`);
      if (categoryGroup.description) {
        lines.push(`${categoryGroup.description}`);
      }
      categoryGroup.questions.forEach(q => {
        if (form[q.key]) {
          lines.push(`${q.label}: ${form[q.key]}`);
        }
      });
    });

    lines.push(`\n--- Checklist Requirements ---`);
    lines.push(`\n**Checklist Structure:**
    The checklist MUST be structured into time-based phases. Use the following exact headings:
    - ## 12+ Months Out: Vision & Foundation
    - ## 9-11 Months Out: Venue & Key Vendors
    - ## 6-8 Months Out: Details & Guest Experience
    - ## 3-5 Months Out: Finalizing Logistics & Attire
    - ## 1-2 Months Out: Countdown & Confirmation
    - ## 2-4 Weeks Out: Final Preparations
    - ## Wedding Week: The Home Stretch
    - ## Wedding Day: The Celebration
    - ## Post-Wedding: After the 'I Do's'

    **Task Item Format:**
    For EACH checklist item, provide information in a consistent, actionable format.
    Use this markdown structure for each task (use '[ ]' for unchecked):
    - **[ ] Task Title:** Brief goal of the task.
        - Sub-step 1: Detailed actionable step. (Zimbabwe/Large Wedding Specific Tip: Relevant local advice or consideration)
        - Sub-step 2: Another detailed actionable step. (Dependency: Other planning area)
        - Sub-step N: ...
    Do NOT include generic filler. Every sub-step and tip must be valuable and actionable. Prioritize actionable items relevant to a large wedding.
    `);

    // Add explicit prompts based on key answers
    if (form.totalBudget && parseFloat(form.totalBudget.replace(/[^0-9.]/g, '')) > 20000) {
      lines.push(`\n**Special consideration:** The budget is significant. Suggest options for premium services and advise on managing higher-end vendors effectively. Include advice on securing payments and contracts for large sums in Zimbabwe.`);
    }
    if (form.estimatedGuests && parseInt(form.estimatedGuests) > 200) {
      lines.push(`\n**Special consideration:** This is a large wedding. Emphasize logistics for guest flow, catering capacity, transport, parking, seating plans, sound systems for large crowds, and adequate facilities (e.g., ablution blocks, power backup).`);
    }
    if (form.culturalTraditions && form.culturalTraditions.toLowerCase().includes("lobola")) {
      lines.push(`\n**Special consideration:** Include a dedicated sub-section or detailed tasks within the relevant phase for the Lobola/Roora ceremony, covering traditional protocols, family involvement, and timelines. Advise on integrating traditional and modern aspects gracefully.`);
    }
    if (form.guestConsiderations && form.guestConsiderations.toLowerCase().includes("international guests")) {
      lines.push(`\n**Special consideration:** Advise on providing clear directions, accommodation blocks, local transport options, visa information, and welcoming experiences for international guests.`);
    }
    if (form.venueRequirements && form.venueRequirements.toLowerCase().includes("reliable power backup")) {
      lines.push(`\n**Special consideration:** Explicitly include tasks for verifying and testing venue power backup systems (generators) and potentially arranging additional backup, which is crucial in Zimbabwe.`);
    }
    if (form.postWeddingTasks && form.postWeddingTasks.toLowerCase().includes("name change")) {
      lines.push(`\n**Special consideration:** Include specific, actionable steps for legal name change procedures in Zimbabwe.`);
    }

    lines.push(`\n**Avoid:** Generic, non-actionable advice. Focus on practicality for a large Zimbabwean wedding.`);

    // NEW: Request for Suggestions section
    lines.push(`\n--- Suggestions for an Even Better Wedding ---`);
    lines.push(`Please provide 3-5 unique, actionable suggestions to make this wedding even better, especially considering the Zimbabwean context, large guest count, and the couple's specific details. These should be creative ideas or proactive tips not already covered in the checklist. Format as a bulleted list.`);

    return lines.join("\n");
  }

  // --- NEW: Parsing Function for BOTH Checklist and Suggestions ---
  const parseAiOutput = (fullMarkdown) => {
    const checklistSectionRegex = /--- Checklist Requirements ---\s*\n([\s\S]*?)(?=\n--- Suggestions for an Even Better Wedding ---|$)/;
    const suggestionsSectionRegex = /--- Suggestions for an Even Better Wedding ---\s*\n([\s\S]*)/;

    const checklistMatch = fullMarkdown.match(checklistSectionRegex);
    const suggestionsMatch = fullMarkdown.match(suggestionsSectionRegex);

    const checklistMarkdown = checklistMatch ? checklistMatch[1].trim() : "";
    const suggestionsMarkdown = suggestionsMatch ? suggestionsMatch[1].trim() : "";

    const parsedChecklist = [];
    const categoryBlocks = checklistMarkdown.split('## ').slice(1);

    categoryBlocks.forEach(block => {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      if (lines.length === 0) return;

      const categoryName = lines[0];
      const tasks = [];
      let currentTask = null;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('- **[ ]') || line.startsWith('- **[x]')) {
          if (currentTask) {
            tasks.push(currentTask);
          }
          const isCompleted = line.startsWith('- **[x]'); // AI should output [ ] initially
          const titleMatch = line.match(/^- \*\*\[[ x]\] (.*?):\s*(.*)$/);
          if (titleMatch) {
            currentTask = {
              title: titleMatch[1],
              goal: titleMatch[2],
              subtasks: [],
              tips: [],
              dependencies: [],
              isAIGenerated: true, // Flag AI generated tasks
              expanded: false, // For UI expand/collapse
            };
          } else {
             currentTask = {
                title: line.substring(line.indexOf(']') + 2).replace(':', '').trim(),
                goal: '',
                subtasks: [],
                tips: [],
                dependencies: [],
                isAIGenerated: true,
                expanded: false,
             };
          }
        } else if (currentTask) {
          if (line.startsWith('Sub-step')) {
            const subtaskText = line.substring(line.indexOf(':') + 1).trim();
            currentTask.subtasks.push({ text: subtaskText, completed: false });
          } else if (line.startsWith('(Zimbabwe/Large Wedding Specific Tip:')) {
            currentTask.tips.push(line.substring('(Zimbabwe/Large Wedding Specific Tip:'.length).trim().replace(/\)$/, ''));
          } else if (line.startsWith('(Dependency:')) {
            currentTask.dependencies.push(line.substring('(Dependency:'.length).trim().replace(/\)$/, ''));
          }
        }
      }
      if (currentTask) {
        tasks.push(currentTask);
      }
      parsedChecklist.push({ category: categoryName, tasks });
    });

    // Parse Suggestions
    const parsedSuggestions = suggestionsMarkdown.split('\n')
        .filter(line => line.startsWith('- ')) // Only bullet points
        .map(line => line.substring(2).trim()); // Remove bullet and trim

    return { checklist: parsedChecklist, suggestions: parsedSuggestions };
  };

  const totalSubtasks = getTotalSubtasks();
  const progressPercentage = totalSubtasks > 0 ? (completedTasksCount / totalSubtasks) * 100 : 0;
  const totalCategories = onboardingQuestions.length;
  const completedCategories = onboardingQuestions.filter((_, idx) => idx <= currentCategoryIndex).length;

  const toggleTaskExpansion = (catIndex, taskIndex) => {
    setStructuredChecklist(prevList => {
      const newList = JSON.parse(JSON.stringify(prevList));
      newList[catIndex].tasks[taskIndex].expanded = !newList[catIndex].tasks[taskIndex].expanded;
      return newList;
    });
  };


  return (
    <div className="wedding-dashboard-root">
      <header className="wedding-dashboard-header">
        <FlowerIcon />
        <div>
          <h1>AI Wedding Planner</h1>
          <p>
            {!submitted
              ? `Answer these questions to get your ultimate personalized wedding plan, from the very first thought to the big day and beyond! (Category ${currentCategoryIndex + 1} of ${totalCategories})`
              : "Onboarding complete! Your detailed checklist is below."}
          </p>
          {!submitted && (
              <div className="onboarding-progress-bar-container">
                  <div className="onboarding-progress-bar" style={{ width: `${(currentCategoryIndex / totalCategories) * 100}%` }}></div>
              </div>
          )}
        </div>
      </header>
      <main>
        {!submitted ? (
          <form className="onboarding-form" onSubmit={handleSubmit}>
            {onboardingQuestions.map((categoryGroup, index) => (
              <div key={index} className="onboarding-section"
                   onFocus={() => setCurrentCategoryIndex(index)}
                   onMouseEnter={() => setCurrentCategoryIndex(index)}
              >
                <h2>{categoryGroup.category}</h2>
                {categoryGroup.description && (
                  <p className="category-description">{categoryGroup.description}</p>
                )}
                <div className="onboarding-grid">
                  {categoryGroup.questions.map(q => (
                    <div key={q.key} className="onboarding-q">
                      <label>{q.label} {q.isRequired && <span className="required-star">*</span>}</label>
                      {q.type === "text" && (
                        <input
                          type="text"
                          placeholder={q.placeholder}
                          value={form[q.key] || ""}
                          onChange={e => handleFormChange(q.key, e.target.value)}
                        />
                      )}
                      {q.type === "number" && (
                        <input
                          type="number"
                          placeholder={q.placeholder}
                          min={0}
                          value={form[q.key] || ""}
                          onChange={e => handleFormChange(q.key, e.target.value)}
                        />
                      )}
                      {q.type === "date" && (
                        <input
                          type="date"
                          value={form[q.key] || ""}
                          onChange={e => handleFormChange(q.key, e.target.value)}
                        />
                      )}
                      {q.type === "radio" && (
                        <div className="onboarding-radio-group">
                          {q.options.map(opt => (
                            <label key={opt}>
                              <input
                                type="radio"
                                name={q.key}
                                value={opt}
                                checked={form[q.key] === opt}
                                onChange={() => handleFormChange(q.key, opt)}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                      {q.type === "textarea" && (
                        <textarea
                          placeholder={q.placeholder}
                          value={form[q.key] || ""}
                          onChange={e => handleFormChange(q.key, e.target.value)}
                          rows={4}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {index < onboardingQuestions.length - 1 && (
                  <hr className="category-divider" />
                )}
              </div>
            ))}
            {error && <p style={{ color: "red", marginTop: "1em", fontWeight: "bold" }}>{error}</p>}
            <button type="submit" className="onboarding-submit">
              Finish & Generate Detailed Checklist
            </button>
          </form>
        ) : (
          <section style={{ textAlign: "center", marginTop: 40 }}>
            <h2>Thank you, {form.names || "couple"}!</h2>
            {loading && <p>Generating your personalized wedding checklist and suggestions...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {structuredChecklist.length > 0 && !loading ? (
              <div className="checklist-display-area">
                <div className="progress-indicator">
                    <h3>Your Wedding Planning Progress: {Math.round(progressPercentage)}% Complete</h3>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p>{completedTasksCount} of {totalSubtasks} sub-tasks completed.</p>
                </div>

                {/* --- AI Suggestions Section --- */}
                {aiSuggestions.length > 0 && (
                    <div className="ai-suggestions-section">
                        <h2>AI Suggestions for an Even Better Wedding</h2>
                        <ul>
                            {aiSuggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}


                {structuredChecklist.map((categoryGroup, catIndex) => (
                  <div key={catIndex} className="checklist-category">
                    <h2>{categoryGroup.category}</h2>
                    {categoryGroup.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className={`checklist-task ${task.expanded ? 'expanded' : ''}`}>
                        <div className="task-header" onClick={() => toggleTaskExpansion(catIndex, taskIndex)}>
                            <h3>{task.title}</h3>
                            <button className="remove-task-btn" onClick={(e) => {
                                e.stopPropagation(); // Prevent toggling expansion
                                removeTask(catIndex, taskIndex, task.isAIGenerated);
                            }}>X</button>
                            <span className="expand-icon">{task.expanded ? '−' : '+'}</span>
                        </div>
                        {task.goal && <p className="task-goal">{task.goal}</p>}

                        {task.expanded && ( // Only show details if expanded
                            <>
                                {task.subtasks.length > 0 && (
                                <ul className="subtask-list">
                                    {task.subtasks.map((subtask, subtaskIndex) => (
                                    <li key={subtaskIndex}>
                                        <label>
                                        <input
                                            type="checkbox"
                                            checked={subtask.completed}
                                            onChange={() => toggleSubtaskCompletion(catIndex, taskIndex, subtaskIndex)}
                                        />
                                        <span>{subtask.text}</span>
                                        </label>
                                    </li>
                                    ))}
                                </ul>
                                )}
                                {task.tips.length > 0 && (
                                <div className="task-tips">
                                    <h4>Tips & Considerations:</h4>
                                    <ul>
                                    {task.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex}>{tip}</li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                                {task.dependencies.length > 0 && (
                                <div className="task-dependencies">
                                    <h4>Dependencies:</h4>
                                    <ul>
                                    {task.dependencies.map((dep, depIndex) => (
                                        <li key={depIndex}>{dep}</li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                                {task.estimatedCost > 0 && ( // Display estimated cost for user-added tasks
                                    <div className="task-estimated-cost">
                                        Estimated Cost: ${task.estimatedCost.toLocaleString()}
                                    </div>
                                )}
                            </>
                        )}
                      </div>
                    ))}
                    <button className="add-task-btn" onClick={() => openAddTaskModal(catIndex)}>+ Add New Task to {categoryGroup.category}</button>
                  </div>
                ))}

                {/* --- Budget Tracker Section (Uncomment and design its UI) --- */}
                <section className="budget-tracker-section">
                    <h2>Your Wedding Budget</h2>
                    <div className="budget-summary">
                        <p>Total Budget: ${budgetData.total.toLocaleString()}</p>
                        <p>Total Spent: ${budgetData.spent.toLocaleString()}</p>
                        <p>Remaining: <span style={{ color: budgetData.remaining < 0 ? 'red' : 'green' }}>${budgetData.remaining.toLocaleString()}</span></p>
                        <div className="budget-progress-bar-container">
                            <div className="budget-progress-bar" style={{ width: `${(budgetData.spent / budgetData.total) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="add-expense-form">
                        <h3>Record New Expense</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const category = e.target.elements.expenseCategory.value;
                            const amount = parseFloat(e.target.elements.expenseAmount.value);
                            const description = e.target.elements.expenseDescription.value;

                            if (isNaN(amount) || amount <= 0) {
                                alert("Please enter a valid amount.");
                                return;
                            }
                            if (!description.trim()) {
                                alert("Please enter a description for the expense.");
                                return;
                            }

                            addExpense(category, amount, description);
                            e.target.reset(); // Clear form
                        }}>
                            <select name="expenseCategory" required>
                                {Object.keys(budgetData.categories).map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                            <input type="number" name="expenseAmount" placeholder="Amount (USD)" step="0.01" required />
                            <input type="text" name="expenseDescription" placeholder="Expense Description" required />
                            <button type="submit">Add Expense</button>
                        </form>
                    </div>

                    <div className="budget-categories-detail">
                        <h3>Detailed Budget Breakdown</h3>
                        {Object.entries(budgetData.categories).map(([key, cat]) => (
                            <div key={key} className="budget-category-item">
                                <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                <p>Estimated: ${cat.estimated.toLocaleString()}</p>
                                <p>Actual: ${cat.actual.toLocaleString()}</p>
                                {cat.items.length > 0 && (
                                    <ul className="expense-list">
                                        {cat.items.map((item, idx) => (
                                            <li key={idx}>{item.description}: ${item.amount.toLocaleString()} ({new Date(item.date).toLocaleDateString()})</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                {/* --- End Budget Tracker Section --- */}

              </div>
            ) : (
              !loading && !error && (
                <p>
                  We've collected your wedding details.<br />
                  The full wedding checklist will appear here shortly.
                </p>
              )
            )}
            <button className="onboarding-submit" style={{ marginTop: 16 }} onClick={() => {
                setSubmitted(false);
                setError("");
                setForm({});
                localStorage.removeItem('weddingChecklist');
                localStorage.removeItem('weddingBudget');
                localStorage.removeItem('aiSuggestions'); // Clear suggestions
                setStructuredChecklist([]);
                setCompletedTasksCount(0);
                setAiSuggestions([]); // Reset suggestions state
                setBudgetData({
                    total: 0, spent: 0, remaining: 0,
                    categories: {
                        venue: { estimated: 0, actual: 0, items: [] }, catering: { estimated: 0, actual: 0, items: [] },
                        decor: { estimated: 0, actual: 0, items: [] }, photography: { estimated: 0, actual: 0, items: [] },
                        attire: { estimated: 0, actual: 0, items: [] }, entertainment: { estimated: 0, actual: 0, items: [] },
                        stationery: { estimated: 0, actual: 0, items: [] }, lobola: { estimated: 0, actual: 0, items: [] },
                        transport: { estimated: 0, actual: 0, items: [] }, contingency: { estimated: 0, actual: 0, items: [] },
                        other: { estimated: 0, actual: 0, items: [] },
                    },
                });
            }}>
              Plan Another Wedding / Restart
            </button>

            {/* --- Add Task Modal --- */}
            {isAddTaskModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Task to {newTask.category}</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddNewTask(); }}>
                            <label>Task Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleNewTaskChange}
                                required
                            />
                            <label>Task Goal/Brief Description:</label>
                            <textarea
                                name="goal"
                                value={newTask.goal}
                                onChange={handleNewTaskChange}
                                rows="3"
                            ></textarea>
                            <label>Estimated Cost (USD):</label>
                            <input
                                type="number"
                                name="estimatedCost"
                                value={newTask.estimatedCost}
                                onChange={handleNewTaskChange}
                                min="0"
                                step="0.01"
                                required
                            />
                            <label>Sub-steps (one per line):</label>
                            <textarea
                                name="subtasks"
                                value={newTask.subtasks.join('\n')}
                                onChange={(e) => setNewTask(prev => ({ ...prev, subtasks: e.target.value.split('\n') }))}
                                rows="5"
                                placeholder="e.g.&#10;Sub-step 1: Call vendor&#10;Sub-step 2: Get quote"
                            ></textarea>
                            <div className="modal-actions">
                                <button type="submit" className="add-task-modal-btn">Add Task</button>
                                <button type="button" className="cancel-task-modal-btn" onClick={() => setIsAddTaskModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}