import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import tinycolor from 'tinycolor2'

// interface Props {
//   completedTasks: number
//   totalTasks: number
// }

const CompletedTasksBarChart = ({ completedTasks, totalTasks }) => {
  const chartRef = useRef(null)

  const generateColor = () => {
    // Generate a random hue value between 0 and 360
    const hue = Math.floor(Math.random() * 91) + 150
    // Set a fixed saturation value of 50%
    const saturation = 50
    // Set a fixed lightness value of 50%
    const lightness = 50
    // Convert the HSL values to an RGB color string
    const color = `hsl(${hue},${saturation}%,${lightness}%)`
    return tinycolor(color).toHexString()
  }
  const randomColor = generateColor()
  const colors = tinycolor(randomColor).analogous()

  const colorsHex = colors.map(function (t) {
    return t.toHexString()
  })

  colorsHex[0] = tinycolor(colorsHex[0]).darken(15).toString()

  useEffect(() => {
    const chartData = {
      labels: [''],
      datasets: [
        {
          label: 'Completed Tasks',
          data: [(completedTasks / totalTasks) * 100],
          backgroundColor: colorsHex[0],
        },
        {
          label: 'Total Tasks',
          data: [100 - (completedTasks / totalTasks) * 100],
          backgroundColor: colorsHex[2],
        },
      ],
    }

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,

      options: {
        indexAxis: 'y',
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label
                // console.log(context.dataset.label)
                // console.log(context.parsed.y)
                if (label) {
                  label += ': '
                }
                if (context.dataset.label == 'Total Tasks') {
                  label += String(totalTasks)
                } else if (context.dataset.label == 'Completed Tasks') {
                  label += String(completedTasks)
                }
                // label += context.dataset.data
                return label
              },
            },
          },
        },
        title: {
          display: true,
          text: 'Completed Tasks / Total Tasks',
        },
        legend: {
          display: false,
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              beginAtZero: true,
              display: false,
            },
            grid: { display: false },
            scaleLabel: {
              display: false,
              labelString: 'Total Tasks',
            },
          },
          y: {
            stacked: true,
            scaleLabel: {
              display: false,
            },
            grid: { display: false },
          },
        },
        barThickness: 60, // set the width of each bar to 30 pixels
      },
    })

    return () => {
      myChart.destroy()
    }
  }, [completedTasks, totalTasks])

  return (
    <canvas style={{ width: '80%', height: '80%' }} ref={chartRef}></canvas>
  )
}

export default CompletedTasksBarChart
