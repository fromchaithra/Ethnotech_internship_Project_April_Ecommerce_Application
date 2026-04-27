package com.Ecommerce.Application.Controllers;

import com.Ecommerce.Application.DTO.*;
import com.Ecommerce.Application.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {
    
    private final CartService cartService;
    
    @PostMapping("/add/{productId}")
    public ResponseEntity<CartItemDTO> addToCart(
            Authentication authentication,
            @PathVariable Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }
    
    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }
    
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Map<String, String>> removeFromCart(
            Authentication authentication,
            @PathVariable Long productId) {
        
        Long userId = getUserId(authentication);
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearCart(Authentication authentication) {
        Long userId = getUserId(authentication);
        cartService.clearCart(userId);
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }
    
    private Long getUserId(Authentication authentication) {
        // In real implementation, get userId from JWT claims or database
        return 1L; // Simplified for demo
    }
}