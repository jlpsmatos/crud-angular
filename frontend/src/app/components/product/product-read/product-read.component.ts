import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  displayedColumns = ['id', 'name', 'price', 'action']
  products!: MatTableDataSource<Product>
  productspageIndex = 0
  productspageSize = 5
  productspageSizeOptions = [5, 10, 20]

  @ViewChild('paginator') paginator! : MatPaginator
  @ViewChild(MatSort) matSort! : MatSort

  constructor(
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = new MatTableDataSource(products) //recebendo produtos do serviço
      this.products.paginator = this.paginator //paginação de produtos
      this.products.sort = this.matSort //ordenação de produtos
      console.log(products)
    })
  }
//pesquisa de produtos
  filterData($event : any){
    this.products.filter = $event.target.value
  }
  limpar(): void {
    this.products.filter = ""
  }
}