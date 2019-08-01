<template>
    <div>
      <chart :options="chartOptionsBar"></chart>
      <p>{{status}}</p>
    </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'home',
  data: () => ({
  status: '',
  chartOptionsBar: {
      tooltip : {
      trigger: 'axis',
      axisPointer : {           
          type : 'shadow'        
      }
    },
    xAxis: {
      data: [],
      axisTick: {
          alignWithLabel: true
      },
      name: '# of genes in a range',
      nameLocation: 'middle',
      nameGap: '20'
    },
    yAxis: {
      type: 'value',
      name: '# of families'
    },
    series: [
      {
        name: 'gene range',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
              show: true,
              position: 'inside'
            }
        },
        data: []
      }       
    ],
        grid: {
        left: '10%',
        right: '1%',
        bottom: '1%',
        containLabel: true
    },
    title: {
      text: 'How many families fit under a certain # of genes?',
      x: 'center',
      textStyle: {
        fontSize: 18
      }
    },
    color: ['#800000']
  } 
}),
  created() {
    this.loadQuote();
  },
  methods: {
    loadQuote() {
      this.status = 'Loading...';
      axios.get('http://35.165.70.47:8080/panther/genecount')
      .then( (response) => {
        this.status = 'Done Loading.';
        let docs = response.data;
        // docs = docs.slice(0, 10);

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
            for (var i = 0; i < ARRAY_LENGTH; i++) 
            {
              // console.log(count[i]);
              this.chartOptionsBar.series[0].data.push(count[i]);
            }
      })
      .catch(function (error) {
        console.log('An error has ocurred.(home) ' + error);
      });
    }
  }
}
</script>

<style>
</style>
