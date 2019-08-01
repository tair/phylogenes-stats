<template>
    <div>
        <p>{{status}}</p>
        <div class="chart-container">
            <canvas ref="chart"></canvas>
        </div>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import { Bar } from 'vue-chartjs';
    import { constants } from 'crypto';
    const axios = require('axios');
    export default {
        data: () => ({
        status: '',
        charData:{
            data: {
                labels: ['Total', 'Families with at least 1 known function(plant & nonplant)','Viridiplantae specific',
                 'Viridiplantae specific with at least 1 known function'],
                datasets: [{
                    label: '# of Gene Families',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255)',
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
        }
        }),
        extends: Bar,
        mounted() {
            var chart = this.$refs.chart;
            var ctx = chart.getContext("2d");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: this.charData.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Gene Families and Known Functions',
                        fontSize: '20'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                            beginAtZero: true
                            },
                            scaleLabel: {
                            display: true,
                            labelString: '# of Gene Families',
                            fontSize: '20'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: 'Gene Families under Specific Conditions',
                            fontSize: '20'
                            }
                        }]
                    }
                }
            });
            this.loadQuote();
        },
    methods: {
        loadQuote() {
            this.status = 'Loading...';
            axios.get('http://35.165.70.47:8080/panther/annotation')
            .then( (response) => {
                // console.log(response);
                this.status = 'Done Loading.';

                let docs = response.data;
                let knownFunctionCount = 0;
                let elementCount = 0;
                let plantSpecific = 0;
                let plantSpecificFunctionCount = 0;
                docs.forEach(element => 
                {
                    // console.log(element.id);
                    if (element.go_annotations_count != null)
                        knownFunctionCount += 1;
                    if (element.species_list == "Viridiplantae")
                        plantSpecific += 1;
                    if (element.species_list == "Viridiplantae" && element.go_annotations_count != null)
                        plantSpecificFunctionCount += 1;
                    elementCount += 1;
                });
                // console.log(elementCount);
                // console.log(knownFunctionCount);
                this.charData.data.datasets[0].data.push(elementCount);
                this.charData.data.datasets[0].data.push(knownFunctionCount);
                this.charData.data.datasets[0].data.push(plantSpecific);
                this.charData.data.datasets[0].data.push(plantSpecificFunctionCount);

                var chart = this.$refs.chart;
                var ctx = chart.getContext("2d");
                var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: this.charData.data,
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Gene Families and Known Functions',
                        fontSize: '20'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                            beginAtZero: true
                            },
                            scaleLabel: {
                            display: true,
                            labelString: '# of Gene Families',
                            fontSize: '20'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: 'Gene Families under Specific Conditions',
                            fontSize: '20',
                            barThickness: 6
                            }
                      }]
                    }
                  }   
                });
            })
            .catch(function (error) 
            {
                console.log('An error has ocurred.(page2) ' + error);
            });
        }
    }
    }
</script>

<style>
.chart-container {
    width: 900px;
    height: 500px
}
</style>