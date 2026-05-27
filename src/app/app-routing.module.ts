import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockAvailabilityComponent } from './stock-availability/stock-availability.component';
import { OrganisationStructureComponent } from './allpolicy/organisation-structure/organisation-structure.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ExciseComponent } from './allpolicy/excise/excise.component';
import { OnlinePermitsComponent } from './allpolicy/online-permits/online-permits.component';
import { ReportComponent } from './report/report.component';
import { GrievancesComponent } from './grievances/grievances.component';
import { LoginsComponent } from './logins/logins.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		loadComponent: () =>
			import('./home/home-page/home-page.component').then(
				mod => mod.HomePageComponent
			),
	},
	{
		path: 'about',
		loadComponent: () =>
			import('./abouts/about.component').then(
				mod => mod.AboutComponent
			),
	},
	{
		path: 'services',
		loadComponent: () =>
			import('./services/services-page/services-page.component').then(
				mod => mod.ServicesPageComponent
			),
	},
	{
		path: 'testimonials',
		loadComponent: () =>
			import('./testimonial/testimonial-page/testimonial-page.component').then(
				mod => mod.TestimonialPageComponent
			),
	},
	{
		path: 'gallery',
		loadComponent: () =>
			import('./gallery/gallery-page/gallery-page.component').then(
				mod => mod.GalleryPageComponent
			),
	},
	{
		path: 'brands',
		loadComponent: () =>
			import('./brands/brands-page/brands-page.component').then(
				mod => mod.brandsPageComponent
			),
	},
	{
		path: 'pricing',
		loadComponent: () =>
			import('./pricing/pricing-page/pricing-page.component').then(
				mod => mod.PricingPageComponent
			),
	},
	{
		path: 'contact',
		loadComponent: () =>
			import('./contact/contact.component').then(
				mod => mod.ContactComponent
			),
	},
	{
		path: 'suppliers',
		loadComponent: () =>
			import('./suppliers/suppliers.component').then(
				mod => mod.SuppliersComponent
			),
	},
	{
		path: 'organization',
		loadComponent: () =>
			import('./organisation/organization.component').then(
				mod => mod.OrganizationComponent
			),
	},
	{
		path: 'shoplocator',
		loadComponent: () =>
			import('./shop-locator/shop-locator.component').then(
				mod => mod.ShopLocatorComponent
			),
	},
	{
		path: 'offices',
		loadComponent: () =>
			import('./offices/offices.component').then(
				mod => mod.OfficesComponent
			),
	},
	{
		path: 'rti',
		loadComponent: () =>
			import('./allpolicy/rti/rti.component').then(
				mod => mod.RtiComponent
			),
	},
	{
		path: 'policies',
		loadComponent: () =>
			import('./allpolicy/policies/policies.component').then(
				mod => mod.PoliciesComponent
			),
	},
	{
		path: 'actrules',
		loadComponent: () =>
			import('./allpolicy/act-rules/act-rules.component').then(
				mod => mod.ActRulesComponent
			),
	},
	{
		path: 'feedback',
		loadComponent: () =>
			import('./allpolicy/feedback/feedback.component').then(
				mod => mod.FeedbackComponent
			),
	},
	{
		path: 'disclaimer',
		loadComponent: () =>
			import('./allpolicy/disclaimer/disclaimer.component').then(
				mod => mod.DisclaimerComponent
			),
	},
	{
		path: 'privacypolicy',
		loadComponent: () =>
			import('./allpolicy/privacypolicy/privacypolicy.component').then(
				mod => mod.PrivacypolicyComponent
			),
	},
	{
		path: 'sitemap',
		loadComponent: () =>
			import('./allpolicy/sitemap/sitemap.component').then(
				mod => mod.SitemapComponent
			),
	},
	{
		path: 'termservice',
		loadComponent: () =>
			import('./allpolicy/termservice/termservice.component').then(
				mod => mod.TermserviceComponent
			),
	},
	{
		path: 'vigilance',
		loadComponent: () =>
			import('./allpolicy/vigilance/vigilance.component').then(
				mod => mod.VigilanceComponent
			),
	},
	{
		path: 'profile',
		loadComponent: () =>
			import('./allpolicy/profile/profile.component').then(
				mod => mod.ProfileComponent
			),
	},
	{
		path: 'downloads',
		loadComponent: () =>
			import('./allpolicy/download-report/download-report.component').then(
				mod => mod.DownloadReportComponent
			),
	},
	{
		path: 'complaints',
		loadComponent: () =>
			import('./allpolicy/complaints/complaints.component').then(
				mod => mod.ComplaintsComponent
			),
	},
	{
		path: 'orgchart',
		loadComponent: () =>
			import('./allpolicy/org-chart/org-chart.component').then(
				mod => mod.OrgChartComponent
			),
	},
	{
		path: 'boardofdirector',
		loadComponent: () =>
			import('./allpolicy/boardofdirector/boardofdirector.component').then(
				mod => mod.BoardofdirectorComponent
			),
	},
	{
		path: 'noticeboard',
		loadComponent: () =>
			import('./allpolicy/noticeboard/noticeboard.component').then(
				mod => mod.NoticeboardComponent
			),
	},
	{
		path: 'stock-availability',
		component: StockAvailabilityComponent
	},
	{
		path: 'organisation-structure',
		component: OrganisationStructureComponent
	},
	{
		path: 'inventory',
		component: InventoryComponent
	},
	{
		path: 'excise',
		component: ExciseComponent
	},
	{
		path: 'online-permit',
		component: OnlinePermitsComponent
	},
	{
		path: 'reports',
		component: ReportComponent
	},
	{
		path: 'grievances',
		component: GrievancesComponent
	},
	{
		path: 'logins',
		component: LoginsComponent
	},
	{
		path: '404',
		loadComponent: () =>
			import('./notfound/notfound-page/notfound-page.component').then(
				mod => mod.NotfoundPageComponent
			),
	},
	// {
	// 	path: '404',
	// 	loadChildren: () =>
	// 		import('./notfound/notfound-page/notfound-page.component').then(
	// 			mod => mod.NotfoundPageComponent
	// 		),
	// },
	{ path: '**', redirectTo: '/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule { }
