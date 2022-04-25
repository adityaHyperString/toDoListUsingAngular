import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-compact-sidebar',
  templateUrl: './compact-sidebar.component.html',
  styleUrls: ['./compact-sidebar.component.scss']
})
export class CompactSidebarComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'right');
  }
}
