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
  peakHours: any[] = [];
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
    this.PeakHours();
    // this.FallBackCount();

    //Old
    this.totalBotConversation();
    this.botEscalationRate();
    this.fullBackRate();
    this.abadonRate();
    this.waitTime();
    this.botSessionTime();
    this.averageToken();
    // this.heatMap();
    // this.fallBackRate();



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
        this.sentimentsBOTCsat();
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
        this.BotTagst();
      },
      (error: any) => {
        console.error("An error occurred while fetching the tag analytics:", error);

      }
    );
  }
  peakhoursData:any[]=[]
  PeakHours(){
    this._analytics.GetPeakHours().subscribe(
      (res: any) => {
        this.peakHours = res.detail;
        let index=0;
        let hours=0;
       for (const [day, values] of Object.entries(this.peakHours)) {
       values.forEach((value: number, hour: number) => {
        this.peakhoursData.push([index, hour, value]);
       });
       index++;
       }
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
        this.fullBackRate();

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
        data: ['Facebook', 'Whatsapp', 'Website', 'Direct', 'Search Engine'],
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
          name: 'Facebook',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
          lineStyle: {
            color: '#5470C6',
            type: 'dashed'
          }
        },
        {
          name: 'Whatsapp',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
          lineStyle: {
            color: '#5470C6',
            type: 'dashed'
          }
        },
        {
          name: 'Website',
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
          name: 'Sentiment Form',
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
            { value: this.sentimentAnalysis?.Positive, name: 'Positive' },
            { value: this.sentimentAnalysis?.Negative, name: 'Negative' },
            { value: this.sentimentAnalysis?.Neutral, name: 'Neutral' }
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
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Tags From',
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
            { value: this.tagsAnalatics?.Information, name: 'Information' },
            { value: this.tagsAnalatics?.Sell, name: 'Sell' },
            { value: this.tagsAnalatics?.Analysis, name: 'Analysis' },
            { value: this.tagsAnalatics?.Reservation, name: 'Reservation' },
            { value: this.tagsAnalatics?.Complaint, name: 'Complaint' }
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
      'Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    // prettier-ignore
    const data = this.peakhoursData
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
          name: 'Peak Hours',
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

