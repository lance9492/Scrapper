"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { useTheme } from "next-themes"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface PriceChartProps {
  metal: string
}

export default function PriceChart({ metal }: PriceChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate realistic-looking price data based on material type
  const generatePriceData = () => {
    const basePrice = getBasePrice(metal)
    return Array.from({ length: 30 }, (_, i) => {
      const volatility = getVolatility(metal)
      const randomChange = (Math.random() - 0.5) * volatility
      return basePrice + randomChange + (Math.sin(i / 10) * volatility / 2)
    })
  }

  const data = {
    labels: Array.from({ length: 30 }, (_, i) => 
      new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA', { 
        month: 'short', 
        day: 'numeric' 
      })
    ),
    datasets: [
      {
        label: `${metal} Price`,
        data: generatePriceData(),
        borderColor: getChartColor(metal),
        backgroundColor: `${getChartColor(metal)}33`,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#111827"
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `R ${context.parsed.y.toFixed(2)} per kg`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#111827"
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        },
        ticks: {
          color: isDark ? "#e5e7eb" : "#111827",
          callback: (value: number) => `R ${value.toFixed(2)}`
        }
      }
    }
  }

  return (
    <div className="h-[300px]">
      <Line data={data} options={options} />
    </div>
  )
}

// Helper functions to generate realistic price ranges
function getBasePrice(material: string): number {
  const prices: Record<string, number> = {
    'Copper': 90,
    'Aluminum': 25,
    'Steel': 4,
    'Brass': 45,
    'Plastics': 5,
    'Used Oil': 2
  }
  return prices[material] || 10
}

function getVolatility(material: string): number {
  const volatility: Record<string, number> = {
    'Copper': 8,
    'Aluminum': 3,
    'Steel': 0.5,
    'Brass': 4,
    'Plastics': 0.8,
    'Used Oil': 0.3
  }
  return volatility[material] || 1
}

function getChartColor(material: string): string {
  const colors: Record<string, string> = {
    'Copper': '#D2691E',
    'Aluminum': '#848789',
    'Steel': '#71797E',
    'Brass': '#B5A642',
    'Plastics': '#4682B4',
    'Used Oil': '#2F4F4F'
  }
  return colors[material] || '#666666'
}