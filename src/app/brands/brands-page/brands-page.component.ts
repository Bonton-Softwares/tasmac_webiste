import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';
import { Company } from '../models/company.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CompaniesBlockComponent } from '../companies-block/companies-block.component';
import { Brands } from '../models/brands.model';
import { FormsModule } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-brands-page',
	templateUrl: './brands-page.component.html',
	standalone: true,
	imports: [CompaniesBlockComponent, AsyncPipe, CommonModule, FormsModule, LoaderComponent, RouterModule],
	styleUrl: './brands-page.component.css',
})
export class brandsPageComponent implements OnInit {
	selectedTab: number = 0;
	searchTerm: string = '';
	brands: any
	productList: any
	isShow: boolean = false;
	topPosToStartShowing = 100;
	filteredProductList: any = [];

	constructor(
		private config: ConfigService, private formService: FormService, private loader: LoaderService) {
	}

	ngOnInit() {
		this.getAllBrands();
		this.getAllProducts();
	}

	@HostListener('window:scroll')
	checkScroll() {
		const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		this.isShow = scrollPosition >= this.topPosToStartShowing;
	}

	getAllBrands() {
		this.formService.getAllBrands().subscribe((res: any) => {

			const allowedBrands = [
				'BEER',
				'BRANDY',
				'RUM',
				'VODKA',
				'WHISKY',
				'WINE'
			];

			this.brands = res.data.filter((item: any) =>
				allowedBrands.includes(item.brandName?.toUpperCase())
			);

			this.brands.unshift({
				brandId: 0,
				brandName: 'ALL'
			});

		});
	}

	getAllProducts() {
		this.loader.show();

		this.formService.getAllLiquoreProducts().subscribe((res: any) => {

			this.productList = res.data;
			this.filteredProductList = [...this.productList];

			this.loader.hide();
		});
	}

	getLiquoreProductsByBrandId(brandId: any) {

		const value = {
			pBrandId: brandId
		};

		this.formService.getLiquoreProductsByBrandId(value)
			.subscribe((res: any) => {

				this.productList = res.data;
				this.filteredProductList = [...this.productList];

			});
	}

	getUniqueUnitNames(products: any[]): string[] {

		const unitNames = products.flatMap(product =>
			product.productDetails.map((detail: any) =>
				detail.unitName?.trim()
			)
		);

		const uniqueUnits = [...new Set(unitNames)];

		return uniqueUnits.sort((a: string, b: string) =>
			parseInt(a.replace('ml', '')) -
			parseInt(b.replace('ml', ''))
		);
	}

	getMrpByUnitName(productDetails: any, unitName: any): string {
		if (!productDetails || !Array.isArray(productDetails)) {
			return '-';
		}
		const detail = productDetails.find(detail => detail.unitName === unitName);

		if (detail && detail.mrpPerBottle) {
			const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
			return formatter.format(detail.mrpPerBottle);
		}
		return '-';
	}


	selectTab(tab: any) {
		this.selectedTab = tab.brandId
		if (tab.brandId == 0) {
			this.getAllProducts()
			this.clearSearch();
		}
		else {
			this.getLiquoreProductsByBrandId(tab.brandId)
			this.clearSearch();
		}
	}

	filterProducts() {
		if (this.searchTerm.trim() === '') {
			this.filteredProductList = [...this.productList];
			return;
		}
		const lowerSearchTerm = this.searchTerm.toLowerCase();

		this.filteredProductList = this.productList
			.map(company => {
				const filteredProducts = company.Product_Name.filter(product =>
					product.productName.toLowerCase().includes(lowerSearchTerm)
				);
				return filteredProducts.length > 0 ? { ...company, Product_Name: filteredProducts } : null;
			})
			.filter(company => company !== null);
	}

	clearSearch() {
		this.searchTerm = '';
		this.filterProducts();
	}

	scrollToTop() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
}
