import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HeaderService } from 'src/app/services/header.service';
import { AnalyticsService } from '../../service/analytics.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ai-bot-analytics',
  templateUrl: './ai-bot-analytics.component.html',
  styleUrls: ['./ai-bot-analytics.component.scss']
})
export class AiBotAnalyticsComponent {
  totalBot: any
  filterDays:any = 7;
  fallRate: any;
  sessionTime: any;
  botConversation: any;
  sessiontimeout: any;
  fallbackRateCount: any = 0;
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
  peakhoursData: any[] = []
  humanTransferRateData: any;
  averageTokenPerChat: any;
  totalBotSessionsOvertimeData: any;
  timeSpan: any = "week";
selectedTimeLabel: any ="Last 7 days";
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService, private spinner: NgxSpinnerService) {
    _hS.updateHeaderData({
      title: 'Ai Bot Analytics',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.refreshCharts()
    localStorage.setItem("filterDays", this.filterDays);
    localStorage.setItem("timeSpan", this.timeSpan);
  }
  get getTimeSpan(){
    return localStorage.getItem("timeSpan")
  }
  refreshFilters(NumberOfDays:any, timeSpan:any, selectedTimeLabel:any){
    this.filterDays = NumberOfDays;
    this.timeSpan = timeSpan;
    this.selectedTimeLabel = selectedTimeLabel;
    // const filterDays = { filterDays: this.filterDays, timeSpan: this.timeSpan };
    localStorage.setItem("filterDays", this.filterDays);
    localStorage.setItem("timeSpan", this.timeSpan);
    this.refreshCharts();
  }
  refreshCharts(){
    this.HumanTransferRate();
    this.AverageTokenPerChat();
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
    this.conversationOverTime();
    this.totalBotSessionOvertime();
  }
  TotalConversation() {
    this.spinner.show()
    this._analytics.GetTotalBotConversation().subscribe(
      (res: any) => {
        this.botConversation = res;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);
        this.spinner.hide()
      }
    );
  }
  TotalAgents() {
    this.spinner.show()
    this._analytics.GetTotalAgents().subscribe(
      (res: any) => {
        this.agents = res.detail;
        this.fallBackRate();
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot agents:", error);
        this.spinner.hide()
      }
    );
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

          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
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
              fontSize: 50,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.agents?.total_agents, name: 'Total Agents', itemStyle: { color: '#2f9df2' } },
            { value: this.agents?.available_agents, name: 'Available Agents', itemStyle: { color: '#cf61ea' } }
          ]
        }
      ]
    };


    option && myChart.setOption(option);
  }

  AvgBotConversationTime() {
    this.spinner.show()
    this._analytics.GetAvgBotConversationTime().subscribe(
      (res: any) => {
        this.avgBotConversationTime = res;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the average bot converstion time:", error);
        this.spinner.hide()
      }
    );
  }
  BotEsclationRate() {
    this.spinner.show()
    this._analytics.GetBotEsclationRate().subscribe(
      (res: any) => {
        this.botEsclationRate = res;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot esclation rate:", error);
        this.spinner.hide()
      }
    );
  }
  getIntegerPart(rate: number): number {
    return parseFloat((rate > 0 ? rate : 0).toFixed(2));
  }
  AvgWaitTime() {
    this.spinner.show()
    this._analytics.GetAvgWaitTime().subscribe(
      (res: any) => {
        this.avgWaitTime = res;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot avgerage wait time:", error);
        this.spinner.hide()
      }
    );
  }
  SentimentAnalysis() {
    this.spinner.show()
    this._analytics.GetSentimentAnalysis().subscribe(
      (res: any) => {
        this.sentimentAnalysis = res;
        this.sentimentsBOTCsat();
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot sentiment analysis:", error);
        this.spinner.hide()
      }
    );
  }
  TagsAnalatics() {
    this.spinner.show()
    this._analytics.GetTagsAnalatics().subscribe(
      (res: any) => {
        this.tagsAnalatics = res.detail;
        this.BotTagst();
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the tag analytics:", error);
        this.spinner.hide()
      }
    );
  }

  PeakHours() {
    this.spinner.show()
    this._analytics.GetPeakHours().subscribe(
      (res: any) => {
        this.peakHours = res.detail;
        let index = 0;
        let hours = 0;
        for (const [day, values] of Object.entries(this.peakHours)) {
          values.forEach((value: number, hour: number) => {
            this.peakhoursData.push([index, hour, value]);
          });
          index++;
        }
        this.heatMap();
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the peak hours:", error);
        this.spinner.hide()
      }
    );
  }
  TotalToken() {
    this.spinner.show()
    this._analytics.TotalToken().subscribe(
      (res: any) => {
        this.totalTokenCount = res.detail;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the total token:", error);
        this.spinner.hide()
      }
    );
  }
  AvgToken() {
    this.spinner.show()
    this._analytics.AvgToken().subscribe(
      (res: any) => {
        // const tokenData = res.tokens; 
        // const tokenValues = Object.values(tokenData) as number[];
        // const totalTokens = tokenValues.reduce((acc, value) => acc + value, 0);
        // const averageTokens = totalTokens / tokenValues.length;
        // this.avgTokenCount = averageTokens.toFixed(0);
        //res && res['avg tokens'] !== undefined
        this.avgTokenCount = res.detail;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the avgerage token:", error);
        this.spinner.hide()
      }
    );
  }
  TimeoutCount() {
    this.spinner.show()
    this._analytics.TimeoutCount().subscribe(
      (res: any) => {
        // const countData = res.count
        // const countKey = Object.keys(countData)[0];
        // this.sessiontimeout = countData[countKey];;
        this.sessiontimeout = res;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the timeout count:", error);
        this.spinner.hide()
      }
    );
  }
  TokenPerDay() {
    this.spinner.show()
    this._analytics.TokenPerDay().subscribe(
      (res: any) => {
        this.tokenPerDayCount = res.detail;
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the token per day:", error);
        this.spinner.hide()
      }
    );
  }



  FallBackCount() {
    this.spinner.show()
    this._analytics.FallBackCount().subscribe(
      (res: any) => {
        const countData = res.count
        const countKey = Object.keys(countData)[0];
        this.fallbackRateCount = countData[countKey];;
        //this.fullBackRate();
        this.spinner.hide()
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);
        this.spinner.hide()

      }
    );
  }

  conversationOverTime() {
    this.spinner.show()
    this._analytics.ConversationOverTimeData(1).subscribe((response: any) => {
      const counts = [
        response.detail.Monday[0],
        response.detail.Tuesday[0],
        response.detail.Wednesday[0],
        response.detail.Thursday[0],
        response.detail.Friday[0],
        response.detail.Saturday[0],
        response.detail.Sunday[0]
      ];
      this.totalBotConversation(counts);
      this.spinner.hide()
    },
      (error: any) => {
        console.error(error.error);
      }
    )
  }

  totalBotConversation(count: any) {
    const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = count;
    var chartDom = document.getElementById('main');
    this.totalBot = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const date = params[0].name;
          const conversationCount = params[0].value;
          return `${date}<br/>Conversations: ${conversationCount}`;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: counts,
          type: 'line',
          areaStyle: {
            color: 'rgba(0, 123, 255, 0.5)'
          },
          lineStyle: {
            color: '#007bff',
            width: 3
          },
          itemStyle: {
            color: '#007bff'
          },
          barWidth: '80%',
        }
      ]
    };
    option && this.totalBot.setOption(option);

  }

  HumanTransferRate() {
    this.spinner.show()
    this._analytics.GethumanTransferRate().subscribe((response: any) => {
      this.spinner.hide()
      this.humanTransferRateData = response.detail;
      const counts = [
        response.detail.Monday[0],
        response.detail.Tuesday[0],
        response.detail.Wednesday[0],
        response.detail.Thursday[0],
        response.detail.Friday[0],
        response.detail.Saturday[0],
        response.detail.Sunday[0]
      ];
      counts.forEach((count:any)=>{
        this.fallbackRateCount = this.fallbackRateCount+count;
      })
      setTimeout(() => {
        this.botEscalationRate(counts);
      })
    })
  }
  botEscalationRate(counts: any) {
    const formattedDates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = counts;
    var chartDom = document.getElementById('BotRate');
    var myChart = echarts.init(chartDom);

    var option;

    option = {
      tooltip: {
        trigger: 'axis',
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
          data: formattedDates,
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
          name: 'Escalations',
          type: 'bar',
          barWidth: '40%',
          data: values,
          itemStyle: {
            color: '#007bff'
          },
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
  totalBotSessionOvertime() {
    this._analytics.GetTotalBotSessionsOvertime().subscribe((response: any) => {
      this.totalBotSessionsOvertimeData = response.detail;
      const avg_handle_time = [
        response.detail.Monday.avg_handle_time,
        response.detail.Tuesday.avg_handle_time,
        response.detail.Wednesday.avg_handle_time,
        response.detail.Thursday.avg_handle_time,
        response.detail.Friday.avg_handle_time,
        response.detail.Saturday.avg_handle_time,
        response.detail.Sunday.avg_handle_time
      ];
      const human_transfer_rate = [
        response.detail.Monday.human_transfer_rate,
        response.detail.Tuesday.human_transfer_rate,
        response.detail.Wednesday.human_transfer_rate,
        response.detail.Thursday.human_transfer_rate,
        response.detail.Friday.human_transfer_rate,
        response.detail.Saturday.human_transfer_rate,
        response.detail.Sunday.human_transfer_rate
      ];
      const session_timeout = [
        response.detail.Monday.session_timeout,
        response.detail.Tuesday.session_timeout,
        response.detail.Wednesday.session_timeout,
        response.detail.Thursday.session_timeout,
        response.detail.Friday.session_timeout,
        response.detail.Saturday.session_timeout,
        response.detail.Sunday.session_timeout
      ];
      setTimeout(() => {
        this.botSessionTime(avg_handle_time, human_transfer_rate, session_timeout)
      })
    })
  }
  botSessionTime(avg_handle_time: any, human_transfer_rate: any, session_timeout: any) {

    // const allDates = ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05', '2024-07-06', '2024-07-07'];
    const formattedDates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const timeoutData = session_timeout;
    const fallbackData = human_transfer_rate;
    const averageHandleTime = avg_handle_time
    
    var chartDom = document.getElementById('sessionTime');
    this.sessionTime = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Average Handle Time', 'Session Timeout', 'Human Transfer rate'],
        icon: 'square',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: formattedDates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Average Handle Time',
          type: 'line',
          stack: 'Total',
          data: averageHandleTime,
          lineStyle: {
            color: '#FAC858',
          }
        },
        {
          name: 'Session Timeout',
          type: 'line',
          stack: 'Total',
          data: timeoutData,
          lineStyle: {
            color: '#91CC75',
          }
        },
        {
          name: 'Human Transfer rate',
          type: 'line',
          stack: 'Total',
          data: fallbackData,
          lineStyle: {
            color: '#6a4fe3',
          }
        }
      ]
    };

    option && this.sessionTime.setOption(option);

  }
  sentimentsBOTCsat() {
    var chartDom = document.getElementById('analysisCsat');
    var myChart = echarts.init(chartDom);
    const sentiments = this.sentimentAnalysis;
    const totalSentiments = sentiments?.positive + sentiments?.negative + sentiments?.neutral;
    const data = [
      {
        value: sentiments?.positive,
        name: 'Positive',
        itemStyle: {
          color: '#90EE90'
        }
      },
      {
        value: sentiments?.negative,
        name: 'Negative',
        itemStyle: {
          color: '#fa7373'
        }
      },
      {
        value: sentiments?.neutral,
        name: 'Neutral',
        itemStyle: {
          color: '#f7c465'
        }
      }
    ];

    var option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Sentiments',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: function () {
              // Apply the thousandSuff logic directly here
              const formatValue = (value: number): string => {
                if (value >= 1000000) {
                  return (value / 1000000).toFixed(1) + 'M';
                }
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'K';
                }
                return value.toString();
              };
              return `\n${formatValue(totalSentiments)}\n{interaction|Interactions}`;
            },
            rich: {
              interaction: {
                fontSize: 12,
                padding: [10, 0, 0, 0]
              }
            },
            fontSize: 20,
            fontWeight: 'bold'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 24,
              fontWeight: 'bold',
              formatter: '{c}'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };

    //option.series[0].label.formatter = `\n${totalSentiments}\n{interaction|Interactions}`;
    myChart.setOption(option);

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
            {
              value: this.tagsAnalatics?.Information, name: 'Information',
              itemStyle: {
                color: '#2f9df2'
              }
            },
            {
              value: this.tagsAnalatics?.Sell, name: 'Sell',
              itemStyle: {
                color: '#cf61ea'
              }
            },
            {
              value: this.tagsAnalatics?.Analysis, name: 'Analysis',
              itemStyle: {
                color: '#9c87ee'
              }
            },
            {
              value: this.tagsAnalatics?.Reservation, name: 'Reservation',
              itemStyle: {
                color: '#ff505c'
              }
            },
            {
              value: this.tagsAnalatics?.Complaint, name: 'Complaint',
              itemStyle: {
                color: '#3cc2cc'
              }
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);

  }

  AverageTokenPerChat() {
    this._analytics.GetAverageTokenPerChat().subscribe((response: any) => {
      this.averageTokenPerChat = response.detail
      const counts = [
        parseFloat(response.detail.Monday[0].toFixed(2)),
        parseFloat(response.detail.Tuesday[0].toFixed(2)),
        parseFloat(response.detail.Wednesday[0].toFixed(2)),
        parseFloat(response.detail.Thursday[0].toFixed(2)),
        parseFloat(response.detail.Friday[0].toFixed(2)),
        parseFloat(response.detail.Saturday[0].toFixed(2)),
        parseFloat(response.detail.Sunday[0].toFixed(2))
      ];
      // this.botEscalationRate(counts);
      setTimeout(() => {
        this.averageToken(counts);
      })
    })
  }

  averageToken(counts: any) {
    var count = counts
    const formattedDates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
          data: formattedDates,
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
          data: count
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
      '0', '1', '2', '3', '4', '5', '6',
      '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23'
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
        bottom: '15%',
        inRange: {
          color: ['#b9ddf4', '#0e90e2']
        }
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

