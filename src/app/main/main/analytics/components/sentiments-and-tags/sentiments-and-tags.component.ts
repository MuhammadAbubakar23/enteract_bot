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
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Sentiments and Tags',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.SentimentAnalysis()
    this.humanCsat()
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
}
