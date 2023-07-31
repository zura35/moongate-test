import { useState, useEffect } from "react"

export default function CountdownTimer({ timestamp }: { timestamp: Date | null }) {
  const [timeLeft, setTimeLeft] = useState<string>("No timestamp set")
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }

    if (timestamp) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = timestamp.getTime() - now.getTime()

        if (diff <= 0) {
          setTimeLeft("Time's up!")
          return
        }

        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        const timeLeft = `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
        
        setTimeLeft(timeLeft)
      }, 1000)

      setIntervalId(timer)
    }
  }, [timestamp])

  return (
    <div>
      { timeLeft }
    </div>
  )
}