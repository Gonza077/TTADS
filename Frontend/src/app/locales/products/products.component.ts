import { Component,OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  constructor(
    @Inject(MAT_DIALOG_DATA) public local: any,
    private localService :LocalService ){
      
  }

  ngOnInit(): void {
    this.changeFilters();
    this.localService.getProducts(this.local._id).subscribe(
      (data:any) =>{
        console.log(data);
        this.dataSource.data = data.products
      }
    )
  }

  createProduct(){

  }

  editProduct(product:any){
    console.log(product.name);
  }

  deleteProduct(product:any){
    console.log("Producto eliminado");
  }

  //-------------------------------TABLE-------------------------------
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","description","options"];
  filterColumns: string[]= ["name"];
  filterValue:any;

  changeFilters(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = function (data : any, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    };
  }

  applyFilter(event :Event){
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
   //-------------------------------TABLE-------------------------------

     //-------------------------------PAGINADOR-------------------------------
  pageSize!: number;
  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10]

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
