import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// interface Props {
//   completedTasks: number
//   totalTasks: number
// }

const CompletedTasksBarChart = ({ completedTasks, totalTasks }) => {
  const chartRef = useRef(null)

  useEffect(() => {


    



    const chartData = {
      labels: ['Completed Tasks'],
      datasets: [
        {
          label: 'Total Tasks',
          data: [totalTasks],
          backgroundColor: '#C8D3F5',
        },
        {
          label: 'Completed Tasks',
          data: [completedTasks],
          backgroundColor: '#2B5282',
        },
      ],
    }

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,

      options: {
        indexAxis: 'y',
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

  return <canvas ref={chartRef}></canvas>
}

export default CompletedTasksBarChart
