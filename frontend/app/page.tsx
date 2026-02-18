"use client"
import { useEffect, useState, useRef } from "react"
import { Sun, Moon, Send, Plus, ExternalLink, Download, Sparkles } from "lucide-react"
import "./globals.css"

const DEFAULT_PROMPT = "Plan a 5 day trip to Jaipur under 10k"

const TRAINS = [
  { name: "Mandore Express", price: 450 },
  { name: "Jaipur Intercity", price: 380 },
  { name: "Ajmer Shatabdi", price: 520 }
]

const HOTELS = [
  { name: "Hotel Arya Niwas", price: 1200, perNight: true },
  { name: "Hotel Pearl Palace", price: 1400, perNight: true },
  { name: "Hotel Umaid Bhawan", price: 1800, perNight: true },
  { name: "Hotel Kalyan", price: 1000, perNight: true },
]

const OTHER_EXPENSES = {
  food: { daily: 400, total: 2000, description: "Street food & restaurants" },
  cityTravel: { daily: 150, total: 750, description: "Auto, metro, taxi" },
  sightseeing: { total: 800, description: "Entry tickets & guides" },
  shopping: { total: 500, description: "Souvenirs & local items" }
}

const STEPS = [
  "Evaluating travel options",
  "Selecting transport",
  "Comparing hotels",
  "Selecting stay",
  "Planning food experiences",
  "Designing sightseeing plan",
  "Checking weather conditions",
  "Analyzing crowd patterns",
  "Preparing packing suggestions",
]

const SMART_SUGGESTIONS = [
  {
    icon: "💡",
    type: "Cost Saving",
    title: "Book train tickets now",
    description: "Prices are expected to increase by 15% next week",
    action: "View Tickets",
    priority: "high"
  },
  {
    icon: "🌤️",
    type: "Weather Alert",
    title: "Pack light layers",
    description: "Temperature varies 10°C between morning and afternoon",
    action: "See Packing List",
    priority: "medium"
  },
  {
    icon: "⏰",
    type: "Timing Tip",
    title: "Visit Amer Fort early",
    description: "Crowds 60% lower before 9 AM, temperatures cooler",
    action: "Adjust Schedule",
    priority: "medium"
  },
  {
    icon: "🎫",
    type: "Experience",
    title: "Pre-book palace combo ticket",
    description: "Save ₹350 with online City Palace + Hawa Mahal pass",
    action: "Book Now",
    priority: "high"
  },
  {
    icon: "🍽️",
    type: "Local Insight",
    title: "Try Lassiwala",
    description: "Iconic lassi spot near Hawa Mahal - ₹50, rated 4.8/5",
    action: "Add to Plan",
    priority: "low"
  },
  {
    icon: "📱",
    type: "Smart Tip",
    title: "Download offline maps",
    description: "Old city areas have spotty connectivity",
    action: "Get Maps",
    priority: "medium"
  }
]

export default function Home() {
  const [dark, setDark] = useState(false)
  const [input, setInput] = useState(DEFAULT_PROMPT)

  const [stage, setStage] = useState<"idle" | "processing" | "done">("idle")
  const [currentStep, setCurrentStep] = useState(0)

  const [trainReveal, setTrainReveal] = useState(0)
  const [hotelReveal, setHotelReveal] = useState(0)

  const [selectedTrain, setSelectedTrain] = useState(TRAINS[1])
  const [selectedHotel, setSelectedHotel] = useState(HOTELS[0])

  const [showEditPrompt, setShowEditPrompt] = useState(false)
  const [dismissedSuggestions, setDismissedSuggestions] = useState<number[]>([])
  const [showAllSuggestions, setShowAllSuggestions] = useState(false)

  const timers = useRef<NodeJS.Timeout[]>([])

  /* ---------------- THEME ---------------- */

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
    setDark(!dark)
    localStorage.setItem("theme", !dark ? "dark" : "light")
  }

  /* ---------------- AGENT SIM ---------------- */

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const startAgent = () => {
    if (!input.trim()) return

    clearTimers()

    setStage("processing")
    setCurrentStep(0)
    setTrainReveal(0)
    setHotelReveal(0)
    setDismissedSuggestions([])

    STEPS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setCurrentStep(i + 1)

          if (i === STEPS.length - 1) {
            setTimeout(() => setStage("done"), 1500)
          }
        }, (i + 1) * 2200)
      )
    })

    TRAINS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setTrainReveal(i + 1), 900 + i * 1500)
      )
    })

    HOTELS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setHotelReveal(i + 1), 6000 + i * 1500)
      )
    })
  }

  const dismissSuggestion = (index: number) => {
    setDismissedSuggestions([...dismissedSuggestions, index])
  }

  const activeSuggestions = SMART_SUGGESTIONS.filter(
    (_, index) => !dismissedSuggestions.includes(index)
  )

  const displayedSuggestions = showAllSuggestions 
    ? activeSuggestions 
    : activeSuggestions.slice(0, 3)

  // Calculate total budget
  const calculateBudget = () => {
    const trainCost = selectedTrain.price * 2 // Round trip
    const hotelCost = selectedHotel.price * 4 // 4 nights
    const foodCost = OTHER_EXPENSES.food.total
    const travelCost = OTHER_EXPENSES.cityTravel.total
    const sightseeingCost = OTHER_EXPENSES.sightseeing.total
    const shoppingCost = OTHER_EXPENSES.shopping.total
    
    return {
      train: trainCost,
      hotel: hotelCost,
      food: foodCost,
      travel: travelCost,
      sightseeing: sightseeingCost,
      shopping: shoppingCost,
      total: trainCost + hotelCost + foodCost + travelCost + sightseeingCost + shoppingCost
    }
  }

  const budget = calculateBudget()

  /* ---------------- UI ---------------- */

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <button className="icon-btn">✈️</button>
        <button className="icon-btn">
          <Plus size={18} />
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* BRAND */}
        <div className="brand-header">
          <h1 className="brand-title metal-gradient-text">
            Autovoyage AI
          </h1>
          <p className="brand-sub">
            Intelligent Travel Planning Agent
          </p>
        </div>

        {/* TOP RIGHT */}
        <div className="top-right">
          <button onClick={toggleTheme} className="icon-btn">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="avatar">S</div>
        </div>

        {/* CENTER */}
        <div className="center">

          {/* IDLE */}
          {stage === "idle" && (
            <>
              <h2>What's on your mind today?</h2>

              <div className="prompt">
                <Plus size={18} className="muted" />

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button className="send" onClick={startAgent}>
                  <Send size={16} />
                </button>
              </div>
            </>
          )}

          {/* PROCESSING */}
          {stage === "processing" && (
            <>
              <h2>Preparing your itinerary...</h2>

              <div className="steps">

                {currentStep >= 1 && (
                  <div className="step active">
                    ✓ Evaluating travel options
                    <ul>
                      {TRAINS.slice(0, trainReveal).map((t) => (
                        <li key={t.name}>
                          {t.name} - ₹{t.price} (one way)
                        </li>
                      ))}
                    </ul>

                    {currentStep >= 2 && (
                      <p className="selected">
                        Selected: {selectedTrain.name} - ₹{selectedTrain.price * 2} (round trip)
                      </p>
                    )}
                  </div>
                )}

                {currentStep >= 3 && (
                  <div className="step active">
                    ✓ Comparing hotels
                    <ul>
                      {HOTELS.slice(0, hotelReveal).map((h) => (
                        <li key={h.name}>
                          {h.name} - ₹{h.price}/night
                        </li>
                      ))}
                    </ul>

                    {currentStep >= 4 && (
                      <p className="selected">
                        Selected: {selectedHotel.name} - ₹{selectedHotel.price}/night
                      </p>
                    )}
                  </div>
                )}

                {currentStep >= 5 && (
                  <div className="step active">
                    ✓ Planning food experiences
                  </div>
                )}

                {currentStep >= 6 && (
                  <div className="step active">
                    ✓ Designing sightseeing plan
                  </div>
                )}

                {currentStep >= 7 && (
                  <div className="step active">
                    ✓ Checking weather conditions
                  </div>
                )}

                {currentStep >= 8 && (
                  <div className="step active">
                    ✓ Analyzing crowd patterns
                  </div>
                )}

                {currentStep >= 9 && (
                  <div className="step active">
                    ✓ Preparing packing suggestions
                  </div>
                )}
              </div>
            </>
          )}

          {/* DONE */}
          {stage === "done" && (
            <>
              <h2>Your Jaipur Journey</h2>

              {/* JAIPUR IMAGE */}
              <div className="destination-image">
                <img 
                  src="/Amber-fort-jaipur-Rajasthan-India.jpg" 
                  alt="Jaipur City" 
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              {/* SMART SUGGESTIONS */}
              <div className="smart-suggestions-container">
                <div className="suggestions-header">
                  <Sparkles size={18} className="sparkle-icon" />
                  <h3>Smart Suggestions</h3>
                  <span className="suggestions-count">
                    {activeSuggestions.length} insights
                  </span>
                </div>

                <div className="suggestions-grid">
                  {displayedSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`suggestion-card priority-${suggestion.priority}`}
                    >
                      <button 
                        className="dismiss-btn"
                        onClick={() => dismissSuggestion(SMART_SUGGESTIONS.indexOf(suggestion))}
                        aria-label="Dismiss"
                      >
                        ×
                      </button>
                      
                      <div className="suggestion-icon">{suggestion.icon}</div>
                      
                      <div className="suggestion-content">
                        <div className="suggestion-type">{suggestion.type}</div>
                        <h4>{suggestion.title}</h4>
                        <p>{suggestion.description}</p>
                      </div>

                      <button className="suggestion-action">
                        {suggestion.action} →
                      </button>
                    </div>
                  ))}
                </div>

                {activeSuggestions.length > 3 && (
                  <button 
                    className="show-more-suggestions"
                    onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                  >
                    {showAllSuggestions 
                      ? "Show Less" 
                      : `Show ${activeSuggestions.length - 3} More Suggestions`}
                  </button>
                )}
              </div>

              {/* BUDGET BREAKDOWN */}
              <div className="budget-breakdown">
                <h3>💰 Budget Breakdown</h3>
                
                <div className="budget-items">
                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🚆</span>
                      <span>Transport ({selectedTrain.name})</span>
                    </div>
                    <span className="budget-amount">₹{budget.train}</span>
                  </div>

                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🏨</span>
                      <span>Hotel (4 nights @ ₹{selectedHotel.price}/night)</span>
                    </div>
                    <span className="budget-amount">₹{budget.hotel}</span>
                  </div>

                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🍽️</span>
                      <span>Food (₹{OTHER_EXPENSES.food.daily}/day)</span>
                    </div>
                    <span className="budget-amount">₹{budget.food}</span>
                  </div>

                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🚕</span>
                      <span>City Travel (₹{OTHER_EXPENSES.cityTravel.daily}/day)</span>
                    </div>
                    <span className="budget-amount">₹{budget.travel}</span>
                  </div>

                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🎫</span>
                      <span>Sightseeing & Entry Tickets</span>
                    </div>
                    <span className="budget-amount">₹{budget.sightseeing}</span>
                  </div>

                  <div className="budget-item">
                    <div className="budget-label">
                      <span className="budget-icon">🛍️</span>
                      <span>Shopping & Souvenirs</span>
                    </div>
                    <span className="budget-amount">₹{budget.shopping}</span>
                  </div>
                </div>

                <div className="budget-total">
                  <span>Total Estimated Cost</span>
                  <span className="total-amount">₹{budget.total}</span>
                </div>

                {budget.total <= 10000 && (
                  <div className="budget-status success">
                    ✓ Within your ₹10,000 budget!
                  </div>
                )}

                {budget.total > 10000 && (
                  <div className="budget-status warning">
                    ⚠️ ₹{budget.total - 10000} over budget. Consider adjusting options.
                  </div>
                )}
              </div>

              {/* SUMMARY */}
              <div className="trip-summary">
                <p>
                  <strong>Transport:</strong> {selectedTrain.name} (₹{selectedTrain.price} × 2)
                  <a
                    href="https://www.irctc.co.in"
                    target="_blank"
                    className="booking-link"
                  >
                    Book <ExternalLink size={14} />
                  </a>
                </p>

                <p>
                  <strong>Hotel:</strong> {selectedHotel.name} (₹{selectedHotel.price}/night)
                  <a
                    href="https://www.booking.com"
                    target="_blank"
                    className="booking-link"
                  >
                    View <ExternalLink size={14} />
                  </a>
                </p>

                <p>
                  <strong>Weather:</strong> Sunny, 29-33°C
                </p>
              </div>

              {/* ALTERNATIVES */}
              <div className="alternatives">
                <h4>Other Stay Options</h4>

                {HOTELS.filter((h) => h.name !== selectedHotel.name).map((h) => (
                  <button
                    key={h.name}
                    className="alt-option"
                    onClick={() => setSelectedHotel(h)}
                  >
                    {h.name} - ₹{h.price}/night
                  </button>
                ))}
              </div>

              {/* TIMELINE */}
              <div className="timeline">

                <TimelineDay
                  color="day-blue"
                  title="Day 1 – Travel & Arrival"
                  lines={[
                    `🚆 ${selectedTrain.name}`,
                    `🏨 Stay at ${selectedHotel.name}`,
                    "🍛 Dinner at Rawat Mishtan",
                  ]}
                />

                <TimelineDay
                  color="day-green"
                  title="Day 2 – Heritage Exploration"
                  lines={[
                    "🏰 Amer Fort",
                    "🌇 Nahargarh Sunset",
                  ]}
                />

                <TimelineDay
                  color="day-purple"
                  title="Day 3 – Culture & Architecture"
                  lines={[
                    "🕌 City Palace",
                    "📸 Hawa Mahal",
                  ]}
                />

                <TimelineDay
                  color="day-orange"
                  title="Day 4 – Markets & Food"
                  lines={[
                    "🛍 Johari Bazaar",
                    "🍢 Street Food Exploration",
                  ]}
                />

                <TimelineDay
                  color="day-pink"
                  title="Day 5 – Departure"
                  lines={[
                    "☕ Breakfast & Checkout",
                    "🚆 Return Journey",
                  ]}
                />

              </div>

              {/* ACTIONS */}
              <button className="download">
                <Download size={16} /> Download as PDF
              </button>

              <div className="action-buttons">
                <button
                  className="secondary-btn"
                  onClick={() => setShowEditPrompt(true)}
                >
                  Modify Plan
                </button>
              </div>

              {showEditPrompt && (
                <div className="prompt edit-prompt">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <button
                    className="send"
                    onClick={() => {
                      setShowEditPrompt(false)
                      startAgent()
                    }}
                  >
                    Regenerate
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

/* -------- Timeline Component -------- */

function TimelineDay({
  color,
  title,
  lines,
}: {
  color: string
  title: string
  lines: string[]
}) {
  return (
    <div className="timeline-item">
      <div className="dot" />

      <div className={`day-card ${color}`}>
        <h3>{title}</h3>

        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  )
}