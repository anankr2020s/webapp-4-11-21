import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order : any;

  constructor(private os: OrderService) {
    this.getOrder();
   }

  ngOnInit(): void {
  }

  getOrder(){
    try{
      this.os.getProducts().subscribe(
        data =>{
          this.order = data
          console.log(this.order)
        },
        err =>{
          console.log(err)
        });
    }catch(error){
      console.log(error)
    }
  }


}
