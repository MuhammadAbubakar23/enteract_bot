import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
    templates!: any[];
    sortOptions: string[] = ['All', 'Ascending', 'Descending'];
    selectedSortOption: string = 'All';
    messages: any;
    searchText: string = '';
    perPage: number = 15;
    currentPage: number = 1;
    totalCount: any;
    startPoint:any;
    endPoint:any;
    totalPage: any;

    constructor(private headerService: HeaderService, private userService: UsersService, private router: Router,
      private spinnerServerice: NgxSpinnerService) { 
        headerService.updateHeaderData({
          title: 'Users',
          tabs: [{ title: '', url: '', isActive: true }],
          isTab: false,
          class:"fal fa-users"
        })
      }
  
    ngOnInit(): void {
        this.refreshMessages()
    }

    applySearchFilter() {
      if(this.searchText.length> 2){
        this.refreshMessages();
      }
      if(this.searchText.length == 0){
        this.refreshMessages();
      }
    }

    refreshMessages() {
      const formData = {
        search: this.searchText,
        pageNumber: this.currentPage,
        pageSize: this.perPage,
      }
      this.spinnerServerice.show();
      this.userService.GetUsers(formData).subscribe(
        (response: any) => {
          this.spinnerServerice.hide()
          this.messages = response.Users;
          this.totalCount = response.TotalCount;
          if(this.messages.length==0 || this.messages==null){
       
            this.endPoint=0
            this.totalCount=0
          }
         
            if(this.currentPage==1){
             this.startPoint =this.currentPage
            }
            else{
              this.startPoint= (this.currentPage -1) * this.perPage+1
            }
            this.totalPage = Math.ceil(this.totalCount/ this.perPage)
            if(this.totalCount <=this.startPoint +this.perPage -1){
              this.endPoint=this.totalCount
            }
            else{
              this.endPoint= this.startPoint +  this.perPage -1
            }
        },
        (error: any) => {
          this.spinnerServerice.hide()
          console.error(error);
        }
      );
    }
    // setSortOption(option: string) {
    //   this.selectedSortOption = option;
    //   this.refreshMessages();
    // }
  
    editTemplate(template: any) {
      this.router.navigate(['/console/user/create', template.id], {
        state: { template }
      });
    }
    deleteTemplate(template: any) {
      const confirmation = confirm('Are you sure you want to delete this user?');
      if (confirmation) {
        this.userService.DeleteUser(template.id).subscribe(
          () => {
           this.refreshMessages();
          },
          (error: any) => {
            console.error('Error deleting template:', error);
          }
        );
      }
    }
    setPerPage(perPage: number): void {
      this.perPage = perPage;
      this.currentPage = 1;
      this.refreshMessages()
    }
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage;
      }
      this.refreshMessages()
    }
    nextPage(): void {
      const maxPages = Math.ceil(this.totalCount / this.perPage);
      if (this.currentPage < maxPages) {
        this.currentPage++;
      }
      this.refreshMessages()
    }
    goToPage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
        this.currentPage = pageNumber;
      }
      this.refreshMessages()
    }

    getVisiblePageNumbers(): number[] {
      const maxPages = Math.ceil(this.totalCount / this.perPage);
      const visiblePages = 5;
      let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
      let endPage = Math.min(startPage + visiblePages - 1, maxPages);
      if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
  }