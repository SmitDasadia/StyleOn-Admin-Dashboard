import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardBody } from 'reactstrap';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

class SalesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <>



        <Card>
          <CardBody>
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      width="500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

      </>

    );
  }
}

export default SalesChart;



