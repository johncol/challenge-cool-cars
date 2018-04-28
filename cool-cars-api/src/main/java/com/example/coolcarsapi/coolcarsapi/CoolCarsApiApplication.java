package com.example.coolcarsapi.coolcarsapi;

import com.example.coolcarsapi.coolcarsapi.domain.Car;
import com.example.coolcarsapi.coolcarsapi.repository.CarRepository;
import java.util.stream.Stream;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
@SpringBootApplication
public class CoolCarsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoolCarsApiApplication.class, args);
	}

	@Bean
  public CommandLineRunner addCars(CarRepository repository) {
    return arts -> Stream.of("Ferrari", "Jaguar", "Porsche", "Lamborghini", "Bugatti", "AMC Gremlin", "Triumph Stag", "Ford Pinto", "Yugo GV")
        .map(Car::new)
        .map(repository::save)
        .forEach(System.out::println);
  }

}
