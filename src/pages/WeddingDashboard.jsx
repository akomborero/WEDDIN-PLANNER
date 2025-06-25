import React, { useState, useEffect } from 'react';
import './WeddingDashboard.css';

function WeddingDashboard() {
  const [weddingDate, setWeddingDate] = useState('');
  const [userBudget, setUserBudget] = useState(''); // Store as string initially from input

  // Updated state to group checklist items
  const [planningGroups, setPlanningGroups] = useState([
    // IMPORTANT: The 'estimatedPrice' values are illustrative examples only.
    // For accurate budgeting, you MUST research and input current, real-world prices
    // from Zimbabwean vendors (Harare, Bulawayo, etc.) into the editable fields below.

    {
      id: 'group-1',
      name: '1. Initial Planning & Engagement',
      items: [
        { id: 101, task: "Set Wedding Date & Time", estimatedPrice: 0, isCompleted: false },
        { id: 102, task: "Estimate Guest Count (Initial)", estimatedPrice: 0, isCompleted: false },
        { id: 103, task: "Draft Overall Wedding Budget", estimatedPrice: 0, isCompleted: false },
        { id: 104, task: "Choose Wedding Party (Bridesmaids/Groomsmen)", estimatedPrice: 0, isCompleted: false },
        { id: 105, task: "Research & Book Wedding Planner/Coordinator", estimatedPrice: 1500, isCompleted: false }, // Example: Full-service planner in Zim
        { id: 106, task: "Plan & Host Engagement Party (Optional)", estimatedPrice: 700, isCompleted: false },
        { id: 107, task: "Consider Wedding Insurance (Optional)", estimatedPrice: 200, isCompleted: false },
        { id: 108, task: "Traditional Roora/Lobola Ceremony Planning (if applicable)", estimatedPrice: 0, isCompleted: false }, // Placeholder for cultural planning
      ]
    },
    {
      id: 'group-2',
      name: '2. Venue & Catering',
      items: [
        { id: 201, task: "Select & Book Ceremony Venue", estimatedPrice: 2000, isCompleted: false },
        { id: 202, task: "Select & Book Reception Venue", estimatedPrice: 5000, isCompleted: false },
        { id: 203, task: "Choose Caterer & Finalize Menu (e.g., 100 guests @ $45/person)", estimatedPrice: 4500, isCompleted: false },
        { id: 204, task: "Arrange Beverages/Bar Service (e.g., 100 guests @ $12/person)", estimatedPrice: 1200, isCompleted: false },
        { id: 205, task: "Order Wedding Cake", estimatedPrice: 600, isCompleted: false },
        { id: 206, task: "Tableware, Glassware, Cutlery Rentals", estimatedPrice: 300, isCompleted: false },
      ]
    },
    {
      id: 'group-3',
      name: '3. Attire & Appearance',
      items: [
        { id: 301, task: "Choose & Purchase Wedding Dress", estimatedPrice: 1800, isCompleted: false },
        { id: 302, task: "Select & Purchase Groom's Attire", estimatedPrice: 400, isCompleted: false },
        { id: 303, task: "Book Hair Stylist & Makeup Artist", estimatedPrice: 250, isCompleted: false },
        { id: 304, task: "Choose Wedding Rings", estimatedPrice: 1000, isCompleted: false },
        { id: 305, task: "Purchase Wedding Accessories (shoes, veil, jewelry)", estimatedPrice: 300, isCompleted: false },
      ]
    },
    {
      id: 'group-4',
      name: '4. Photography & Videography',
      items: [
        { id: 401, task: "Book Photographer", estimatedPrice: 1500, isCompleted: false },
        { id: 402, task: "Book Videographer", estimatedPrice: 1200, isCompleted: false },
        { id: 403, task: "Engagement Shoot (Optional)", estimatedPrice: 300, isCompleted: false },
      ]
    },
    {
      id: 'group-5',
      name: '5. Decor, Flowers & Rentals',
      items: [
        { id: 501, task: "Select & Order Flowers", estimatedPrice: 700, isCompleted: false },
        { id: 502, task: "Choose Decorations & Styling", estimatedPrice: 1000, isCompleted: false },
        { id: 503, task: "Rent Ceremony & Reception Furniture (chairs, tables, arches)", estimatedPrice: 600, isCompleted: false },
        { id: 504, task: "Arrange Lighting (Fairy lights, Uplighting etc.)", estimatedPrice: 300, isCompleted: false },
        { id: 505, task: "Consider Draping & Linens", estimatedPrice: 400, isCompleted: false },
      ]
    },
    {
      id: 'group-6',
      name: '6. Music & Entertainment',
      items: [
        { id: 601, task: "Book DJ or Live Band", estimatedPrice: 800, isCompleted: false },
        { id: 602, task: "Arrange Additional Live Entertainment (e.g., traditional performers)", estimatedPrice: 500, isCompleted: false },
        { id: 603, task: "Ceremony Musicians (e.g., choir, violinist)", estimatedPrice: 200, isCompleted: false },
      ]
    },
    {
      id: 'group-7',
      name: '7. Stationery & Documentation',
      items: [
        { id: 701, task: "Design & Send Save-the-Dates", estimatedPrice: 150, isCompleted: false },
        { id: 702, task: "Design & Send Invitations", estimatedPrice: 300, isCompleted: false },
        { id: 703, task: "Order Thank You Cards", estimatedPrice: 80, isCompleted: false },
        { id: 704, task: "Secure Wedding Officiant/Pastor", estimatedPrice: 150, isCompleted: false },
        { id: 705, task: "Obtain Marriage License/Certificates", estimatedPrice: 70, isCompleted: false },
        { id: 706, task: "Guest Book or Alternative", estimatedPrice: 50, isCompleted: false },
        { id: 707, task: "Menu Cards & Place Cards", estimatedPrice: 100, isCompleted: false },
      ]
    },
    {
      id: 'group-8',
      name: '8. Transportation & Accommodation',
      items: [
        { id: 801, task: "Arrange Wedding Day Transportation (Couple & Bridal Party)", estimatedPrice: 350, isCompleted: false },
        { id: 802, task: "Arrange Guest Transportation (Optional)", estimatedPrice: 400, isCompleted: false },
        { id: 803, task: "Book Honeymoon (Optional)", estimatedPrice: 3000, isCompleted: false },
        { id: 804, task: "Accommodation for Wedding Night/Guests (Optional)", estimatedPrice: 200, isCompleted: false },
      ]
    },
    {
      id: 'group-9',
      name: '9. Miscellaneous & Personal Touches',
      items: [
        { id: 901, task: "Purchase Wedding Favors (e.g., 100 guests @ $3/person)", estimatedPrice: 300, isCompleted: false },
        { id: 902, task: "Consider Pre-marital Counseling (Optional)", estimatedPrice: 150, isCompleted: false },
        { id: 903, task: "Allocate Tips & Gratuities for Vendors", estimatedPrice: 400, isCompleted: false },
        { id: 904, task: "Hair, Nail & Skin Prep for Wedding Party", estimatedPrice: 200, isCompleted: false },
        { id: 905, task: "Welcome Bags for Out-of-Town Guests", estimatedPrice: 150, isCompleted: false },
        { id: 906, task: "Contingency Fund (10% of total budget)", estimatedPrice: 0, isCompleted: false },
      ]
    }
  ]);

  // Flatten all items from groups for calculations
  const allItems = planningGroups.flatMap(group => group.items);

  // Calculate total estimated budget (for all items on the list)
  const totalEstimatedBudget = allItems.reduce((sum, item) => sum + item.estimatedPrice, 0);

  // Calculate estimated budget for tasks currently marked as 'completed'
  const completedItemsBudget = allItems.reduce((sum, item) =>
    item.isCompleted ? sum + item.estimatedPrice : sum, 0
  );

  // Calculate days remaining until wedding
  const today = new Date();
  const weddingDateObj = weddingDate ? new Date(weddingDate) : null;
  const timeDiff = weddingDateObj ? weddingDateObj.getTime() - today.getTime() : 0;
  const daysRemaining = weddingDateObj && timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;

  // Update contingency fund based on calculated total (excluding contingency itself)
  useEffect(() => {
    setPlanningGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === 'group-9') { // Assuming Contingency Fund is in group-9 (Miscellaneous)
          const updatedItems = group.items.map(item => {
            if (item.task.includes("Contingency Fund")) {
              const baseBudget = allItems.filter(i => !i.task.includes("Contingency Fund")).reduce((sum, i) => sum + i.estimatedPrice, 0);
              return { ...item, estimatedPrice: Math.round(baseBudget * 0.10) };
            }
            return item;
          });
          return { ...group, items: updatedItems };
        }
        return group;
      });
    });
  }, [totalEstimatedBudget]); // Recalculate if the total estimated budget changes

  // Handler for when a checkbox is clicked
  const handleCheckboxChange = (groupId, itemId) => {
    setPlanningGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map(item =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
              ),
            }
          : group
      )
    );
  };

  // Handler for estimated price input change
  const handlePriceChange = (groupId, itemId, newPrice) => {
    setPlanningGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map(item =>
                item.id === itemId ? { ...item, estimatedPrice: parseFloat(newPrice) || 0 } : item
              ),
            }
          : group
      )
    );
  };

  return (
    <div className="wedding-dashboard-page">
      <header className="dashboard-header">
        <h1>Your Personalized Wedding Planning Checklist</h1>
        <p>Mark off tasks as you complete them, track your budget, and count down to your big day!</p>
      </header>

      <main className="dashboard-main-content">
        {/* User Inputs & High-Level Summary */}
        <section className="dashboard-section user-inputs-summary">
            <h2>Your Wedding Overview</h2>
            <div className="input-group">
                <label htmlFor="wedding-date">Wedding Date:</label>
                <input
                  type="date"
                  id="wedding-date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
                {weddingDate && daysRemaining > 0 && (
                    <p className="days-countdown">
                        **{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} to go!**
                    </p>
                )}
                {weddingDateObj && weddingDateObj < today && (
                    <p className="days-countdown past-date">
                        Wedding date has passed. Congratulations!
                    </p>
                )}
            </div>
            <div className="input-group">
                <label htmlFor="user-budget">Your Overall Budget ($):</label>
                <input
                  type="number"
                  id="user-budget"
                  value={userBudget}
                  onChange={(e) => setUserBudget(e.target.value)}
                  placeholder="e.g., 15000"
                  min="0"
                />
            </div>
            <div className="budget-comparison">
                <p>Total Estimated Wedding Cost: <strong>${totalEstimatedBudget.toLocaleString()}</strong></p>
                <p>Cost of Completed Tasks: <strong>${completedItemsBudget.toLocaleString()}</strong></p>
                {userBudget && (
                    <>
                        <p>Remaining Budget: <strong className={userBudget - totalEstimatedBudget < 0 ? 'budget-over' : 'budget-under'}>${(userBudget - totalEstimatedBudget).toLocaleString()}</strong></p>
                        {userBudget - totalEstimatedBudget < 0 && (
                            <p className="budget-alert">You are currently **over budget** based on estimated costs! Time to re-evaluate!</p>
                        )}
                    </>
                )}
                <p className="note">
                    *(The prices below are **illustrative examples**. Please research and input **real-world prices from Zimbabwean vendors** into the editable fields for accurate budgeting.)*
                </p>
            </div>
        </section>

        {/* Comprehensive Planning Checklist Section - Now grouped */}
        <section className="dashboard-section planning-checklist-section">
          <h2><i className="fas fa-list-check"></i> Your Comprehensive Checklist</h2>
          {planningGroups.map(group => (
            <div key={group.id} className="checklist-group">
              <h3>{group.name}</h3>
              <ul className="wedding-checklist">
                {group.items.map(item => (
                  <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleCheckboxChange(group.id, item.id)}
                      />
                      <span className="task-text">{item.task}</span>
                    </label>
                    <span className="price-input-wrapper">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        value={item.estimatedPrice}
                        onChange={(e) => handlePriceChange(group.id, item.id, e.target.value)}
                        className="estimated-price-input"
                        min="0"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default WeddingDashboard;