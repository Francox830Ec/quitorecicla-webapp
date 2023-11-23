import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  styleOBJ = { width: '360px', 'background':'lightblue'}


  form = new FormGroup({
    nombreProducto: new FormControl(false),
  });

  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'Papel', key: 'A' },
    { name: 'Cartón', key: 'M' },
    { name: 'Plástico', key: 'P' },
    { name: 'Vidrio', key: 'R' },
    { name: 'Chatarra', key: 'R' },
    { name: 'Madera', key: 'R' },
    { name: 'Textiles', key: 'R' },
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // this.initForms();
    this.form = new FormGroup({
      nombreProducto: new FormControl(false),
    });
  }
}
