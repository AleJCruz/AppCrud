import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/model/author';
import * as moment from 'moment'; // ADD
import { AuthorService } from 'src/app/service/author.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  author: Author = new Author();
  mensaje: string = '';
  maxFecha: Date = moment().add(1, 'days').toDate(); // a mano importar import * as moment from 'moment';
  id: number=0;
  edicion:boolean=false;
  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.form = new FormGroup(
      {
        id: new FormControl(),
        nameAuthor: new FormControl('',[Validators.required]),
        emailAuthor: new FormControl('',  [Validators.required, Validators.email]),
        birthDateAuthor: new FormControl()
      }
    );
  }
  aceptar(): void {
    this.author.id=this.form.value['id'];
    this.author.nameAuthor=this.form.value['nameAuthor'];
    this.author.emailAuthor=this.form.value['emailAuthor'];
    this.author.birthDateAuthor=this.form.value['birthDateAuthor'];
    if(this.form.valid) {
      console.log(this.author);
      this.authorService.insert(this.author).subscribe((data) => {
        this.authorService.list().subscribe(data => {
          this.authorService.setList(data);
        });
      });
      this.router.navigate(['authors']);
    }else{
      this.mensaje="Agregue campos omitidos";
    }

  }
}