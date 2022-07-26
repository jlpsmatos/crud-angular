import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = "http://localhost:3001/Products"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  //criar mensagem de alerta padronizada p usuário
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  //criar um produto
  create(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.baseUrl, product)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }
  //obter todos os produtos
  read(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }
  //obter um produto pelo id
  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http
      .get<Product>(url)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }
  //atualizar um produto pelo id
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http
      .put<Product>(url, product)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }
  //deletar um produto pelo id
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http
      .delete<Product>(url)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
  }
  //tratamento de erro de comunicação com o backend
  errorHandler(e: any): Observable<any> {
    console.log(e) //exibe msg do erro no console do desenvolvedor
    this.showMessage('Sistema apresentou comportamento inesperado!', true)
    return EMPTY
  }
}
