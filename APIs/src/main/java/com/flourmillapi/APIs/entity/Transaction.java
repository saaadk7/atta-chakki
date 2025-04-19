//package com.flourmillapi.APIs.entity;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//
//@Component
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class Transaction {
//
//    @Id
//    //it will automatically generate the Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long Id;
//
//    private String flourType; // ghehoon, Bajra etc..
//
//    private LocalDateTime inTime;
//    private LocalDateTime outTime;
//
//
//    private double quantity; // in kg
//    private double total;
//    private double unitPrice; // per kg
////    private double total;
//
//    @Transient
//    private String customerName;
//
//    @PostLoad
//    private void setCustomerName() {
//        if (customer != null) {
//            this.customerName = customer.getName();
//        }
//    }
//
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id")
//    @JsonBackReference
//    private Customer customer;
//
//
//}
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flourType; // ghehoon, Bajra etc.

    private LocalDateTime inTime;
    private LocalDateTime outTime;

    private double quantity; // in kg
    private double total;
    private double unitPrice; // per kg

    @Transient
    private String customerName; // Transient means it's not stored in the database.

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;

    // Automatically set the customerName before saving or updating the transaction
    @PrePersist
    @PreUpdate
    private void setCustomerName() {
        if (customer != null) {
            this.customerName = customer.getName();
        }
    }
}
