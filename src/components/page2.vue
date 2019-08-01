<template>
    <div>
        <!-- <p>{{status}}</p> -->
        <canvas ref="chart"></canvas>
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
                labels: ['Total # of Gene Families (all)', '# of Gene Families that are Viridiplantae specific',
                 '# of Families(only Viridiplantae specific) with at least 1 known function'],
                datasets: [{
                    label: '# of Gene Families',
                    data: [],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
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
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            this.loadQuote();
        },
        created() {
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

                // console.log(response.data);

                docs.forEach(element => 
                {
                    // console.log(element.id);
                    if (element.species_list == "Viridiplantae")
                        plantSpecific += 1;
                    if (element.species_list == "Viridiplantae" && element.go_annotations_count != null)
                        knownFunctionCount += 1;
                    elementCount += 1;
                });
                // console.log(elementCount);
                // console.log(knownFunctionCount);
                this.charData.data.datasets[0].data.push(elementCount);
                this.charData.data.datasets[0].data.push(plantSpecific);
                this.charData.data.datasets[0].data.push(knownFunctionCount);

                var chart = this.$refs.chart;
                var ctx = chart.getContext("2d");
                var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: this.charData.data,
                  options: {
                    scales: {
                      yAxes: [{
                        ticks: {
                          beginAtZero: true
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
</style>