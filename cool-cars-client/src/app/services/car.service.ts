import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Car } from '../domain/car.model';
import { GiphyService } from './giphy.service';

@Injectable()
export class CarService {

  readonly host: string = '//localhost:8080';
  readonly api: string = 'cars';

  constructor(
    private http: HttpClient,
    private giphy: GiphyService
  ) { }

  getCoolCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.host}/cool-cars`)
      .do(cars => {
        cars.forEach(car => this.addGiphyUrlTo(car));
      });
  }

  get(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.host}/${this.api}/${id}`)
      .do(car => this.addGiphyUrlTo(car));
  }

  save(car: Car): Observable<any> {
    if (car.href != null) {
      return this.http.put(car.href, car);
    }
    return this.http.post(`${this.host}/${this.api}`, car);
  }

  remove(car: Car): Observable<any> {
    return this.http.delete(car.href);
  }

  private addGiphyUrlTo(car: Car): void {
    car.giphyUrl = this.giphy.of(car.name);
  }

}
