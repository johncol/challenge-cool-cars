package com.example.coolcarsapi.coolcarsapi.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Car {

  @Id
  @GeneratedValue
  private Long id;

  @NonNull
  private String name;

  public Car(String name) {
    this.name = name;
  }
}
