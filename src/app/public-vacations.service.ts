import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicVacationsService {
  constructor(private http: HttpClient) {}

  vacURL = [
    'https://feiertage-api.de/api/?jahr=2019&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2020&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2021&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2022&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2023&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2024&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2025&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2026&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2027&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2028&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2029&nur_land=NW'
  ];
  result = ''; // ToDO remove this page

  async getConfig() {
    for (const url of this.vacURL) {
      await this.http.get(url).subscribe(data => {
        this.result += JSON.stringify(data);
        console.log('data: ', this.result);
      });
    } // TODO return when finished
    return this.result;
  }
}
