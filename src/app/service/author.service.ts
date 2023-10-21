import { Injectable } from '@angular/core';
import { Author } from '../model/author';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url = "http://localhost:8080/api/";
  private listaCambio = new Subject<Author[]>();
  // inyectando httpClient
  constructor(private http: HttpClient) { }

  list() : Observable<any>{
    return this.http.get<Author[]> (this.url + "authors");
  }

  insert (author:Author){
    return this.http.post(this.url+"author", author);
  }
  setList(listaNueva:Author[]){
    this.listaCambio.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(){
   return this.listaCambio.asObservable();
  }
}
