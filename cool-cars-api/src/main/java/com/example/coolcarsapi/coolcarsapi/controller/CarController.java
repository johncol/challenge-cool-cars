package com.example.coolcarsapi.coolcarsapi.controller;

import com.example.coolcarsapi.coolcarsapi.domain.Car;
import com.example.coolcarsapi.coolcarsapi.repository.CarRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CarController {

  private final CarRepository repository;

  @Autowired
  public CarController(CarRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/cool-cars")
  public List<Car> getCoolCars() {
    return repository.findAll()
        .stream()
        .filter(this::isCoolCar)
        .collect(Collectors.toList());
  }

  private boolean isCoolCar(Car car) {
    return !car.getName().equals("AMC Gremlin") &&
        !car.getName().equals("Triumph Stag") &&
        !car.getName().equals("Ford Pinto") &&
        !car.getName().equals("Yugo GV");
  }

}
