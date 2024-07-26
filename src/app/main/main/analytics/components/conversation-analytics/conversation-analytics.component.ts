import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import * as echarts from 'echarts';
import { AnalyticsService } from '../../service/analytics.service';
@Component({
  selector: 'app-conversation-analytics',
  templateUrl: './conversation-analytics.component.html',
  styleUrls: ['./conversation-analytics.component.scss']
})
export class ConversationAnalyticsComponent {
  totalBot: any;
  fallback: any
  humanbot: any;
  botConversation: any;
  constructor(private _hS: HeaderService,private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Conversation Analytics',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.totalBotConversation();
    this.botEscalationRate();
    this.BotTagst();
    this.fallBackRate()
    this.getTotalConversation()
  }
  getTotalConversation() {
    this._analytics.GetTotalBotConversation().subscribe(
      (res: any) => {
        this.botConversation = res;

      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);

      }
    );
  }

  botEscalationRate() {
    var chartDom = document.getElementById('BotRate');
    this.humanbot = echarts.init(chartDom);
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
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    option && this.humanbot.setOption(option);
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
          areaStyle: {}
        }
      ]
    };
    option && this.totalBot.setOption(option);

  }
  fallBackRate() {
    var chartDom = document.getElementById('fallbackrate');
    this.fallback= echarts.init(chartDom);
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
    
          ]
        }
      ]
    };

    option && this.fallback.setOption(option);
  }
  makeChart() {
    window.addEventListener('resize', () => {
      if (this.fallback) {
        this.fallback.resize();
      }
    });
  }
  human() {
    window.addEventListener('resize', () => {
      if (this.humanbot) {
        this.humanbot.resize();
      }
    });
  }
}
