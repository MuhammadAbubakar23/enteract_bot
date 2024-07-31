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
    this.fallBackRate()
    this.getTotalConversation()
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
