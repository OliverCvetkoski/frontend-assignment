import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filtered-results',
  templateUrl: './filtered-results.component.html',
  styleUrls: ['./filtered-results.component.css'],
})
export class FilteredResultsComponent {
  @Input() product: any;
}
