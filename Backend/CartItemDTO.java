package com.Ecommerce.Application.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;  // ✅ REQUIRED
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder  // ✅ THIS FIXES builder() error
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productTitle;
    private String productImage;
    private BigDecimal productPrice;
    private Integer quantity;
    private BigDecimal totalPrice;
}