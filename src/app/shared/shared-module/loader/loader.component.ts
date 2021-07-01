import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from './LoaderService';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent  {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
  color = 'success';
  mode = 'indeterminate';
  value = 50;
}
