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
  avgTokenCount:any
  totalTokenCount:any
  constructor(private _hS: HeaderService,private _analytics: AnalyticsService) {
    _hS.updateHeaderData({
      title: 'Tokens',
      tabs: [{ title: '', url: '', isActive: true }],
      isTab: false,
      class: "fa-light fa-chart-line-up"
    })
  }
  ngOnInit(): void {
    this.averageToken();
    this.TotalToken()
    this.AvgToken()
  }
  AvgToken() {
    this._analytics.AvgToken().subscribe(
      (res: any) => {
        // const tokenData = res.tokens; 
        // const tokenValues = Object.values(tokenData) as number[];
        // const totalTokens = tokenValues.reduce((acc, value) => acc + value, 0);
        // const averageTokens = totalTokens / tokenValues.length;
        // this.avgTokenCount = averageTokens.toFixed(0);
        res && res['avg tokens'] !== undefined
        this.avgTokenCount = res['avg tokens'];
      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);
      }
    );
  }
  TotalToken() {
    this._analytics.TotalToken().subscribe(
      (res: any) => {
        res && res['total tokens'] !== undefined
        this.totalTokenCount = res['total tokens'];


      },
      (error: any) => {
        console.error("An error occurred while fetching the bot conversation:", error);

      }
    );
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
}
