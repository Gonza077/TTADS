import { Component,OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products!: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any ){
  }

  ngOnInit(): void {
    this.changeFilters();
    this.dataSource.data=this.data;
    console.log(this.data)
  }

  createProduct(){

  }

  editProduct(product:any){

  }

  deleteProduct(product:any){

  }

  //-------------------------------TABLE-------------------------------
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","description"];
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
