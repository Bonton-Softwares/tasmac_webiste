import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  searchText = '';
  selectedCategory = 'All Documents';
  selectedYear = 'All Years';

  currentPage = 1;
  itemsPerPage = 4;

  reports = [

    {
      type: 'Annual Reports',
      title: 'TASMAC Annual General Report 2023-2024',
      description: 'Comprehensive financial overview and strategic initiatives.',
      size: '4.2 MB',
      date: '12 Oct 2024',
      year: '2024'
    },

    {
      type: 'Government Orders',
      title: 'G.O.(Ms) No.45 Revised Pricing Guidelines',
      description: 'Official order for pricing structure updates.',
      size: '1.8 MB',
      date: '05 Sep 2024',
      year: '2024'
    },

    {
      type: 'Tender Notices',
      title: 'RFP for Logistics and Supply Chain',
      description: 'Warehouse modernization proposal.',
      size: '5.5 MB',
      date: '22 Aug 2024',
      year: '2024'
    },

    {
      type: 'Acts & Rules',
      title: 'Tamil Nadu Prohibition Act 1937',
      description: 'Consolidated document of amendments.',
      size: '13 MB',
      date: '12 Jan 2024',
      year: '2024'
    },

    {
      type: 'Annual Reports',
      title: 'Financial Report 2023',
      description: 'Annual report document',
      size: '2 MB',
      date: '10 Dec 2023',
      year: '2023'
    }

  ];



  categories = [

    'All Documents',
    'Annual Reports',
    'Government Orders',
    'Acts & Rules',
    'Tender Notices'

  ];



  years = [

    'All Years',
    '2024',
    '2023',
    '2022'

  ];



  get filteredReports() {

    return this.reports.filter(report => {

      const matchSearch =

        report.title.toLowerCase()
          .includes(this.searchText.toLowerCase());



      const matchCategory =

        this.selectedCategory === 'All Documents'
        ||

        report.type === this.selectedCategory;



      const matchYear =

        this.selectedYear === 'All Years'
        ||

        report.year === this.selectedYear;



      return matchSearch
        &&
        matchCategory
        &&
        matchYear;

    })

  }



  get paginatedReports() {

    const start = (this.currentPage - 1)
      * this.itemsPerPage;

    return this.filteredReports.slice(
      start,
      start + this.itemsPerPage
    );

  }



  get totalPages() {

    return Math.ceil(
      this.filteredReports.length /
      this.itemsPerPage
    )

  }



  changePage(page: number) {

    if (page >= 1 && page <= this.totalPages) {

      this.currentPage = page;

    }

  }



  clearFilters() {

    this.searchText = '';

    this.selectedCategory = 'All Documents';

    this.selectedYear = 'All Years';

    this.currentPage = 1;

  }

}