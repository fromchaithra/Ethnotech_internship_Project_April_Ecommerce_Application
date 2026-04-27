package com.Ecommerce.Application.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;  // ✅ REQUIRED
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder  // ✅ REQUIRED for .builder()
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
    private String categoryName;  // ✅ THIS FIELD WAS MISSING
}