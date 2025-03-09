"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { PollOption } from "./poll-option"
import { usePollVoting } from "./use-poll-voting"

export function MarketPoll() {
  const { votes, hasVoted, handleVote } = usePollVoting()

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Market Poll</h2>
          <p className="text-muted-foreground">What's your outlook on copper prices?</p>
        </div>
        <TrendingUp className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-6">
        <PollOption
          label="Bullish"
          percentage={votes.bullish}
          variant="primary"
          onClick={() => handleVote('bullish')}
          disabled={hasVoted}
        />
        <PollOption
          label="Bearish"
          percentage={votes.bearish}
          variant="destructive"
          onClick={() => handleVote('bearish')}
          disabled={hasVoted}
        />
      </div>
      {hasVoted && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Thanks for voting! Total votes: {votes.total}
        </p>
      )}
    </Card>
  )
}