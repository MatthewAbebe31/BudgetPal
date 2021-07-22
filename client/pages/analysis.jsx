import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format } from 'date-fns';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      chartData: [],
      indexLabels: [],
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
          const labels = data[i].category;
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

        console.log('data', data);

        const budgetIndexArr = [];
        const spendingIndexArr = [];
        const indexLabelsArr = [];

        this.setState({ indexData: data });

        for (let z = 0; z < data[0].rows.length; z++) {
          budgetIndexArr.push(data[0].rows.[z]);
        }

        for (let y = 0; y < data[1].rows.length; y++) {
          spendingIndexArr.push(data[1].rows.[y]);
        }

        for (let i = 0; i < budgetIndexArr.length; i++) {
          for (let m = 0; m < spendingIndexArr.length; m++) {
            if (budgetIndexArr[i].categoryName === spendingIndexArr[m].x) {
              spendingIndexArr[m].budgetAmount = budgetIndexArr[i].categoryamount;
              indexLabelsArr.push(spendingIndexArr[m].x);
              this.setState({ spendingIndexData: spendingIndexArr });
              this.setState({ indexLabels: indexLabelsArr });
            }
          }
        }

        console.log('spendingIndexData', this.state.spendingIndexData);
        console.log('indexLabels', this.state.indexLabels);
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
          const labels = data[j].category;
          const purchases = data[j].purchases;
          purchasesByCategoryLabels.push(labels);
          purchasesByCategoryChartData.push(purchases);
        }
        this.setState({ purchasesByCategoryLabels: purchasesByCategoryLabels });
        this.setState({ purchasesByCategoryChartData: purchasesByCategoryChartData });
      });
  }

  render() {

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

    const purchasesByDayData = {
      labels: this.state.purchasesByDayLabels,
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
        },
        xAxes: {
          reverse: true
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

    // const purchasesByCategoryData = {
    //   labels: this.state.purchasesByCategoryLabels,
    //   datasets: [
    //     {
    //       label: 'Purchases',
    //       data: this.state.purchasesByCategoryChartData,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }
    //   ]
    // };

    // const purchasesByCategoryOptions = {
    //   scales: {
    //     yAxes: {
    //       axis: 'y',

    //       ticks: {
    //         beginAtZero: true,
    //         stepSize: 1
    //       }
    //     }
    //   }
    // };

    const budgetByCategoryData = {
      datasets: [
        {
          label: 'Budget',
          data: this.state.spendingIndexData,
          parsing: {
            yAxisKey: 'budgetAmount'
          },
          fill: false,
          backgroundColor: ['rgba(30, 139, 195, 1)',
            'rgba(255, 159, 64)', 'rgb(255, 205, 86)',
            'rgb(0, 163, 51)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(0,0,255)'],
          borderColor: 'rgba(30, 139, 195, 1)'
        },
        {
          label: 'Spending',
          data: this.state.spendingIndexData,
          parsing: {
            yAxisKey: 'totalSpent'
          },
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
                  <h4 className='chart-title'>Purchases by Time</h4>
                </div>

                <div>
                  <Bar data={purchasesByDayData} options={purchasesByDayOptions} />
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

              <div className="purchases-by-time-category-container mt-3 text-center w-75">

                <div className='purchases-by-category-header mb-3 mt-3'>
                  <h4 className='chart-title'>Purchases by Category</h4>
                </div>

                <div>
                  <Bar data={purchasesByCategoryData} options={purchasesByCategoryOptions} />
                </div>
              </div>
            </div> */}

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
