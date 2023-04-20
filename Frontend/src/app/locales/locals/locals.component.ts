import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/services/local/local.service';
import { UserService } from 'src/app/services/user/user.service';
import { LocalItemComponent } from '../local-item/local-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  @Input()
  pageSize!: number;

  locals!: any[];

  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ["company", "address","description", "products", "options"];
  filterColumns: string[]= ["company", "address"];
  filterValue:any;

  constructor(
    private localService: LocalService,
    public userService: UserService,
    private dialog: MatDialog
  ) { }

  getLocals() {
    this.localService.getLocals().subscribe(
      (data: any) => {
        this.locals= data;
        this.dataSource.data = this.locals;
      }
    )
  }

  ngOnInit(): void {
    this.changeFilters();
    this.getLocals();
  }

  changeFilters(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = function(data : any, filter: string): boolean {
      return data.company.toLowerCase().includes(filter) || data.address.toLowerCase().includes(filter) ;
    };
  }

  editLocal(local: any) {
    const dialogRef = this.dialog.open(LocalItemComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        //ACA IRIA EL SERVICIO DE EDITAR EL LOCAL
      }
      console.log(`Local editado => Dialog result: ${result }`);
    });
    this.getLocals();
  }

  deleteLocal(local: any) {
    const dialogRef = this.dialog.open(LocalItemComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        //ACA IRIA EL SERVICIO DE EDITAR EL LOCAL
      }
      console.log(`Local eliminado => Dialog result: ${result }`);
    });
    this.getLocals();
  }

  openProducts(local:any) {
    const dialogRef = this.dialog.open(ProductsComponent);
    console.log(local.products)
  }

  createLocal() {
    console.log("Local creado con exito");
  }

  applyFilter(event :Event){
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  //-------------------------------PAGINADOR-------------------------------
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

