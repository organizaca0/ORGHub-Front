import { MatExpansionModule } from '@angular/material/expansion';
import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
  imports:[MatExpansionModule, MatSlideToggleModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjetosComponent implements OnInit {
  readonly panelOpenState = signal(false);
  ingredient!: string;
  ngOnInit() {
  }
}
