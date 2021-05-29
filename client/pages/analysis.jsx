import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      chartData: []
    };
  }

  componentDidMount() {
    fetch('/api/purchases/amount')
      .then(res => res.json())
      .then(data => {

        const labels = [];
        const chartData = [];

        for (let i = 0; i < data.length; i++) {
          const dates = data[i].date;
          const formattedDates = format(new Date(dates), 'MM/dd/yyyy');
          labels.push(formattedDates);
          chartData.push(data[i].amount);
        }
        this.setState({ labels: labels });
        this.setState({ chartData: chartData });
      });
  }

  render() {

    const data = {
      labels: this.state.labels.reverse(),
      datasets: [
        {
          label: 'Spending by Time',
          data: this.state.chartData,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)'
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: true
    };
    return (
      <>
        <div className="row">
          <div className="col-half">

            <div id="spending-by-time-chart-container">

              <div className='spending-by-time-header'>
                <h3 className='chart-title'>Spending by Time</h3>
              </div>

              <div>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default Analysis;
