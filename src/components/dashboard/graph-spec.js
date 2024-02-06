export const areaGraphOptions = {
    //   Toobar disable for hamburger menu
    chart: {
        toolbar: {
            show: false,
            tools: {
                download: true
            }
        },
        zoom: {
            enabled: false
        }
    },
    // To fill the graph in color
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    },
    // Data points display
    dataLabels: {
        enabled: false
    },

    // x axia categories and title
    xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        title: {
            text: 'Days'
        }
    },
    // Graph Header
    title: {
        text: 'No of bags'
    },
    // Y axis value start, end, and divident
    yaxis:
        [{
            title: {
                text: 'Y axis name'
            },
            min: 0,
            max: 100,
            tickAmount: 10
        }],
    // ],
    // Grid lines
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    }
};
export const areaGraphDataPoints = [
    {
        name: 'Dates',
        data: [0, 22, 18, 45, 19, 23]
    }
];

export const lineGraphOptions = {
    stroke: {
        curve: 'smooth'
    },
    //   Toobar disable for hamburger menu
    chart: {
        toolbar: {
            show: false,
            tools: {
                download: true
            }
        }
    },
    // To fill the graph in color
    colors: ['#90BE6D', '#F8961E'],
    // Data points display
    dataLabels: {
        enabled: false
    },

    // x axia categories and title
    xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        title: {
            text: 'Months'
        }
    },
    // Graph Header
    title: {
        text: 'Rupees in (₹)'
    },
    // Y axis value start, end, and divident
    yaxis: [
        {
            title: {
                text: 'Y axis name'
            },
            min: 0,
            max: 900,
            tickAmount: 9
        }
    ],
    // Grid lines
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    }
};

export const lineGraphDataPoints = [
    {
        name: 'Sale Rate',
        data: [600, 200, 480, 650, 500]
    },
    {
        name: 'Top Rate',
        data: [400, 100, 380, 550, 400]
    }
];

export const barGraphOptions = {
    chart: {
        toolbar: {
            show: false
        }
    },
    xaxis: {
        categories: [1] //will be displayed on the x-asis
    },
    plotOptions: {
        bar: {
            columnWidth: '10%'
        }
    },
    // Grid lines
    grid: {
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    }
};

export const barGraphDataPoints = [
    {
        name: 'Top Rate', //will be displayed on the y-axis
        data: [3000]
    },
    {
        name: 'Sale Rate', //will be displayed on the y-axis
        data: [500]
    }
];

export const donutGraphOptions = {
    chart: { type: 'donut' },
    width: 2,
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    plotOptions: {
        pie: {
            donut: {
                size: '35%'
            },
            customScale: 0.7
        }
    }
};
export const donutGraphDataPoints = [44, 55, 41, 17];

export const totalOrdersLineOptions = {
    chart: {
        height: 70,
        type: "bar",
        stacked: true,
        sparkline: { enabled: true }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "20%",
            colors: { backgroundBarColors: ["#F8961E"] }
        }
    },
    stroke: {
        width: 0
    },
    title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: "Total Orders"
    },
    subtitle: {
        floating: true,
        align: "right",
        offsetY: 0,
        text: "44%",
        style: {
            fontSize: "20px"
        }
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        categories: ["Total Orders"]
    },
    yaxis: {
        max: 100
    },
    fill: {
        opacity: 1
    }
};

export const totalOrdersLinePoints = [{ name: "Process 1", data: [41] }];