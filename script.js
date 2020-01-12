(function ($) {
    'use strict';
    $(function () {


        /*******  Start totalsales Chart *******/


        function getTotalSalesChart() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart')
                .then(res => res.json())
                .then(data => {


                   //kommaseparera nummer
                   let revenue = data.revenue;
                   let returns = data.returns;
                   let queries = data.queries;
                   let invoices = data.invoices;
                  
                
                   document.getElementById('totalSalesRevenue').innerHTML = (revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('totalSalesReturns').innerHTML = (returns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('totalSalesQueries').innerHTML = (queries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('totalSalesInvoices').innerHTML = (invoices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

                    // document.getElementById('totalSalesRevenue').innerHTML =
                    //     `${data.revenue}`

                    // document.getElementById('totalSalesReturns').innerHTML =
                    //     `${data.returns}`

                    // document.getElementById('totalSalesQueries').innerHTML =
                    //     `${data.queries}`

                    // document.getElementById('totalSalesInvoices').innerHTML =
                    //     `${data.invoices}`


                    if ($("#total-sales-chart").length) {
                        var areaData = {
                            labels: (data.labels),/* <= här */
                            datasets: [
                                {
                                    data: (data.datasets[0].data),/* <= här */
                                    backgroundColor: [
                                        'rgba(61, 165, 244, .0)'
                                    ],
                                    borderColor: [
                                        'rgb(61, 165, 244)'
                                    ],
                                    borderWidth: 2,
                                    fill: 'origin',
                                    label: "services"
                                },
                                {
                                    data: (data.datasets[1].data),/* <= här */
                                    backgroundColor: [
                                        'rgba(241, 83, 110, .0)'
                                    ],
                                    borderColor: [
                                        'rgb(241, 83, 110)'
                                    ],
                                    borderWidth: 2,
                                    fill: 'origin',
                                    label: "services"
                                }
                            ]
                        };
                        var areaOptions = {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                filler: {
                                    propagate: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    ticks: {
                                        display: true,
                                        padding: 20,
                                        fontColor: "#000",
                                        fontSize: 14
                                    },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                        color: 'transparent',
                                        zeroLineColor: '#eeeeee'
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        display: true,
                                        autoSkip: false,
                                        maxRotation: 0,
                                        stepSize: 100,
                                        fontColor: "#000",
                                        fontSize: 14,
                                        padding: 18,
                                        stepSize: 100000,
                                        callback: function (value) {
                                            var ranges = [
                                                { divider: 1e6, suffix: 'M' },
                                                { divider: 1e3, suffix: 'k' }
                                            ];
                                            function formatNumber(n) {
                                                for (var i = 0; i < ranges.length; i++) {
                                                    if (n >= ranges[i].divider) {
                                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                                    }
                                                }
                                                return n;
                                            }
                                            return formatNumber(value);
                                        }
                                    },
                                    gridLines: {
                                        drawBorder: false
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: true
                            },
                            elements: {
                                line: {
                                    tension: .37
                                },
                                point: {
                                    radius: 0
                                }
                            }
                        }
                        var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
                        var revenueChart = new Chart(revenueChartCanvas, {
                            type: 'line',
                            data: areaData,
                            options: areaOptions
                        });
                    }



                })
        }
        getTotalSalesChart()


        /* End Totalsales chart */


        /*******  Start users  *******/

        // function getFullName(firstname, lastname) {
        //     fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`)
        //         .then(res => res.text())
        //         .then(data => {
        //             //console.log(data))
        //             localStorage.setItem('getFullName', data)
        //             document.getElementById('fullName').innerHTML = localStorage.getItem('getFullName');
        //         })

        //     //console.log(localStorage.getItem('getFullName'));
        //     //alert('Test: ' + localStorage.getItem('getFullName'));

        // }


        function getFullName(firstname, lastname) {
            fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`)
                .then(res => res.text())
                .then(data => {
                    //console.log(data))
                    localStorage.setItem('getFullName', data)
                    document.getElementById('fullName').innerHTML = localStorage.getItem('getFullName');

                    //splitta namnet
                    let myName = localStorage.getItem('getFullName')

                    console.log(myName.split(' '));
                    let names = myName.split(' ');
                    let firstName = names[0];
                    let lastName = names[1];

                    //console.log(`Mitt förnamn är ${firstName} och efternamnet är ${lastName}`);
                    document.getElementById('firstName').innerHTML = `Hi ${firstName}, Welcome back!`

                })

            //console.log(localStorage.getItem('getFullName'));
            //alert('Test: ' + localStorage.getItem('getFullName'));


        }

        getFullName('Kalle', 'Larsson')



        /*******  Messages  *******/

        function getMessages() {

            fetch('https://inlupp-fa.azurewebsites.net/api/messages')
                .then(res => res.json())
                .then(data => {

                    //for (let i = 0; i <= 2; i++) {

                    //for (data of data) {

                    for (let i = 0; i < data.length; i++) {


                        document.getElementById('messages').insertAdjacentHTML('beforeend',
                            `
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
                                </div>
                                <div class="preview-item-content flex-grow">
                                    <h6 class="preview-subject ellipsis font-weight-normal">
                                    ${data[i].from}
                                    </h6>
                                    <p class="font-weight-light small-text text-muted mb-0">
                                    ${data[i].title}
                                    </p>
                                </div>
                            </a>       
                            `
                        )
                    }
                }
                )
        } getMessages()

        /*******  slut Messages  *******/


        /*******  Notifications  *******/

        function getNotifications() {

            fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
                .then(res => res.json())
                .then(data => {

                    //Byta färg och ikon

                    for (let i = 0; i < data.length; i++) {

                        let title = (data[i].title)
                        let color = title
                        let icon = title

                        if ((title) == 'Application Error') {
                            color = 'preview-icon bg-success';
                            icon = 'mdi mdi-information mx-0';

                        } else if ((title) == 'Settings') {
                            color = 'preview-icon bg-warning';
                            icon = 'mdi mdi-settings mx-0';

                        } else if ((title) == 'New user registration') {
                            color = 'preview-icon bg-info';
                            icon = 'mdi mdi-account-box mx-0';

                        } else {
                            color = 'preview-icon bg-primary';
                            icon = 'mdi mdi-clock-outline mx-0';
                        }


                        document.getElementById('notifications').insertAdjacentHTML('beforeend',
                            `
                            <a class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                              <div class="${color}">
                                <i class="${icon}"></i>
                              </div>
                            </div>
                            <div class="preview-item-content">
                              <h6 class="preview-subject font-weight-normal">${data[i].title}</h6>
                              <p class="font-weight-light small-text mb-0 text-muted">
                              ${data[i].subtitle}
                              </p>
                            </div>
                          </a>

                         `
                        )
                    }


                })
        } getNotifications()




        /*******  Start Total sales  *******/


        function getTotalSales() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-sales')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('totalSales').innerHTML =
                        `${data.currency}${data.amount}`
                })
        } getTotalSales()


        // /*******  Start Total Purchases  *******/

        function getTotalPurchases() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-purchases')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('totalPurchases').innerHTML =
                        `${data.currency}${data.amount}`
                })
        } getTotalPurchases()



        /*******  Start Total Orders  *******/

        function getTotalOrders() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-orders')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('totalOrders').innerHTML =
                        `${data.currency}${data.amount}`
                })
        } getTotalOrders()



        /*******  Start Total Growth  *******/

        function getTotalGrowth() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-growth')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('totalGrowth').innerHTML =
                        `${data.currency}${data.amount}`
                })
        }
        getTotalGrowth()



        /*******  Start Total Users  *******/

        // function getTotalUsers() {

        //     fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
        //         .then(res => res.json())
        //         .then(data => {

        //             console.log(data.dataset.data)

        //             // document.getElementById('totalUsers').innerHTML =
        //             //     `<p>Månader: ${data.dataset.labels}</p>
        //             //     <p>Summor: ${data.dataset.data}</p>`

        //             // const userArray =  (data.dataset.data)           
        //             // for (let i = 0; i < userArray.length; i++){ 
        //             //     console.log(`Index #${i}: ${userArray[i]}`);
        //             // }


        //         })
        // }
        // getTotalUsers()





        function getTotalUsers() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
                .then(res => res.json())
                .then(data => {

                    //kommaseparera nummer
                    let users = data.users;
                    // console.log(new Intl.NumberFormat().format(users));
                    // console.log('test2: ' + users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) //Bäst för det blir komma
                    // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(users));

                    //skriv ut med kommaseparering
                    document.getElementById('users').innerHTML = (users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    //document.getElementById('users').innerHTML = (new Intl.NumberFormat().format(`${users}`))      

                    //skriv ut positivt eller negativt tal
                    let growth = data.growth;
                    if (growth > 0) {
                        document.getElementById('growth').innerHTML = `+${data.growth}%`
                    }
                    else if (growth == 0) {
                        document.getElementById('growth').innerHTML = `${data.growth}%`
                    }
                    else {
                        document.getElementById('growth').innerHTML = `-${data.growth}%`
                    }

                    //skriv ut                  
                    //document.getElementById('users').innerHTML = `${data.users}`
                    //document.getElementById('growth').innerHTML = `${data.growth}%`

                    /* deras kod start */

                    if ($("#users-chart").length) {
                        var areaData = {

                            labels: (data.dataset.labels), /* <= här */


                            datasets: [{
                                data: (data.dataset.data), /* <= här */
                                backgroundColor: [
                                    '#e0fff4'
                                ],
                                borderWidth: 2,
                                borderColor: "#00c689",
                                fill: 'origin',
                                label: "purchases"
                            }
                            ]
                        };


                        var areaOptions = {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                filler: {
                                    propagate: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: false,
                                    ticks: {
                                        display: true
                                    },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                        color: 'transparent',
                                        zeroLineColor: '#eeeeee'
                                    }
                                }],
                                yAxes: [{
                                    display: false,
                                    ticks: {
                                        display: true,
                                        autoSkip: false,
                                        maxRotation: 0,
                                        stepSize: 100,
                                        min: 0,
                                        max: 300
                                    },
                                    gridLines: {
                                        drawBorder: false
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: true
                            },
                            elements: {
                                line: {
                                    tension: .35
                                },
                                point: {
                                    radius: 0
                                }
                            }
                        }

                        var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
                        var salesChart = new Chart(salesChartCanvas, {
                            type: 'line',
                            data: areaData,
                            options: areaOptions
                        });
                    }

                    /* deras kod slut */

                })

        } getTotalUsers()

        /*******  end  Total Users *******/

        /*******  start Projects chart  *******/


        function getTotalProjects() {

            fetch('https://inlupp-fa.azurewebsites.net/api/total-projects')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('projectUsers').innerHTML = `${data.projects}%`

                    //skriv ut positivt eller negativt tal
                    let growth = data.growth;
                    if (growth > 0) {
                        document.getElementById('projectGrowth').innerHTML = `+${data.growth}%`
                    }
                    else if (growth == 0) {
                        document.getElementById('projectGrowth').innerHTML = `${data.growth}%`
                    }
                    else {
                        document.getElementById('projectGrowth').innerHTML = `-${data.growth}%`
                    }

                    //document.getElementById('projectGrowth').innerHTML = `${data.growth}%`

                    if ($("#projects-chart").length) {
                        var areaData = {
                            labels: (data.dataset.labels),/* <= här */
                            datasets: [{
                                data: (data.dataset.data), /* <= här */
                                backgroundColor: [
                                    '#e5f2ff'
                                ],
                                borderWidth: 2,
                                borderColor: "#3da5f4",
                                fill: 'origin',
                                label: "purchases"
                            }
                            ]
                        };
                        var areaOptions = {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                filler: {
                                    propagate: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: false,
                                    ticks: {
                                        display: true
                                    },
                                    gridLines: {
                                        display: false,
                                        drawBorder: false,
                                        color: 'transparent',
                                        zeroLineColor: '#eeeeee'
                                    }
                                }],
                                yAxes: [{
                                    display: false,
                                    ticks: {
                                        display: true,
                                        autoSkip: false,
                                        maxRotation: 0,
                                        stepSize: 100,
                                        min: 0,
                                        max: 300
                                    },
                                    gridLines: {
                                        drawBorder: false
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: true
                            },
                            elements: {
                                line: {
                                    tension: .05
                                },
                                point: {
                                    radius: 0
                                }
                            }
                        }
                        var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
                        var salesChart = new Chart(salesChartCanvas, {
                            type: 'line',
                            data: areaData,
                            options: areaOptions
                        });
                    }

                })

        }

        getTotalProjects()

        /*******  End Projects chart   *******/

        /*******  Start Downloads  *******/

        function getTotalDownloads() {

            fetch('https://inlupp-fa.azurewebsites.net/api/downloads')
                .then(res => res.json())
                .then(data => {


                    //kommaseparera nummer
                    let offlineAmount = data[0].offlineAmount;
                    let onlineAmount = data[1].onlineAmount;
                  
                    //skriv ut med kommaseparering
                    document.getElementById('downloadsOfflineAmount').innerHTML = (offlineAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    document.getElementById('downloadsOnlineAmount').innerHTML = (onlineAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

                    // document.getElementById('downloadsOfflineAmount').innerHTML =
                    //     `${data[0].offlineAmount}`

                    // document.getElementById('downloadsOnlineAmount').innerHTML =
                    //     `${data[1].onlineAmount}`



                    /* start Dowlnloads Offline */


                    if ($('#offlineProgress').length) {
                        var bar = new ProgressBar.Circle(offlineProgress, {
                            color: '#000',
                            // This has to be the same size as the maximum width to
                            // prevent clipping
                            strokeWidth: 6,
                            trailWidth: 6,
                            easing: 'easeInOut',
                            duration: 1400,
                            text: {
                                autoStyleContainer: true,
                                style: {
                                    color: "#fff",
                                    position: 'absolute',
                                    left: '40%',
                                    top: '50%'
                                }
                            },
                            svgStyle: {
                                width: '90%'
                            },
                            from: {
                                color: '#f1536e',
                                width: 6
                            },
                            to: {
                                color: '#f1536e',
                                width: 6
                            },
                            // Set default step function for all animate calls
                            step: function (state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) {
                                    circle.setText('');
                                } else {
                                    circle.setText(value);
                                }

                            }
                        });

                        bar.text.style.fontSize = '1rem';
                        bar.animate(data[0].circleValue); // Number from 0.0 to 1.0 /*<= här*/
                    }

                    /* slut Downloads Offline */



                    /* start Downloads Online */

                    if ($('#onlineProgress').length) {
                        var bar = new ProgressBar.Circle(onlineProgress, {
                            color: '#000',
                            // This has to be the same size as the maximum width to
                            // prevent clipping
                            strokeWidth: 6,
                            trailWidth: 6,
                            easing: 'easeInOut',
                            duration: 1400,
                            text: {
                                autoStyleContainer: true,
                                style: {
                                    color: "#fff",
                                    position: 'absolute',
                                    left: '40%',
                                    top: '50%'
                                }
                            },
                            svgStyle: {
                                width: '90%'
                            },
                            from: {
                                color: '#fda006',
                                width: 6
                            },
                            to: {
                                color: '#fda006',
                                width: 6
                            },
                            // Set default step function for all animate calls
                            step: function (state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) {
                                    circle.setText('');
                                } else {
                                    circle.setText(value);
                                }

                            }
                        });

                        bar.text.style.fontSize = '1rem';
                        bar.animate(data[1].circleValue); // Number from 0.0 to 1.0 /*<= här*/
                    }

                    /* slut Dowlnloads Online */

                })
        }
        getTotalDownloads()

        /*******  End Downloads  *******/



        /****************************/
        /*          DEL 2          */
        /**************************/

        /*******  start Updates  *******/

        function getUpdates() {

            fetch('https://inlupp-fa.azurewebsites.net/api/updates')
                .then(res => res.json())
                .then(data => {

                    for (data of data) {
                        document.getElementById('updates').insertAdjacentHTML('beforeend',
                            `
                            <li>
                            <h6>${data.title}</h6>
                            <p class="mt-2">${data.message}</p>
                            <p class="text-muted mb-4">
                              <i class="mdi mdi-clock-outline"></i>
                              ${data.time}.
                            </p>
                          </li>

                         `
                        )
                    }
                }
                )
        }
        getUpdates()

        /*******  end updates *******/


        /*******  start  distribution-chart *******/

        function getDistribution() {

            fetch('https://inlupp-fa.azurewebsites.net/api/distribution')
                .then(res => res.json())
                .then(data => {


                    /* start deras */

                    if ($("#distribution-chart").length) {
                        var areaData = {
                            labels: (data.labels),/*<= här*/
                            datasets: [{
                                data: (data.data),/*<= här*/
                                backgroundColor: [
                                    "#3da5f4", "#f1536e", "#fda006"
                                ],
                                borderColor: "rgba(0,0,0,0)"
                            }
                            ]
                        };
                        var areaOptions = {
                            responsive: true,
                            maintainAspectRatio: true,
                            segmentShowStroke: false,
                            cutoutPercentage: 72,
                            elements: {
                                arc: {
                                    borderWidth: 4
                                }
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: true
                            },
                            legendCallback: function (chart) {
                                var text = [];
                                text.push('<div class="distribution-chart">');
                                text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
                                text.push('<p>' + data.cities[0] + '</p>');/*<=  här*/
                                text.push('</div>');
                                text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
                                text.push('<p>' + data.cities[1] + '</p>');/*<=  här*/
                                text.push('</div>');
                                text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
                                text.push('<p>' + data.cities[2] + '</p>');/*<=  här*/
                                text.push('</div>');
                                text.push('</div>');
                                return text.join("");
                            },
                        }
                        var distributionChartPlugins = {
                            beforeDraw: function (chart) {
                                var width = chart.chart.width,
                                    height = chart.chart.height,
                                    ctx = chart.chart.ctx;

                                ctx.restore();
                                var fontSize = .96;
                                ctx.font = "600 " + fontSize + "em sans-serif";
                                ctx.textBaseline = "middle";
                                ctx.fillStyle = "#000";

                                var text = (data.procentage + "%"), /*<=  här */
                                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                                    textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                        var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
                        var distributionChart = new Chart(distributionChartCanvas, {
                            type: 'doughnut',
                            data: areaData,
                            options: areaOptions,
                            plugins: distributionChartPlugins
                        });
                        document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
                    }
                    /* slut deras */

                })

        } getDistribution()


        /*******  slut distribution-chart *******/


        /*******  Start sale-report *******/


        function getSaleReportChart() {

            fetch('https://inlupp-fa.azurewebsites.net/api/sales-report')
                .then(res => res.json())
                .then(data => {

                    //kommaseparera nummer
                   let downloads = data.downloads;
                   let purchases = data.purchases;
                   let users = data.users;
                   let growth = data.growth;
                  
                
                   document.getElementById('downloadsSaleReportChart').innerHTML = (downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('purchasesSaleReportChart').innerHTML = (purchases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('usersSaleReportChart').innerHTML = (users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                   document.getElementById('growthSaleReportChart').innerHTML = (growth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

                    // document.getElementById('downloadsSaleReportChart').innerHTML =
                    //     `${data.downloads}`

                    // document.getElementById('purchasesSaleReportChart').innerHTML =
                    //     `${data.purchases}`

                    // document.getElementById('usersSaleReportChart').innerHTML =
                    //     `${data.users}`

                    // document.getElementById('growthSaleReportChart').innerHTML =
                    //     `${data.growth}`


                    //start deras

                    if ($("#sale-report-chart").length) {
                        var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
                        var CurrentChart = new Chart(CurrentChartCanvas, {
                            type: 'bar',
                            data: {
                                labels: (data.labels),/*<= här */
                                datasets: [{
                                    label: (data.datasets[0].label),/*<= här */
                                    data: (data.datasets[0].data),/*<= här */
                                    backgroundColor: (data.datasets[0].backgroundColor),/*<= här */
                                }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        display: true,
                                        gridLines: {
                                            drawBorder: false
                                        },
                                        ticks: {
                                            fontColor: "#000",
                                            display: true,
                                            padding: 20,
                                            fontSize: 14,
                                            stepSize: 10000,
                                            callback: function (value) {
                                                var ranges = [
                                                    { divider: 1e6, suffix: 'M' },
                                                    { divider: 1e3, suffix: 'k' }
                                                ];
                                                function formatNumber(n) {
                                                    for (var i = 0; i < ranges.length; i++) {
                                                        if (n >= ranges[i].divider) {
                                                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                                        }
                                                    }
                                                    return n;
                                                }
                                                return "$" + formatNumber(value);
                                            }
                                        }
                                    }],
                                    xAxes: [{
                                        stacked: false,
                                        categoryPercentage: .6,
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: "#000",
                                            display: true,
                                            padding: 20,
                                            fontSize: 14
                                        },
                                        gridLines: {
                                            color: "rgba(0, 0, 0, 0)",
                                            display: true
                                        },
                                        barPercentage: .7
                                    }]
                                },
                                legend: {
                                    display: false
                                },
                                elements: {
                                    point: {
                                        radius: 0
                                    }
                                }
                            }
                        });
                    }

                    /* end deras */

                })

        } getSaleReportChart()

        /******* end sale-report   *******/


        /******* start Open Invoices  *******/

        function getOpenInvoices() {

            fetch('https://inlupp-fa.azurewebsites.net/api/open-invoices')
                .then(res => res.json())
                .then(data => {


                    for (let i = 0; i < data.length; i++) {

                        let color = (data[i].status)

                        if ((color) == 'Open') {
                            color = 'badge badge-warning badge-fw';

                        } else if ((color) == 'On hold') {
                            color = 'badge badge-danger badge-fw';

                        } else if ((color) == 'Progress') {
                            color = 'badge badge-success badge-fw';

                        } else {
                            color = 'badge badge-info badge-fw';
                        }


                        document.getElementById('openInvoices').insertAdjacentHTML('beforeend',
                            `
                            <tr>
                       
                                <td>${data[i].invoice}</td>
                                <td>${data[i].customer}</td>
                                <td>${data[i].shipping}</td>
                                <td class="font-weight-bold">${data[i].currency}${data[i].bestPrice}</td>
                                <td>${data[i].currency}${data[i].purchasedPrice}</td>
                                <td>
                                    <div class="${color}">${data[i].status}</div>
                                </td>

                            </tr>                                                  
                      `
                        )
                    }
                })

        } getOpenInvoices()

        /*******  end Open Invoices  *******/


        /*******  start Tickets  *******/



        function getTickets() {



            fetch('https://inlupp-fa.azurewebsites.net/api/tickets')
                .then(res => res.json())
                .then(data => {



                    // får ej till eventlistenern... 
                    // koden  lägger bara till fler på listan istället för ett år i taget

                    //select och eventlistener för årtal
                    const years = document.getElementById('year');

                   
                    years.addEventListener('change', (e) => {
                        //console.log(`e.target.value = ${e.target.value}`);
                        console.log(`${years.options[years.selectedIndex].value}`);
                        
                        
                        //let y = (years.options[years.selectedIndex].value)
                        let y = (e.target.value)
                                            
                        //let y = 0  //y är årtal (0 = 2017 osv)

                        console.log('start')
                        

                        for (let i = 0; i < data[y].tickets.length; i++) {

                           

                            //let year = data[y].year
                            let fullName = data[y].tickets[i].name
                            let city = data[y].tickets[i].city
                            let fullDate = data[y].tickets[i].date
                            let project = data[y].tickets[i].project
                            let other = data[y].tickets[i].other


                            //splitta namnet
                            let names = fullName.split(' ');
                            let firstName = names[0];
                            let lastName = names[1];

                            //document.getElementById('test').innerHTML = `firstName: ${firstName}, lastName: ${lastName}, `

                            //Första bokstaven
                            let str1 = firstName;
                            let str2 = lastName;

                            let firstChar = str1.charAt(0);
                            let secondChar = str2.charAt(0);

                            let characters = (firstChar + secondChar)

                            //console.log(data.year);

                            //splitta datum
                            let splitdate = fullDate.split(',');
                            let date = splitdate[0];
                            let time = splitdate[1];

                            //document.getElementById('test').innerHTML = `Datum: ${date}, Klockslag: ${time}, `



                            //Byta färg på cirkeln

                            let circle = other

                            if ((other) == 'View on map') {
                                circle = 'icon-rounded-primary icon-rounded-md';

                            } else if ((other) == 'Start session') {
                                circle = 'icon-rounded-info icon-rounded-md';

                            } else if ((other) == 'End session') {
                                circle = 'icon-rounded-danger icon-rounded-md';

                            } else if ((other) == 'On Way') {
                                circle = 'icon-rounded-warning icon-rounded-md';

                            } else {
                                circle = 'icon-rounded-success icon-rounded-md';
                            }



                            // sätter ihop allt


                            document.getElementById('tickets').insertAdjacentHTML('beforeend',
                                `
                            <tr>
                                <td class="pl-0">
                                    <div class="${circle}">
                                        <h4 class="font-weight-medium">${characters}</h4>
                                        
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0">${fullName}</p>
                                    <p class="text-muted mb-0">${city}</p>
                                </td>
                                <td>
                                    <p class="mb-0">${date}</p>
                                    <p class="text-muted mb-0">${time}</p>
                                </td>
                                <td>
                                    <p class="mb-0">${project}</p>
                                    <p class="text-muted mb-0">${other}</p>
                                </td>
                                <td class="pr-0">
                                    <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
                                </td>
                            </tr>
                        `
                            )
                                                       
                        }
                       
                    //years.removeEventListener('change', false)
                     console.log('lagt in')
                       
                     
                      

                   }, false);

                    console.log('Kalle Kula')

                })

               


        } getTickets()

        

        /*******  end Tickets  *******/


        


    });
})(jQuery);
