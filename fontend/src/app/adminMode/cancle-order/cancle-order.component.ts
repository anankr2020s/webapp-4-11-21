import { Component, OnInit,Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cancle-order',
  templateUrl: './cancle-order.component.html',
  styleUrls: ['./cancle-order.component.css']
})
export class CancleOrderComponent implements OnInit {

  @Input() item: any ;
  product = {"_id": Number}

  constructor(private os:OrderService) { }

  ngOnInit(): void {
  }

  deleteOrder(){
    console.log("From Item",this.item)
    this.product._id = this.item._id
    console.log("from product",this.product)
    try{
      this.os.deleteProduct(this.product).subscribe(
        data =>{

        },
        err =>{
          console.log(err)
        });
    }catch(error){
        console.log(error)
    }
    console.log('Delete Active')
  }

}
