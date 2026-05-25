import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { OfficeDetailsComponent } from '../office-details/office-details.component';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../services/form.service';

@Component({
	selector: 'app-offices',
	standalone: true,
	imports: [CommonModule, OfficeDetailsComponent],
	templateUrl: './offices.component.html',
	styleUrl: './offices.component.css'
})
export class OfficesComponent implements OnInit {
	@Input() officeData: any;
	selectedOfficeData: any;
	selectedOfficeType: number = 1
	isShow: boolean = false;
	topPosToStartShowing = 100;
	staffDetails: any

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
	constructor(private activatedRoute: ActivatedRoute, private formService: FormService) { }
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: any) => {
			if (params.offices) {
				this.getStaffByOffice(parseInt(params.offices))
			}
		});
		this.getStaffByOffice(this.selectedOfficeType)
	}

	getStaffByOffice(staffType: number) {
		this.selectedOfficeType = staffType;

		this.formService.getStaffByOffice(staffType).subscribe((res: any) => {
			this.staffDetails = (res?.data?.staffs?.data || []).map((staff: any) => ({
				...staff,
				name: staff.name?.toUpperCase() || ''
			}));
		});
	}

}
