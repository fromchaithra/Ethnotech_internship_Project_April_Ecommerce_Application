package com.Ecommerce.Application.Controllers;

import com.Ecommerce.Application.DTO.*;
import com.Ecommerce.Application.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            Authentication authentication,
            @Valid @RequestBody CreateOrderRequest request) {
        
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(orderService.createOrder(userId, request));
    }
    
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getUserOrders(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }
    
    private Long getUserId(Authentication authentication) {
        // In real implementation, get userId from JWT claims or database
        return 1L; // Simplified for demo
    }
}
