import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../shared/service/task.service";


@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
  /*   cartItems=[
    {productId: "623a98a1e4bad563cc9c4036", quantity: 1, name: "test1", description: "test2", image: 'assets/images/img1.jpg', price: 10},
    {productId: "623a5ebf15fa7bb649f21840", quantity: 2, name: "test1", description: "test2", image: 'assets/images/img2.jpg', price: 20},
    ] */
  ngOnInit(): void {
    this.viewCart();
  }

  displayedColumns = [
    "productImage",
    "productName",
    "productPrice",
    "productQuantity",
    "productTotal",
  ];
  sum = 0;
  tax = 0;
  shipping = 0;
  total = 0;
  dataSource: any = [];

  viewCart() {
    this.taskService.viewCart().subscribe((response: any) => {
      this.dataSource = response.data;
      this.displayOrderSummary();
    });
  }
  displayOrderSummary() {
    console.log(this.dataSource);
    this.sum = 0;
    for (var item of this.dataSource) {
      this.sum = this.sum + item.productPrice * item.productQuantity;
    }
    console.log(this.sum);
    this.tax = this.sum * 0.15;
    this.shipping = 30;
    this.total = this.sum + this.tax + this.shipping;
  }
  /*  {
            "_id": "623fb40a38e2a500a655380f",
            "userId": "62313322509f340a3025b628",
            "productId": "623a98a1e4bad563cc9c4036",
            "productName": "test2",
            "productImage": "test_url2",
            "productPrice": 0,
            "productQuantity": 7
        } */
  updateCart(productId: string, quantity: number) {
    const body = { productId: productId, quantity: quantity };

    this.taskService.updateCart(body).subscribe((response: any) => {
      this.dataSource = response.data;
      console.log(this.dataSource);
      this.viewCart();
    });
  }

  deleteCart(productId: string) {
    const body = { productId: productId };

    this.taskService.deleteCart(body).subscribe((response: any) => {
      this.dataSource = response.data;
      console.log(this.dataSource);
      this.viewCart();
    });
  }

  navigateToCheckoutPage(){
    this.router.navigate(['checkout'])
  }
}
