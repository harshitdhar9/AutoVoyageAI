"use client"

import { useEffect, useState, useRef } from "react"
import { Sun, Moon, Send, Plus, ExternalLink, Download } from "lucide-react"
import "./globals.css"

const DEFAULT_PROMPT = "Plan a 5 day trip to Jaipur under 10k"

const TRAINS = ["Mandore Express", "Jaipur Intercity", "Ajmer Shatabdi"]
const HOTELS = [
  "Hotel Arya Niwas",
  "Hotel Pearl Palace",
  "Hotel Umaid Bhawan",
  "Hotel Kalyan",
]

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

export default function Home() {
  const [dark, setDark] = useState(false)
  const [input, setInput] = useState(DEFAULT_PROMPT)

  const [stage, setStage] = useState<"idle" | "processing" | "done">("idle")
  const [currentStep, setCurrentStep] = useState(0)

  const [trainReveal, setTrainReveal] = useState(0)
  const [hotelReveal, setHotelReveal] = useState(0)

  const [selectedTrain, setSelectedTrain] = useState("Jaipur Intercity")
  const [selectedHotel, setSelectedHotel] = useState("Hotel Arya Niwas")

  const [showEditPrompt, setShowEditPrompt] = useState(false)

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
              <h2>What’s on your mind today?</h2>

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
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    {currentStep >= 2 && (
                      <p className="selected">
                        Selected: {selectedTrain}
                      </p>
                    )}
                  </div>
                )}

                {currentStep >= 3 && (
                  <div className="step active">
                    ✓ Comparing hotels
                    <ul>
                      {HOTELS.slice(0, hotelReveal).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    {currentStep >= 4 && (
                      <p className="selected">
                        Selected: {selectedHotel}
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

              {/* SUMMARY */}
              <div className="trip-summary">
                <p>
                  <strong>Transport:</strong> {selectedTrain}
                  <a
                    href="https://www.irctc.co.in"
                    target="_blank"
                    className="booking-link"
                  >
                    Book <ExternalLink size={14} />
                  </a>
                </p>

                <p>
                  <strong>Hotel:</strong> {selectedHotel}
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

                <p>
                  <strong>Estimated Budget:</strong> ₹9300
                </p>
              </div>

              {/* ALTERNATIVES */}
              <div className="alternatives">
                <h4>Other Stay Options</h4>

                {HOTELS.filter((h) => h !== selectedHotel).map((h) => (
                  <button
                    key={h}
                    className="alt-option"
                    onClick={() => setSelectedHotel(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* TIMELINE */}
              <div className="timeline">

                <TimelineDay
                  color="day-blue"
                  title="Day 1 – Travel & Arrival"
                  lines={[
                    `🚆 ${selectedTrain}`,
                    `🏨 Stay at ${selectedHotel}`,
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
