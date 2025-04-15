package com.flourmillapi.APIs.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {

    @Id
    //it will automatically generate the Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String flourType; // ghehoon, Bajra etc..

    private LocalDateTime inTime;
    private LocalDateTime outTime;


    private double quantity; // in kg
    private double total;
    private double unitPrice; // per kg
//    private double total;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;

}
