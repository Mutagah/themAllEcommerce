/*Angular imports */
import { Component, OnInit } from '@angular/core';

/*Chart Js imports */
import { Chart } from 'chart.js/auto';

/*Service imports */
import { UsersService } from '../users.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: any) => {
        let cityOccurence: any = {};
        let userRolesTrack: any = {};
        let totalUsers = users.length;
        users.forEach((user: any) => {
          if (cityOccurence[user.address.city]) {
            cityOccurence[user.address.city]++;
          } else {
            cityOccurence[user.address.city] = 1;
          }

          if (userRolesTrack[user.role]) {
            userRolesTrack[user.role]++;
          } else {
            userRolesTrack[user.role] = 1;
          }
        });
        let percentageObjValues: any = {};

        for (const key in cityOccurence) {
          if (Object.prototype.hasOwnProperty.call(cityOccurence, key)) {
            percentageObjValues[key] = (cityOccurence[key] / totalUsers) * 100;
          }
        }
        this.renderChart(
          'bar-graph',
          'bar',
          percentageObjValues,
          'People % in cities'
        );
        this.renderChart(
          'pie-chart',
          'pie',
          userRolesTrack,
          'Company role distribution'
        );
        this.renderChart(
          'line-chart',
          'line',
          cityOccurence,
          'People in cities'
        );
      },
      error: (error) => console.log(error),
    });
  }

  renderChart(id: any, type: any, data: any, label: any) {
    new Chart(id, {
      type: type,
      data: {
        /* labels is data along the x axis*/
        labels: Object.keys(data),
        datasets: [
          {
            label: label,
            /*
            - Data is whatever is rendered along the y axis
            - The length of the data array should be equal to the length of the labels array
            */
            data: Object.values(data),
            border: 1,
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
