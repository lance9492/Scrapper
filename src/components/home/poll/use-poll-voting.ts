"use client"

import { useState, useEffect } from "react"

interface PollVotes {
  bullish: number
  bearish: number
  total: number
}

export function usePollVoting() {
  const [votes, setVotes] = useState<PollVotes>(() => {
    // Initialize with some realistic starting data
    return {
      bullish: 65,
      bearish: 35,
      total: 842
    }
  })
  
  const [hasVoted, setHasVoted] = useState(false)

  // Check if user has already voted
  useEffect(() => {
    const voted = localStorage.getItem('market-poll-voted')
    if (voted) {
      setHasVoted(true)
    }
  }, [])

  const handleVote = (option: 'bullish' | 'bearish') => {
    if (hasVoted) return

    setVotes(prev => {
      const newTotal = prev.total + 1
      const newVotes = {
        bullish: option === 'bullish' 
          ? Math.round((prev.bullish * prev.total + 100) / newTotal) 
          : Math.round((prev.bullish * prev.total) / newTotal),
        bearish: option === 'bearish'
          ? Math.round((prev.bearish * prev.total + 100) / newTotal)
          : Math.round((prev.bearish * prev.total) / newTotal),
        total: newTotal
      }
      return newVotes
    })

    setHasVoted(true)
    localStorage.setItem('market-poll-voted', 'true')
  }

  return {
    votes,
    hasVoted,
    handleVote
  }
}