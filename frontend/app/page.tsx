"use client"

import { useEffect, useState } from "react"
import { Sun, Moon, Send, Plus, Download, ExternalLink } from "lucide-react"
import "./globals.css"

const TRAINS = [
  "Mandore Express",
  "Jaipur Intercity",
  "Ajmer Shatabdi",
]

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
]

export default function Home() {
  const [dark, setDark] = useState(false)
  const [input, setInput] = useState("")
  const [stage, setStage] = useState<"idle" | "processing" | "done">("idle")
  const [currentStep, setCurrentStep] = useState(0)

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

  const startAgent = () => {
    if (!input.trim()) return

    setStage("processing")
    setCurrentStep(0)

    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setCurrentStep(i + 1)

        if (i === STEPS.length - 1) {
          setTimeout(() => setStage("done"), 1200)
        }
      }, (i + 1) * 2200)
    })
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <button className="icon-btn">✈️</button>
        <button className="icon-btn">
          <Plus size={18} />
        </button>
      </aside>

      <main className="main">
        <div className="top-right">
          <button onClick={toggleTheme} className="icon-btn">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="avatar">S</div>
        </div>

        <div className="center">

          {stage === "idle" && (
            <>
              <h1>What’s on your mind today?</h1>

              <div className="prompt">
                <Plus size={18} className="muted" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Plan a 5 day trip to Jaipur under 10k"
                />
                <button className="send" onClick={startAgent}>
                  <Send size={16} />
                </button>
              </div>
            </>
          )}

          {stage === "processing" && (
            <>
              <h1>Autovoyage is preparing your itinerary...</h1>

              <div className="steps">
                {currentStep >= 1 && (
                  <div className="step active">
                    {currentStep >= 1 ? "✓" : "⏳"} Evaluating travel options

                    <ul className="option-list">
                      {TRAINS.map((train) => (
                        <li key={train}>{train}</li>
                      ))}
                    </ul>

                    {currentStep >= 2 && (
                      <p className="selected">Selected: Jaipur Intercity</p>
                    )}
                  </div>
                )}

                {currentStep >= 3 && (
                  <div className="step active">
                    {currentStep >= 3 ? "✓" : "⏳"} Comparing hotels

                    <ul className="option-list">
                      {HOTELS.map((hotel) => (
                        <li key={hotel}>{hotel}</li>
                      ))}
                    </ul>

                    {currentStep >= 4 && (
                      <p className="selected">Selected: Hotel Arya Niwas</p>
                    )}
                  </div>
                )}

                {currentStep >= 5 && (
                  <div className="step active">
                    ✓ Planning food experiences
                    <ul className="option-list">
                      <li> Rawat Mishtan Bhandar</li>
                      <li> LMB Restaurant</li>
                      <li> Street Food near Hawa Mahal</li>
                    </ul>
                  </div>
                )}

                {currentStep >= 6 && (
                  <div className="step active">
                    ✓ Designing sightseeing plan
                    <ul className="option-list">
                      <li> Amer Fort</li>
                      <li> Hawa Mahal</li>
                      <li> City Palace</li>
                      <li> Nahargarh Fort</li>
                    </ul>
                  </div>
                )}

              </div>
            </>
          )}
          {stage === "done" && (
            <>
              <h1>Your Trip Itinerary</h1>

              <div className="output">

                <p><strong>Destination:</strong> Jaipur (5 Days)</p>

                <p>
                  <strong>Mode of Transport:</strong> Jaipur Intercity Train  
                  <a href="https://www.irctc.co.in" target="_blank" className="booking-link">
                    Book Ticket <ExternalLink size={14} />
                  </a>
                </p>

                <p>
                  <strong>Hotel:</strong> Hotel Arya Niwas  
                  <a href="https://www.booking.com" target="_blank" className="booking-link">
                    View & Book <ExternalLink size={14} />
                  </a>
                </p>

                <p><strong>Food Options:</strong></p>
                <ul>
                  <li>Rawat Mishtan Bhandar</li>
                  <li>LMB Restaurant</li>
                  <li>Street Food near Hawa Mahal</li>
                </ul>

                <p><strong>Sightseeing:</strong></p>
                <ul>
                  <li>Amer Fort</li>
                  <li>Hawa Mahal</li>
                  <li>City Palace</li>
                  <li>Nahargarh Fort</li>
                </ul>

                <p><strong>Estimated Budget:</strong> ₹9300</p>
              </div>

              <button className="download">
                <Download size={16} /> Download as PDF
              </button>
            </>
          )}

        </div>
      </main>
    </div>
  )
}
