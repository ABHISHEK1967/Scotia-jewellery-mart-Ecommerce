import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Cart, Items } from "../model/cart";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartUpdate$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    JSON.parse(localStorage.getItem("cart"))
  );
  constructor() {}

  initializeEmptyCart() {
    const cart: Cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      const initialCart = { products: [] as string[] };
      localStorage.setItem("cart", JSON.stringify(initialCart));
    }
    this.cartUpdate$.next(cart);
  }

  addToCart(items: Items): Cart {
    const currentCart: Cart = JSON.parse(localStorage.getItem("cart"));
    const duplicateItem = currentCart.products.find(
      (item) => item.productId === items.productId
    );
    if (duplicateItem) {
      currentCart.products.forEach((item) => {
        if (item.productId === items.productId) {
          item.quantity = item.quantity + items.quantity;
        }
      });
    } else {
      currentCart.products.push(items);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    this.cartUpdate$.next(currentCart);
    return currentCart;
  }

  updateCart(items: Items): Cart {
    const currentCart: Cart = JSON.parse(localStorage.getItem("cart"));
    const duplicateItem = currentCart.products.find(
      (item) => item.productId === items.productId
    );
    if (duplicateItem) {
      currentCart.products.forEach((item) => {
        if (item.productId === items.productId) {
          item.quantity = items.quantity;
        }
      });
    } else {
      currentCart.products.push(items);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    this.cartUpdate$.next(currentCart);
    return currentCart;
  }

  deleteCart(items: Items): Cart {
    const currentCart: Cart = JSON.parse(localStorage.getItem("cart"));
    const duplicateItem = currentCart.products.findIndex(
      (item) => item.productId === items.productId
    );
    currentCart.products.splice(duplicateItem,1);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    this.cartUpdate$.next(currentCart);
    return currentCart;
  }
}
