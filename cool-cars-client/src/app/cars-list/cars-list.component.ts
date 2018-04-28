import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Car } from '../domain/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: Observable<Car[]>;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getCoolCars();
  }

}
