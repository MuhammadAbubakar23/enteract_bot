import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import * as echarts from 'echarts';
import { AnalyticsService } from '../../service/analytics.service';

@Component({
  selector: 'app-sentiments-and-tags',
  templateUrl: './sentiments-and-tags.component.html',
  styleUrls: ['./sentiments-and-tags.component.scss']
})
export class SentimentsAndTagsComponent {
  sentimentAnalysis: any;
  filterDays:any = 7;
  timeSpan: any = "week";
selectedTimeLabel: any ="Last 7 days";
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Sentiments and Tags',
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
    this.SentimentAnalysis()
    this.humanCsat()
  }
  SentimentAnalysis(){
    this._analytics.GetSentimentAnalysis().subscribe(
      (res: any) => {
        this.sentimentAnalysis = res;
        this.sentimentsBOTCsat();
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot sentiment analysis:", error);

      }
    );
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
          color: '#abedd0'
        }
      },
      {
        value: sentiments?.negative,
        name: 'Negative',
        itemStyle: {
          color: '#ffcccf'
        }
      },
      {
        value: sentiments?.neutral,
        name: 'Neutral',
        itemStyle: {
          color: '#ffe0b3'
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
            formatter: function() {
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
  humanCsat() {
    var chartDom = document.getElementById('humanCsat');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Human Agent From',
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
            { value: 1048, name: 'Positive',itemStyle: {color: '#abedd0'}},
            { value: 735, name: 'Negative',itemStyle: {color: '#ffcccf'}},
            { value: 580, name: 'Neutral',itemStyle: {color: '#ffe0b3'}}
          ]
        }
      ]
    };

    option && myChart.setOption(option);

  }
}
