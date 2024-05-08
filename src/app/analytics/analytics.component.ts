import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{
  productData: any;
  productPrice: any[] = [];
  productCategory: any[] = [];
  productRate: any[] = [];
  productCount: any[] = [];
  productTitle: any[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.showData().subscribe((res) => {
      this.productData = res;

      if (this.productData != null) {
        for (let i = 0; i < this.productData.length; i++) {
          this.productPrice.push(this.productData[i].price);
          this.productRate.push(this.productData[i].rating.rate);
          this.productCount.push(this.productData[i].rating.count);
          this.productTitle.push(this.productData[i].title);
        }
        this.showChartData(
          'line',
          'lineChart',
          this.productRate,
          this.productPrice
        );
        this.showChartData(
          'bar',
          'barChart',
          this.productCount,
          this.productPrice
        );
        this.showChartData(
          'pie',
          'pieChart',
          this.productTitle,
          this.productCount
        );
        this.showChartData(
          'doughnut',
          'doughnutChart',
          this.productTitle,
          this.productPrice
        );
      }
    });
  }

  showChartData(type: any, id: any, labels: any[], data: any[]) {
    new Chart(id, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: data,
            backgroundColor: ['red', 'green', 'green', 'orange', 'orange', 'black', 'grey','purple', 'pink', 'brown', 'blue', 'cyan', 'peach', 'turquoise', 'magenta', 'green', 'teal', 'maroon', 'orange', 'coral', 'slate', 'mint', 'yellow'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
