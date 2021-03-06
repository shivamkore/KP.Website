import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/shared/_interfaces/owner.model';
import { CodeMazeService } from 'src/app/services/code-maze.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {
  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<Owner>();
  public errorMessage = '';

  constructor(private codeMazeService: CodeMazeService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }
  getAllOwners(): any {
    const apiAddress = 'api/owner';
    this.codeMazeService.getData(apiAddress)
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public getOwnerDetails(id) {
    const detailsUrl = `/owner/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id) {
    const updateUrl = `/owner/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(id) {
    const deleteUrl = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }
}
