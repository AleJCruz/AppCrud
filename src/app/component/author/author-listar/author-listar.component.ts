import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-listar',
  templateUrl: './author-listar.component.html',
  styleUrls: ['./author-listar.component.css']
})
export class AuthorListarComponent implements OnInit{
  lista:Author[]=[];
  displayedColumns=['id','nameAuthor', 'emailAuthor', 'birthDateAuthor'];
  dataSource=new MatTableDataSource<Author>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  //inyectando el service es como autowired
  constructor(private authorService: AuthorService){
    console.log("CONSTRUCTOR LISTAR");
  }
  ngOnInit(): void {
      console.log("NGONINIT DE LISTAR");
      //El observable suscribe a un observador para que actualice la data cuando le envien
  this.authorService.list().subscribe(data=>this.dataSource.data=data);
  this.authorService.getList().subscribe(data=>{
    this.dataSource.data=data;
  })
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

}
