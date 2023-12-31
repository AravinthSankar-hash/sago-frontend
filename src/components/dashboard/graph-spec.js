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
            text: 'X axis Name'
        }
    },
    // Graph Header
    title: {
        text: 'Any title'
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
export const areaGraphDataPoints = [
    {
        name: 'No. of bags',
        data: [145, 522, 318, 545, 219, 223, 852]
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
    colors: ['#90BE6D', '#00B7FF'],
    // Data points display
    dataLabels: {
        enabled: false
    },

    // x axia categories and title
    xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        title: {
            text: 'X axis Name'
        }
    },
    // Graph Header
    title: {
        text: 'Any title'
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
        name: 'Sale Rate', //will be displayed on the y-axis
        data: [30]
    },
    {
        name: 'Sale Rate', //will be displayed on the y-axis
        data: [50]
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