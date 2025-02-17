import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faca-parte',
  templateUrl: './faca-parte.component.html',
  styleUrls: ['./faca-parte.component.scss'],
})
export class FacaParteComponent implements OnInit {
  facaParte: FormGroup | undefined;

  ngOnInit() {
    this.facaParte = new FormGroup({
      name: new FormControl(''),
      telefone: new FormControl(''),
      idade: new FormControl(''),
      estudo: new FormControl('')
    });
  }

}
