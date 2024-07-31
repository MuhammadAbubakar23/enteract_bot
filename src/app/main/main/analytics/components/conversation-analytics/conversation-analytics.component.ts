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
  agents: any;
  avgBotConversationTime: any;
  tagsAnalatics: any;
  totalAgentChart:any;
  botTagsChart:any;
  constructor(private _hS: HeaderService,private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Conversation Analytics',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.TotalConversation();
    this.TotalAgents();
    this.AvgBotConversationTime();
    this.TagsAnalatics();

    this.botEscalationRate();
    this.botConversationOverTime();
  }
  TotalConversation() {
    this._analytics.GetTotalBotConversation().subscribe(
      (res: any) => {
        this.botConversation = res?.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);

      }
    );
  }
  TotalAgents(){
    this._analytics.GetTotalAgents().subscribe(
      (res: any) => {
        this.agents = res?.detail;
        this.fallBackRate();
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot agents:", error);

      }
    );
  }
  fallBackRate() {
    var chartDom = document.getElementById('fallbackrate');
   this.totalAgentChart = echarts.init(chartDom);
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

    
    option && this.totalAgentChart.setOption(option);
  }

  AvgBotConversationTime(){
    this._analytics.GetAvgBotConversationTime().subscribe(
      (res: any) => {
        this.avgBotConversationTime = res?.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the average bot converstion time:", error);

      }
    );
  }
  TagsAnalatics(){
    this._analytics.GetTagsAnalatics().subscribe(
      (res: any) => {
        this.tagsAnalatics = res?.detail;
        this.BotTagst();
      },
      (error: any) => {
        console.error("An error occurred while fetching the tag analytics:", error);

      }
    );
  }
  BotTagst() {
    var chartDom = document.getElementById('Botatgs');
    this.botTagsChart = echarts.init(chartDom);
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
            { value: this.tagsAnalatics?.Information, name: 'Information', 
              itemStyle: {
              color: '#2f9df2'
            }},
            { value: this.tagsAnalatics?.Sell, name: 'Sell',
              itemStyle: {
              color: '#cf61ea'
            }},
            { value: this.tagsAnalatics?.Analysis, name: 'Analysis',
            itemStyle: {
              color: '#9c87ee'
            }},
            { value: this.tagsAnalatics?.Reservation, name: 'Reservation',
            itemStyle: {
              color: '#ff505c'
            }},
            { value: this.tagsAnalatics?.Complaint, name: 'Complaint',
            itemStyle: {
              color: '#3cc2cc'
            }}
          ]
        }
      ]
    };

    option &&  this.botTagsChart.setOption(option);

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
  botConversationOverTime() {
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
