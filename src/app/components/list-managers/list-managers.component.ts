import { Component,OnInit } from '@angular/core';
import { Manager } from '../../interfaces/manager';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchComponent } from '../search/search.component';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-managers',
  standalone: true,
  imports: [NavbarComponent, SearchComponent,RouterLink, RouterLinkActive],
  templateUrl: './list-managers.component.html',
  styleUrl: './list-managers.component.css'
})
export class ListManagersComponent implements OnInit {
  listManagers: Manager[] = []
  loading: boolean = false;

  constructor(private _managerService: ManagerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListManagers();
  }

  getListManagers() {
    this.loading = true;

    this._managerService.getListManagers().subscribe((data: Manager[]) => {
      this.listManagers = data;
      this.loading = false;
    })
  }

  deleteManager(id: number) {
    if(confirm("Estas seguro de elminar al manager con ID "+id)) {
    this.loading = true;
    this._managerService.deleteManager(id).subscribe(() => {
      this.getListManagers();
      this.toastr.warning('El manager fue eliminado con exito', 'Manager eliminado');
    })
  }
  }
}
