"use client"
import CountdownTimer from "./components/countdown-timer"

import { useState } from "react"

export default function Home() {
  const [targetTimestamp, setTargetTimestamp] = useState<Date | null>(null);
  
  function start() {
    const targetTimestamp = document.getElementById("target-timestamp") as HTMLInputElement
    setTargetTimestamp(new Date(targetTimestamp.value))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <input type="datetime-local" id="target-timestamp" className="text-black" />
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={start}>
          Start
        </button>

        <CountdownTimer timestamp={targetTimestamp} />
      </div>
    </main>
  )
}
