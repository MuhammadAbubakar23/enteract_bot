import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import * as echarts from 'echarts';
import { AnalyticsService } from '../../service/analytics.service';
@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent {
  avgTokenCount: any
  totalTokenCount: any
  tokenPerDayCount: any;
  averageTokenPerChat: any;
  constructor(private _hS: HeaderService, private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Tokens',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.AverageTokenPerChat();
    this.TotalToken();
    this.AvgToken();
    this.TokenPerDay();
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
        this.avgTokenCount = res.detail;
      },
      (error: any) => {
        console.error("An error occurred while fetching the avgerage token:", error);
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

  AverageTokenPerChat() {
    this._analytics.GetAverageTokenPerChat().subscribe((response: any) => {
      this.averageTokenPerChat = response.detail
      const counts = [
        response.detail.Monday[0],
        response.detail.Tuesday[0],
        response.detail.Wednesday[0],
        response.detail.Thursday[0],
        response.detail.Friday[0],
        response.detail.Saturday[0],
        response.detail.Sunday[0]
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
}
