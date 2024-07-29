import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/services/header.service';
import { AnalyticsService } from '../../service/analytics.service';

@Component({
  selector: 'app-ai-bot-analytics',
  templateUrl: './ai-bot-analytics.component.html',
  styleUrls: ['./ai-bot-analytics.component.scss']
})
export class AiBotAnalyticsComponent {
  totalBot: any
  fallRate: any;
  sessionTime: any;
  botConversation: any;
  sessiontimeout: any;
  fallbackRateCount: any;
  avgTokenCount: any;
  totalTokenCount: any;
  tokenPerDayCount: any;
  agents: any;
  avgBotConversationTime: any;
  botEsclationRate: any;
  avgWaitTime: any;
  sentimentAnalysis: any;
  tagsAnalatics: any;
  peakHours: any;
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Ai Bot Analytics',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    //New
    this.TotalConversation();
    this.TotalAgents();
    this.AvgBotConversationTime();
    this.BotEsclationRate();
    this.AvgWaitTime();
    this.SentimentAnalysis();
    this.TagsAnalatics();
    this.TotalToken();
    this.AvgToken();
    this.TimeoutCount();
    this.TokenPerDay();

    //Old
    this.totalBotConversation();
    this.botEscalationRate();
    this.fullBackRate();
    this.abadonRate();
    this.waitTime();
    this.botSessionTime();
    this.sentimentsBOTCsat();
    this.BotTagst();
    this.averageToken();
    this.heatMap();
    this.fallBackRate();
    this.FallBackCount();


  }
  TotalConversation() {
    this._analytics.GetTotalBotConversation().subscribe(
      (res: any) => {
        this.botConversation = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);

      }
    );
  }
  TotalAgents(){
    this._analytics.GetTotalAgents().subscribe(
      (res: any) => {
        this.agents = res.detail;
        this.fallBackRate();
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot agents:", error);

      }
    );
  }
  AvgBotConversationTime(){
    this._analytics.GetAvgBotConversationTime().subscribe(
      (res: any) => {
        this.avgBotConversationTime = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the average bot converstion time:", error);

      }
    );
  }
  BotEsclationRate(){
    this._analytics.GetBotEsclationRate().subscribe(
      (res: any) => {
        this.botEsclationRate = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot esclation rate:", error);

      }
    );
  }
  AvgWaitTime(){
    this._analytics.GetAvgWaitTime().subscribe(
      (res: any) => {
        this.avgWaitTime = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot avgerage wait time:", error);

      }
    );
  }
  SentimentAnalysis(){
    this._analytics.GetSentimentAnalysis().subscribe(
      (res: any) => {
        this.sentimentAnalysis = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot sentiment analysis:", error);

      }
    );
  }
  TagsAnalatics(){
    this._analytics.GetTagsAnalatics().subscribe(
      (res: any) => {
        this.tagsAnalatics = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the tag analytics:", error);

      }
    );
  }
  PeakHours(){
    this._analytics.GetPeakHours().subscribe(
      (res: any) => {
        this.peakHours = res.detail;
        this.heatMap();
      },
      (error: any) => {
        console.error("An error occurred while fetching the peak hours:", error);

      }
    );
  }
  TotalToken() {
    this._analytics.TotalToken().subscribe(
      (res: any) => {
        this.totalTokenCount = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the total token:", error);

      }
    );
  }  
  AvgToken() {
    this._analytics.AvgToken().subscribe(
      (res: any) => {
        // const tokenData = res.tokens; 
        // const tokenValues = Object.values(tokenData) as number[];
        // const totalTokens = tokenValues.reduce((acc, value) => acc + value, 0);
        // const averageTokens = totalTokens / tokenValues.length;
        // this.avgTokenCount = averageTokens.toFixed(0);
        //res && res['avg tokens'] !== undefined
        this.avgTokenCount = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the avgerage token:", error);
      }
    );
  }
  TimeoutCount() {
    this._analytics.TimeoutCount().subscribe(
      (res: any) => {
        // const countData = res.count
        // const countKey = Object.keys(countData)[0];
        // this.sessiontimeout = countData[countKey];;
        this.sessiontimeout = res.detail;

      },
      (error: any) => {
        console.error("An error occurred while fetching the timeout count:", error);

      }
    );
  }
  TokenPerDay() {
    this._analytics.TokenPerDay().subscribe(
      (res: any) => {
        this.tokenPerDayCount = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the token per day:", error);

      }
    );
  }



  FallBackCount() {
    this._analytics.FallBackCount().subscribe(
      (res: any) => {
        const countData = res.count
        const countKey = Object.keys(countData)[0];
        this.fallbackRateCount = countData[countKey];;

      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);

      }
    );
  }



  totalBotConversation() {
    

    var chartDom = document.getElementById('main');
    this.totalBot = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          barWidth: '80%',
          areaStyle: {}
        }
      ]
    };
    option && this.totalBot.setOption(option);

  }
  botEscalationRate() {
    var chartDom = document.getElementById('BotRate');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && myChart.setOption(option);
  }
  fullBackRate() {
    var chartDom = document.getElementById('backRate');
    this.fallRate = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      xAxis: [
        {
          show: false,
          type: 'category',

          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          color: '#d475ef',
          type: 'bar',
          barWidth: '85%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && this.fallRate.setOption(option);
  }
  abadonRate() {
    var chartDom = document.getElementById('abadonRate');
    this.fallRate = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      xAxis: [
        {
          show: false,
          type: 'category',

          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          color: '#f8cf61',
          type: 'bar',
          barWidth: '85%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && this.fallRate.setOption(option);
  }
  waitTime() {
    var chartDom = document.getElementById('waitTime');
    this.fallRate = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      xAxis: [
        {
          show: false,
          type: 'category',

          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          color: '#a3a0fb',
          type: 'bar',
          barWidth: '85%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && this.fallRate.setOption(option);
  }
  botSessionTime() {
    var chartDom = document.getElementById('sessionTime');
    this.sessionTime = echarts.init(chartDom);
    var option;

    option = {


      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        icon: 'square',
        // bottom: 'right',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {

      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['8/1 ', '8/2', '8/3', '8/3', '8/4', '8/5', '8/6']
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
          lineStyle: {
            color: '#5470C6',
            type: 'dashed'
          }
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
          lineStyle: {
            color: '#5470C6',
            type: 'dashed'
          }
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
          lineStyle: {
            color: '#5470C6',
            type: 'dashed'
          }
        },


      ]
    };

    option && this.sessionTime.setOption(option);

  }
  sentimentsBOTCsat() {
    var chartDom = document.getElementById('analysisCsat');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);

  }
  BotTagst() {
    var chartDom = document.getElementById('Botatgs');
    var myChart = echarts.init(chartDom);
    var option;

    option = {


      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],

          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);

  }
  averageToken() {
    var chartDom = document.getElementById('average');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          color: 'rgb(188,186,251)',
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && myChart.setOption(option);

  }
  heatMap() {
    var chartDom = document.getElementById('heatMap');
    var myChart = echarts.init(chartDom);
    var option;

    // prettier-ignore
    const hours = [
      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p'
    ];
    // prettier-ignore
    const days = [
      'Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ];
    // prettier-ignore
    const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
      .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });
    option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }
  fallBackRate() {
    var chartDom = document.getElementById('fallbackrate');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'BOTS AGENT',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 0
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.agents.total_agents, name: 'Total Agent' },
            { value: this.agents.available_agents, name: 'Available Agent' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  }
  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.totalBot) {
        this.totalBot.resize();
      }
    });
  }
  makeCharte() {
    window.addEventListener('resize', () => {
      if (this.fallRate) {
        this.fallRate.resize();
      }
    });
  }
  makeChart() {
    window.addEventListener('resize', () => {
      if (this.sessionTime) {
        this.sessionTime.resize();
      }
    });
  }
}

