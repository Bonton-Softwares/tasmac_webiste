import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PascalCasePipe } from '../services/pascal-case.pipe';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-stock-availability',
  standalone: true,
  imports: [FormsModule, CommonModule, PascalCasePipe, DropdownModule, LoaderComponent],
  templateUrl: './stock-availability.component.html',
  styleUrl: './stock-availability.component.css'
})
export class StockAvailabilityComponent {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  latitude = 13.0827;
  longitude = 80.2707;
  searchTerm = '';
  selectedDistrict = '';
  selectedTaluk = '';
  selectedRvShopNo = '';
  selectedBrand: any
  selectedRvShopNo2 = ''
  isShow: boolean = false;
  topPosToStartShowing = 100;
  map: L.Map;
  markers: L.MarkerClusterGroup;
  filteredShops: any
  districts: any[] = [];
  taluks: any[] = [];
  rvShopNos: any[] = [];
  brands: any[] = []
  stockDetails: any[] = []
  expandedRow: number | null = null;
  filteredStockDetails: any
  allStockDetails: any
  lastUpdate: any = ''
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  constructor(private formService: FormService, private loader: LoaderService) { }

  ngOnInit(): void {
    // this.loadShopData();
    this.getDistrict();
    this.getAllTaluk();
    this.getAllShopNo();
    this.getAllBrands();
    this.getAllStocks();
  }

  toggleExpand(rowIndex: number): void {
    if (this.expandedRow === rowIndex) {
      this.expandedRow = null;
    } else {
      this.expandedRow = rowIndex;
    }
  }

  getAllStocks() {
    this.loader.show();
    this.formService.getAllStockDetails().subscribe((res: any) => {
      this.lastUpdate = res.data[0].last_updated_time
      this.filteredStockDetails = res.data;
      this.stockDetails = res.data;
      this.allStockDetails = res.data;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    })
  }

  getDistrict() {
    this.formService.getAllDistrict().subscribe((res: any) => {
      this.districts = res.data
    })
  }

  getAllTaluk() {
    this.formService.getAllTaluk().subscribe((res: any) => {
      this.taluks = res.data
    })
  }

  getAllShopNo() {
    this.formService.getAllShopNo().subscribe((res: any) => {
      this.rvShopNos = res.data
    })
  }

  getAllBrands() {
    this.formService.getAllBrands().subscribe((res: any) => {
      this.brands = res.data
    })
  }

  filterRvAndTaluk() {
    this.loader.show();
    this.formService.getAllTaluk().subscribe((res: any) => {
      this.taluks = res.data.filter((f: any) => f.district_code == this.selectedDistrict);
    })
    const value = {
      "i_DistrictId": this.selectedDistrict
    }
    this.formService.getShopLocationByDistrict(value).subscribe((res: any) => {
      this.rvShopNos = res.data
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    })
  }

  filterRV() {
    this.loader.show();
    const value = {
      "i_TalukaId": this.selectedTaluk
    }
    this.formService.getShopLocationByTaluk(value).subscribe((res: any) => {
      this.rvShopNos = res.data
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    })
  }

  getStockDetailsByDistrict() {
    this.loader.show();
    const data = {
      p_districtId: this.selectedDistrict
    }
    this.formService.getStockDetailsByDistrict(data).subscribe((res: any) => {
      this.allStockDetails = res.data
      this.filteredStockDetails = res.data;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    })
  }

  getStockDetailsByTaluk() {
    this.loader.show();
    const data = {
      p_districtId: this.selectedDistrict,
      p_talukId: this.selectedTaluk
    }
    this.formService.getStockDetailsByTaluk(data).subscribe((res: any) => {
      this.allStockDetails = res.data
      this.filteredStockDetails = res.data;
      this.loader.hide();
    }, (error: any) => {
      this.loader.hide();
    })
  }

  filterByRvShop() {
    this.filteredStockDetails = this.allStockDetails.filter(f => f.shopNumber == this.selectedRvShopNo)
    this.allStockDetails = this.filteredStockDetails
  }

  filterBrand() {
    this.loader.show();
    const brandId = Number(this.selectedBrand);
    this.filteredStockDetails = this.filteredStockDetails.map(shop => ({
      ...shop,
      Stock_details: shop.Stock_details.filter(
        item => item.brandId === brandId
      )
    }));
    this.allStockDetails = this.filteredStockDetails
    this.loader.hide();
  }

  filterProducts() {
    let searchData: any
    if (this.selectedBrand || this.selectedDistrict || this.selectedRvShopNo || this.selectedTaluk) {
      searchData = this.allStockDetails
    }
    else {
      searchData = this.stockDetails
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredStockDetails = searchData
      .map(shop => {
        const filteredStockDetails = shop.Stock_details?.filter((item: any) => {
          return (
            item.brandName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.productName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.supplierName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.unitName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.packSize?.toString().includes(lowerCaseSearchTerm) ||
            item.currentStock?.toString().includes(lowerCaseSearchTerm)
          );
        }) || [];

        return {
          ...shop,
          Stock_details: filteredStockDetails
        };
      })
      .filter(shop => {
        const hasMatchingDetails = shop.Stock_details.length > 0;
        const matchesDistrict = shop.districtName?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const matchesTaluk = shop.talukaName?.toLowerCase().includes(lowerCaseSearchTerm) || false;
        const matchesShopNumber = shop.shopNumber.toString().includes(lowerCaseSearchTerm);

        return matchesDistrict || matchesTaluk || matchesShopNumber || hasMatchingDetails;
      });
  }

  resetFilters() {
    this.selectedDistrict = '',
      this.selectedTaluk = '',
      this.selectedRvShopNo = ''
    this.selectedBrand = ''
    this.searchTerm = ''
    this.getAllStocks()
  }

}
