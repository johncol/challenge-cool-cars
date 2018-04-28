import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from '../domain/car.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  car: Car;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.configureForm();
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.fetchCar(params).then(car => {
        this.form.get('name').setValue(car.name);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription && !this.paramsSubscription.closed) {
      this.paramsSubscription.unsubscribe();
    }
  }

  navigateToCarList(): void {
    this.router.navigate(['/car-list']);
  }

  save(): void {
    this.carService.save({ 
      name: this.form.value.name,
      href: this.car ? this.car.href : null
    }).subscribe(
      response => this.navigateToCarList(),
      error => console.log(error)
    );
  }

  remove(): void {
    this.carService.remove(this.car).subscribe(
      response => this.navigateToCarList(),
      error => console.log(error)
    );
  }

  private configureForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }
  
  private fetchCar(params: any): Promise<Car> {
    return new Promise((resolve, reject) => {
      this.carService.get(params.id).subscribe(car => {
        if (!car) {
          this.navigateToCarList();
        } else {
          car.href = car._links.self.href;
          this.car = car;
          resolve(car);
        }
      });
    });
  }

}
