import React from "react";
import ReactApexChart from "react-apexcharts";

const chartData = {
  series: [
    {
      name: 'Revenue',
      data: [44, 55, 13, 43, 22]
    }
  ],
  options: {
    chart: {
      height: 200,
      type: 'line',
      width: '100%',
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: []
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: 'transparent',
      foreColor: '#fff'
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      colors: ['#4ade80']
    },
    markers: {
      size: 6,
      colors: ['#4ade80'],
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    grid: {
      show: true,
      borderColor: '#4b5563',
      strokeDashArray: 2,
      position: 'back'
    },
    plotOptions: {
      line: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#4ade80'
            }
          ]
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#4ade80'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      theme: 'dark'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          plotOptions: {
            bar: {
              borderRadius: 4
            }
          }
        }
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      labels: {
        style: {
          colors: '#fff',
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Revenue',
        style: {
          color: '#fff'
        }
      }
    }
  }
};

const ApexChart = () => {
  return (
    <div className="w-full rounded-lg p-4 h-[200px]">
      <ReactApexChart 
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={200}
      />
    </div>
  );
};

export default ApexChart;
