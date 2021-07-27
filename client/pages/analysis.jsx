import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format } from 'date-fns';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      chartData: [],
      spendingIndexData: [],
      purchasesByDayLabels: [],
      purchasesByDayChartData: [],
      totalAmountByCategoryChartData: [],
      totalAmountByCategoryLabels: [],
      spendingByCategoryLabels: [],
      spendingByCategoryChartData: [],
      purchasesByCategoryLabels: [],
      purchasesByCategoryChartData: []
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
          const labels = data[i].categoryName;
          const amounts = data[i].amount;
          spendingByCategoryLabels.push(labels);
          spendingByCategoryChartData.push(amounts);
        }
        this.setState({ spendingByCategoryLabels: spendingByCategoryLabels });
        this.setState({ spendingByCategoryChartData: spendingByCategoryChartData });
      });

    fetch('/api/categories/categoryBudget')
      .then(res => res.json())
      .then(data => {

        const budgetIndexArr = [];
        const spendingIndexArr = [];

        this.setState({ indexData: data });

        for (let z = 0; z < data[0].rows.length; z++) {
          budgetIndexArr.push(data[0].rows.[z]);
        }

        for (let y = 0; y < data[1].rows.length; y++) {
          spendingIndexArr.push(data[1].rows.[y]);
        }

        for (let i = 0; i < budgetIndexArr.length; i++) {
          for (let m = 0; m < spendingIndexArr.length; m++) {
            if (budgetIndexArr[i].categoryId === spendingIndexArr[m].categoryId) {
              spendingIndexArr[m].budgetAmount = budgetIndexArr[i].categoryamount;
              spendingIndexArr[m].budgetVariance = budgetIndexArr[i].categoryamount - spendingIndexArr[m].totalSpent;
              this.setState({ spendingIndexData: spendingIndexArr });
            }
          }
        }

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

    fetch('/api/purchases/countPurchasesByCategory')
      .then(res => res.json())
      .then(data => {

        const purchasesByCategoryLabels = [];
        const purchasesByCategoryChartData = [];

        for (let j = 0; j < data.length; j++) {
          const labels = data[j].categoryName;
          const purchases = data[j].purchases;
          purchasesByCategoryLabels.push(labels);
          purchasesByCategoryChartData.push(purchases);
        }
        this.setState({ purchasesByCategoryLabels: purchasesByCategoryLabels });
        this.setState({ purchasesByCategoryChartData: purchasesByCategoryChartData });
      });
  }

  render() {

    function getRandomColor() {
      const rgbaArr = [
        'rgba(255, 0, 0)',
        'rgba(255, 255, 0)',
        'rgba(0, 0, 255)',
        'rgba(150, 75, 0)',
        'rgba(255, 165, 0)',
        'rgba(0, 128, 0)',
        'rgba(238, 130, 238)',
        'rgba(255, 166, 201)',
        'rgba(255, 174, 66)',
        'rgba(13, 152, 186)',
        'rgba(199, 21, 133)',
        'rgba(255, 83, 73)',
        'rgba(154, 205, 50)',
        'rgba(138, 43, 226)',
        'rgba(199, 21, 133)',
        'rgba(240, 225, 48)',
        'rgba(0, 123, 167)',
        'rgba(253, 213, 177)',
        'rgba(255, 36, 0)',
        'rgba(173, 255, 47)',
        'rgba(75, 0, 130)'
      ];

      const randomColor = rgbaArr[Math.floor(Math.random() * rgbaArr.length)];

      return randomColor;
    }

    const data = {
      labels: this.state.labels,
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
        },
        xAxes: {
          reverse: true
        }
      }
    };

    const purchasesByCategoryData = {
      labels: this.state.purchasesByCategoryLabels,
      datasets: [
        {
          label: 'Purchases',
          data: this.state.purchasesByCategoryChartData,
          backgroundColor: 'rgb(0, 128, 0)'
        }
      ]
    };

    const purchasesByCategoryOptions = {
      scales: {
        yAxes: {
          axis: 'y',

          ticks: {
            beginAtZero: true,
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
          backgroundColor: [
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor()
          ]
        }
      ]
    };

    const spendingByCategoryOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8
    };

    const budgetByCategoryData = {
      datasets: [
        {
          label: 'Budget',
          data: this.state.spendingIndexData,
          parsing: {
            yAxisKey: 'budgetAmount'
          },
          fill: false,
          backgroundColor: 'rgb(0, 128, 0)'
        },
        {
          label: 'Spending',
          data: this.state.spendingIndexData,
          parsing: {
            yAxisKey: 'totalSpent'
          },
          fill: false,
          backgroundColor: 'rgba(30, 139, 195, 1)'
        },
        {
          label: 'Variance',
          data: this.state.spendingIndexData,
          parsing: {
            yAxisKey: 'budgetVariance'
          },
          fill: false,
          backgroundColor: 'rgb(255, 0, 0)'
        }

      ]
    };

    const budgetByCategoryOptions = {
      scales: {
        yAxes: {
          axis: 'y',

          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      }
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
            <div className="spending-by-category-chart-container mt-3 text-center w-75">
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
                  <h4 className='chart-title'>Purchases by Category</h4>
                </div>

                <div>
                  <Bar data={purchasesByCategoryData} options={purchasesByCategoryOptions} />
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

              <div className="purchases-by-time-category-container mt-3 text-center w-75">

                <div className='purchases-by-category-header mb-3 mt-3'>
                  <h4 className='chart-title'>Budget by Category</h4>
                </div>

                <div>
                  <Bar data={budgetByCategoryData} options={budgetByCategoryOptions} />
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
