/* Authored by Meshwa Savalia, B00890170, ms959884@dal.ca
 */import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  viewCart(){
    return this.webRequestService.get('cart/getCartDetails')

  }
  updateCart(body: Object){
    return this.webRequestService.put('cart/updateItemFromCart/',body)
  }
  deleteCart(body: Object){
    return this.webRequestService.put('cart/deleteItemFromCart',body)
  }
  addToCart(body: Object){
    return this.webRequestService.post('cart/addItemToCart',body)
  }
}
