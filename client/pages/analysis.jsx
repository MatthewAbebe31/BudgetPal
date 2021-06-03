import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format } from 'date-fns';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      chartData: [],
      purchasesByDayLabels: [],
      purchasesByDayChartData: [],
      spendingByCategoryLabels: [],
      spendingByCategoryChartData: []
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
          const amounts = data[i].amount;
          labels.push(formattedDates);
          chartData.push(amounts);
        }
        this.setState({ labels: labels });
        this.setState({ chartData: chartData });
      });

    fetch('/api/purchases/categorySpending')
      .then(res => res.json())
      .then(data => {

        const spendingByCategoryLabels = [];
        const spendingByCategoryChartData = [];

        for (let i = 0; i < data.length; i++) {
          const labels = data[i].category;
          const amounts = data[i].amount;
          spendingByCategoryLabels.push(labels);
          spendingByCategoryChartData.push(amounts);
        }
        this.setState({ spendingByCategoryLabels: spendingByCategoryLabels });
        this.setState({ spendingByCategoryChartData: spendingByCategoryChartData });
      });

    fetch('/api/purchases/countPurchases')
      .then(res => res.json())
      .then(data => {

        const purchasesByDayLabels = [];
        const purchasesByDayChartData = [];

        for (let j = 0; j < data.length; j++) {
          const dates = data[j].date;
          const formattedDates = format(new Date(dates), 'MM/dd/yyyy');
          const purchases = data[j].count;
          purchasesByDayLabels.push(formattedDates);
          purchasesByDayChartData.push(purchases);
        }
        this.setState({ purchasesByDayLabels: purchasesByDayLabels });
        this.setState({ purchasesByDayChartData: purchasesByDayChartData });
      });
  }

  render() {

    const data = {
      labels: this.state.labels.reverse(),
      datasets: [
        {
          label: 'Spending',
          data: this.state.chartData,
          fill: false,
          backgroundColor: 'rgba(30, 139, 195, 1)',
          borderColor: 'rgba(30, 139, 195, 1)'
        }
      ]
    };

    const options = {
      scales: {
        yAxes: {
          axis: 'y',
          ticks: {
            callback: function (value, index, values) {
              return '$' + value;
            },
            beginAtZero: true
          }
        }
      }
    };

    const purchasesByDayData = {
      labels: this.state.purchasesByDayLabels.reverse(),
      datasets: [
        {
          label: 'Purchases',
          data: this.state.purchasesByDayChartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    const purchasesByDayOptions = {
      scales: {
        yAxes: {
          axis: 'y',

          ticks: {
            beginAtZero: true,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
            stepSize: 1
          }
        }
      }
    };

    const spendingByCategoryData = {
      labels: this.state.spendingByCategoryLabels,
      datasets: [
        {
          label: 'Spending',
          data: this.state.spendingByCategoryChartData,
          fill: false,
          backgroundColor: ['rgba(30, 139, 195, 1)',
            'rgba(255, 159, 64)', 'rgb(255, 205, 86)',
            'rgb(0, 163, 51)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(0,0,255)'],
          borderColor: 'rgba(30, 139, 195, 1)'
        }
      ]
    };

    const spendingByCategoryOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8
    };

    return (
      <>
        <div className="row">

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="spending-by-time-chart-container mt-3 text-center w-75">
              <div className='spending-by-time-header mb-3'>
                <h4 className='chart-title text-center fs-5'>Spending by Time</h4>
              </div>
              <div>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="spending-by-category-chart-container mt-5 text-center w-75">
              <div className='spending-by-category-header mb-3'>
                <h4 className='chart-title text-center fs-5'>Spending by Category</h4>
              </div>
              <div>
                <Pie data={spendingByCategoryData} options={spendingByCategoryOptions} />
              </div>
            </div>
          </div>

        </div>

        <div>
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

              <div className="purchases-by-time-chart-container mt-3 text-center w-75">

                <div className='purchases-by-time-header mb-3'>
                  <h4 className='chart-title'>Purchases by Time</h4>
                </div>

                <div>
                  <Bar data={purchasesByDayData} options={purchasesByDayOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default Analysis;
