package com.example.coolcarsapi.coolcarsapi.config;

import java.util.Collections;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

  @Bean
  public FilterRegistrationBean simpleCorsFilter() {
    CorsConfiguration configuration = configureCorsPolicy();
    CorsFilter corsFilter = createCorsFilterGiven(configuration);
    FilterRegistrationBean<CorsFilter> filterRegistration = registerFilter(corsFilter);
    return filterRegistration;
  }

  private CorsConfiguration configureCorsPolicy() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
    config.setAllowedHeaders(Collections.singletonList("*"));
    config.setAllowedMethods(Collections.singletonList("*"));
    return config;
  }

  private CorsFilter createCorsFilterGiven(CorsConfiguration config) {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }

  private FilterRegistrationBean<CorsFilter> registerFilter(CorsFilter corsFilter) {
    FilterRegistrationBean<CorsFilter> filterRegistrationBean = new FilterRegistrationBean<>(corsFilter);
    filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return filterRegistrationBean;
  }

}
