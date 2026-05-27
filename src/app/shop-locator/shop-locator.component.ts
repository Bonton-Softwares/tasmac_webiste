import { CommonModule } from '@angular/common';

import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

import { DropdownModule } from 'primeng/dropdown';

import { PascalCasePipe } from '../services/pascal-case.pipe';

import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';

import { FormService } from '../services/form.service';

import { LoaderComponent } from '../loader/loader.component';

import { LoaderService } from '../services/loader.service';

interface Shop {

  slNo: number;

  srmOffice: string;

  dmOffice: string;

  RVShopsNo: number;

  district: string;

  taluk: string;

  area: string;

  latitude: number;

  longitude: number;

  Address: string;

}

@Component({
  selector: 'app-shop-locator',
  templateUrl: './shop-locator.component.html',
  styleUrls: ['./shop-locator.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PascalCasePipe,
    DropdownModule,
    SearchDropdownComponent,
    LoaderComponent
  ]
})

export class ShopLocatorComponent implements OnInit {

  searchTerm = '';

  selectedDistrict = '';

  selectedTaluk = '';

  selectedRvShopNo = '';

  selectedRvShopNo2 = '';

  isShow: boolean = false;

  topPosToStartShowing = 100;

  shops: Shop[] = [];

  filteredShops: Shop[] = [];

  districts: any[] = [];

  taluks: any[] = [];

  rvShopNos: any[] = [];

  selectedShop: any = null;

  mapUrl!: SafeResourceUrl;

  defaultAmbatturShop: Shop = {

    slNo: 8848,

    srmOffice: '',

    dmOffice: '',

    RVShopsNo: 8848,

    district: 'Ambattur',

    taluk: '',

    area: 'Ayanampakkam',

    latitude: 13.0878,

    longitude: 80.1777,

    Address: 'No.64, Keesan Nagar, Ayanampakkam, Ch-95'

  };

  constructor(

    private formService: FormService,

    private loader: LoaderService,

    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {

    this.loadDefaultMap();

    this.getDistrict();

    this.getAllTaluk();

    this.getAllShopNo();

  }

  @HostListener('window:scroll')

  checkScroll() {

    const scrollPosition =

      window.pageYOffset ||

      document.documentElement.scrollTop ||

      document.body.scrollTop ||

      0;

    this.isShow =
      scrollPosition >= this.topPosToStartShowing;

  }

  scrollToTop() {

    window.scroll({

      top: 0,

      left: 0,

      behavior: 'smooth'

    });

  }

  loadDefaultMap() {

    this.selectedShop = null;

    this.mapUrl =

      this.sanitizer
        .bypassSecurityTrustResourceUrl(

          'https://maps.google.com/maps?q=Chennai&t=&z=11&ie=UTF8&iwloc=&output=embed'

        );

  }

  getDistrict() {

    this.formService
      .getAllDistrict()
      .subscribe((res: any) => {

        this.districts = res.data;

      });

  }

  getAllTaluk() {

    this.formService
      .getAllTaluk()
      .subscribe((res: any) => {

        this.taluks = res.data;

      });

  }

  getAllShopNo() {

    this.formService
      .getAllShopNo()
      .subscribe((res: any) => {

        this.rvShopNos = res.data;

      });

  }

  filterRvAndTaluk() {

    this.loader.show();

    this.formService
      .getAllTaluk()
      .subscribe((res: any) => {

        this.taluks =
          res.data.filter(
            (f: any) =>
              f.district_code == this.selectedDistrict
          );

      });

    this.formService
      .getAllShopNo()
      .subscribe((res: any) => {

        this.rvShopNos =
          res.data.filter(
            (f: any) =>
              f.revenue_district_id == this.selectedDistrict
          );

      });

    const value = {

      i_DistrictId: this.selectedDistrict

    };

    this.formService
      .getShopLocationByDistrict(value)
      .subscribe(

        (res: any) => {

          this.filteredShops = res.data;

          this.loader.hide();

          if (this.filteredShops.length > 0) {

            this.navigate(

              this.filteredShops[0].latitude,

              this.filteredShops[0].longitude

            );

          }

        },

        (error: any) => {

          this.loader.hide();

        }

      );

  }

  filterRV() {

    this.formService
      .getAllShopNo()
      .subscribe((res: any) => {

        this.rvShopNos =
          res.data.filter(
            (f: any) =>
              f.talukaId == this.selectedTaluk
          );

      });

    const value = {

      i_TalukaId: this.selectedTaluk

    };

    this.formService
      .getShopLocationByTaluk(value)
      .subscribe((res: any) => {

        this.filteredShops = res.data;

        if (this.filteredShops.length > 0) {

          this.navigate(

            this.filteredShops[0].latitude,

            this.filteredShops[0].longitude

          );

        }

      });

  }

  getRvShopDetails() {

    const value = {

      i_ShopNumber: this.selectedRvShopNo

    };

    this.formService
      .getShopLocationByShopNo(value)
      .subscribe((res: any) => {

        this.filteredShops = res.data;

        if (this.filteredShops.length > 0) {

          this.navigate(

            this.filteredShops[0].latitude,

            this.filteredShops[0].longitude

          );

        }

      });

  }

  navigate(latitude: number, longitude: number) {

    this.selectedShop = {

      latitude,

      longitude

    };

    this.mapUrl =

      this.sanitizer
        .bypassSecurityTrustResourceUrl(

          `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`

        );

  }

  resetFilters() {

    this.selectedDistrict = '';

    this.selectedTaluk = '';

    this.selectedRvShopNo = '';

    this.filteredShops = [];

    this.loadDefaultMap();

  }

}