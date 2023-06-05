import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { products } from '../interfaces/products.interface';
import { Product } from '../interfaces/interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  products: any[]= [];



  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Product>("http://localhost:4700/products").subscribe( response => {
      console.log(response.products[0]);
      this.products = response.products[0]
    });
  }
  
  setLiveStatus(id:number, status: boolean){
    console.log(id, status);
    this.http.put<boolean>('http://localhost:4700/setstatus/' +id, {status:status}).subscribe( res => {
      console.log(res);
    })

  }

  deleteProduct(id: number): void {
    this.http
      .delete<boolean>('http://localhost:4700/deleteproduct', { body: { id: id } })
      .subscribe((res) => {
        if (res) {
          alert('Product successfully deleted');
          this.ngOnInit();
        }
      });
  }

  updatedName: string | null = null;
  updatedDescription: string | null = null;
  updatedPrice: number | null = null;
  updatedInventory: boolean | null = null;
  updatedImage: string | null = null;
  updatedOnline: boolean | null = null;

  updateProduct(id:number): void {
    const updatedNameInput = prompt("Enter the updated name:");
    const updatedDescriptionInput = prompt("Enter the updated description:");
    const updatedPriceInput = prompt("Enter the updated price:");
    const updatedInventoryInput = prompt("Enter the updated inventory:");
    const updatedImageInput = prompt("Enter the updated image:");
    const updatedOnlineInput = prompt("Enter the updated status:");

    if (updatedNameInput !== null && updatedDescriptionInput !== null && updatedPriceInput !== null && updatedInventoryInput !== null && updatedImageInput !== null && updatedOnlineInput !== null) {
      this.updatedName = updatedNameInput;
      this.updatedDescription = updatedDescriptionInput;
      this.updatedPrice = parseFloat(updatedPriceInput);
      this.updatedInventory = updatedInventoryInput.toLowerCase() === 'true';
      this.updatedImage = updatedImageInput;
      this.updatedOnline = updatedOnlineInput.toLowerCase() === 'true';

      this.http
        .put<boolean>(
          'http://localhost:4700/updateproducts/' + id,
          {name: this.updatedName, description: this.updatedDescription, price: this.updatedPrice, inventory: this.updatedInventory, image: this.updatedImage, online: this.updatedOnline}
        )
        .subscribe(res => {
          if (res){
            alert('Product updated successfully');
            this.ngOnInit();
          }
        });
    }
    
  }

  
  
  

  


}

