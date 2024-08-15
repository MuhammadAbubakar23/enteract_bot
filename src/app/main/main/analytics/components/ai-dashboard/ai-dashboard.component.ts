import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { AnalyticsService } from '../../service/analytics.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as echarts from 'echarts';
@Component({
  selector: 'app-ai-dashboard',
  templateUrl: './ai-dashboard.component.html',
  styleUrls: ['./ai-dashboard.component.scss']
})
export class AiDashboardComponent implements OnInit {
  sessionChart: any;
  totalSessionsData: any;
  filterDays: any = 7;
  timeSpan: any = "week";
  selectedTimeLabel: any = "Last 7 days";
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService, private spinnerServerice: NgxSpinnerService) {
    _hS.updateHeaderData({
      title: 'Dashboard',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.refreshCharts();
  }
  refreshFilters(NumberOfDays: any, timeSpan: any, selectedTimeLabel: any) {
    this.filterDays = NumberOfDays;
    this.timeSpan = timeSpan;
    this.selectedTimeLabel = selectedTimeLabel;
    // const filterDays = { filterDays: this.filterDays, timeSpan: this.timeSpan };
    localStorage.setItem("filterDays", this.filterDays);
    localStorage.setItem("timeSpan", this.timeSpan);
    this.refreshCharts();
  }
  refreshCharts() {
    this.totalMessages();
    this.sessionExpiryChart();
    this.messagesChart();
    this.usersChart();
    this.totalSessions();
    this.conversationOverTime();
  }

  totalSessions() {
    this._analytics.GetTotalBotConversation().subscribe((res: any) => {
      this.totalSessionsData = res
    })
  }
  conversationOverTime() {
    this._analytics.ConversationOverTimeData(1).subscribe(
      (response: any) => {
        const detail = response.detail;

        const daysOrMonths = Object.keys(detail).reverse();
        const counts = daysOrMonths.map(day => detail[day]);
        const formattedDaysOrMonths = daysOrMonths.map(date => {
          const [year, month, day] = date.split('-');
          return `${parseInt(month)}/${parseInt(day)}`;
        });
        this.totalBotConversation(counts, formattedDaysOrMonths);

        console.log(daysOrMonths);

      },
      (error: any) => {
        console.error(error.error);
      }
    );
  }

  totalBotConversation(count: any, date: any) {
    const dates = date;
    const counts = count;
    var chartDom = document.getElementById('totalSession');
    var myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const date = params[0].name;
          const conversationCount = params[0].value;
          return `${date}<br/>Conversations: ${conversationCount}`;
        }
      },
      legend: {
        data: ['All Chatbots'],
        icon: 'square',
      },
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        // axisLabel: {
        //   rotate: 45,
        //   interval: 0
        // }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: counts,
          name: 'All Chatbots',
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
    option && myChart.setOption(option);
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  }


  totalMessages() {
    var chartDom = document.getElementById('totalMessages');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Inbound', 'Outbound'],
        icon: 'square',
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
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Inbound',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(52,199,213,255)'
              },
              {
                offset: 1,
                color: 'rgb(52,199,213,255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Outbound',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(130,221,176,255)'
              },
              {
                offset: 1,
                color: 'rgb(130,221,176,255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        }
      ]
    };
    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  }
  sessionExpiryChart() {
    var chartDom = document.getElementById('sessionExpiry');
    var myChart = echarts.init(chartDom);
    var option;
    var data = [
      { value: 300, name: 'Expired Session' },
      { value: 484, name: 'Agent Takeover' },
      { value: 580, name: 'Go to Agent Action' },
      { value: 735, name: 'Close session action' },
      { value: 1048, name: 'user closed session' }
    ];
    var total = data.reduce((sum, item) => sum + item.value, 0);

    option = {
      title: {
        text: `${total}\nSessions`,
        left: 'center',
        top: '30%',
        textAlign: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          lineHeight: 24
        }
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['55%', '80%'],
          center: ['40.5%', '44%'],

          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 10,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  }

  messagesChart() {
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: '900\n Messages',
        left: 'center',
        top: '50%',
        textAlign: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 24
        }
      },
      series: [
        {
          label: {
            show: false // Disable labels on pie slices
          },
          name: 'Access From',
          type: 'pie',
          radius: ['90%', '100%'],
          center: ['43.5%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            {
              value: 500,
              name: 'Search Engine',
              itemStyle: {
                color: 'rgba(163, 161, 251, 1)'
                // Adjust alpha value to 1 for full opacity
              }
            },
            {
              value: 400,
              name: 'Direct',
              itemStyle: {
                color: 'rgba(255, 124, 195, 1)'
                // Adjust alpha value to 1 for full opacity
              }
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  }
  usersChart() {
    var chartDom = document.getElementById('users');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: '113\nTotal Users',
        left: 'center',
        top: '50%',
        textAlign: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'Bold',
          lineHeight: 24
        }
      },
      series: [
        {
          label: {
            show: false // Disable labels on pie slices
          },
          name: 'Access From',
          type: 'pie',
          radius: ['90%', '100%'],
          center: ['43%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            {
              value: 100,
              name: 'Search Engine',
              itemStyle: {
                color: 'rgba(60,196,128,255)' // Adjust alpha value to 1 for full opacity
              }
            },
            {
              value: 13,
              name: 'Direct',
              itemStyle: {
                color: 'rgba(84,176,242,255)'
              }
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  }
  ngOnDestroy(){
    localStorage.setItem("filterDays", "7");
    localStorage.setItem("timeSpan", "week");
  }
}
