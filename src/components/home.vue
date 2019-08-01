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
  import { Bar } from 'vue-chartjs'
  const axios = require('axios');
  export default {
    data: () => ({
      status: '',
      charData:{
        labels: ['1-10', '11-100', '101-500', '501-1000', '1001-2000', '2000+'],
        datasets: [{
          label: '# of Gene Families',
          data: [],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
      },
    }),
      extends: Bar,
      mounted() {
        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: this.charData,
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Gene Families Distributed based on # of Genes',
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
                  labelString: 'Range of Gene Count',
                  fontSize: '20',
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
        axios.get('http://35.165.70.47:8080/panther/genecount')
        .then( (response) => {
          // console.log(response);
          this.status = 'Done Loading.';
          let docs = response.data;
          // console.log(response.data);

          let ARRAY_LENGTH = 6;
          var count = new Array(ARRAY_LENGTH);
          for (var i = 0; i < count.length; i++) {
            count[i] = 0;
          }
          docs.forEach(element => 
          {
            if (element.uniprot_ids_count <= 10 && element.uniprot_ids_count >= 1)
              count[0] += 1;
            if (element.uniprot_ids_count <= 100 && element.uniprot_ids_count >= 11) 
              count[1] += 1;
            if (element.uniprot_ids_count <= 500 && element.uniprot_ids_count >= 101) 
              count[2] += 1;
            if(element.uniprot_ids_count <= 1000 && element.uniprot_ids_count >= 501) 
              count[3] += 1;
            if(element.uniprot_ids_count <= 2000 && element.uniprot_ids_count >= 1001) 
              count[4] += 1;
            if(element.uniprot_ids_count <= 50000000 && element.uniprot_ids_count >= 2000) 
              count[5] += 1;
          });
          for (var i = 0; i < ARRAY_LENGTH; i++) {
            this.charData.datasets[0].data.push(count[i]);
          }
          var chart = this.$refs.chart;
          var ctx = chart.getContext("2d");
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: this.charData,
            options: {
            title: {
              display: true,
              text: 'Gene Families Distributed based on # of Genes',
              fontSize: '20'
            },
              responsive: true,
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
                    labelString: 'Range of Gene Count',
                    fontSize: '20',
                  }
                }]
              }
            }
          });
        })
      .catch(function (error) {
        console.log('An error has ocurred.(page1) ' + error);
      });
      }
    }
  }
</script>

<style>
</style>