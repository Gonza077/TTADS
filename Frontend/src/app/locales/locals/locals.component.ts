import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/services/local/local.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';
import { LocalDeleteComponent } from '../local-delete/local-delete.component';
import { LocalEditComponent } from '../local-edit/local-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  locals!: any[];

  constructor(
    private localService: LocalService,
    public userService: UserService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.changeFilters();
    this.getLocals();
  }

  getLocals() {
    this.localService.getLocals().subscribe(
      (data: any) => {
        this.locals = data;
        this.dataSource.data = this.locals;
      }
    )
  }
  editLocal(local: any) {
    const dialogRef = this.dialog.open(LocalEditComponent,{
      data:local,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toast.success("Local editado");
        this.getLocals();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteLocal(local: any) {
    const dialogRef = this.dialog.open(LocalDeleteComponent, {
      data: local
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toast.error("Local eliminado");
        this.getLocals();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openProducts(local: any) {
    const dialogRef = this.dialog.open(ProductsComponent, {
      data: local,
    });
  }

  createLocal() {
    console.log("Local creado con exito");
  }


  //-------------------------------TABLE-------------------------------
  displayedColumns: string[] = ["company", "address", "description", "products", "options"];
  filterColumns: string[] = ["company", "address"];
  filterValue: any;
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  changeFilters() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.company.toLowerCase().includes(filter) || data.address.toLowerCase().includes(filter);
    };
  }

  //-------------------------------PAGINADOR-------------------------------
  pageSize!: number;
  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild('empTbSort') empTbSort !: MatSort;
  ngAfterViewInit() {
    //Esto para pasarle el dato del paginador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
  }

  handlePage(e: PageEvent) {
    this.pageNum = e.pageIndex + 1;
    this.pageSize = e.pageSize;
  }
  //-------------------------------PAGINADOR-------------------------------
}

