package com.Ecommerce.Application.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;  // ✅ THIS FIXES builder() ERROR
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder  // ✅ REQUIRED FOR .builder()
public class OrderItemDTO {
    private Long productId;
    private String productTitle;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}