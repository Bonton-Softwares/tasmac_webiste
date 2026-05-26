import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ConfigService } from '../../shared/services/config.service';
import { Header } from '../models/header.model';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GalleryPageComponent } from "../../gallery/gallery-page/gallery-page.component";
import { brandsPageComponent } from "../../brands/brands-page/brands-page.component";
import { TickerComponent } from "../../ticker/ticker.component";
import { ServicesPageComponent } from "../../services/services-page/services-page.component";
import { OfficeDetailsComponent } from "../../office-details/office-details.component";
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from "../../organisation/organization.component";
import { AboutComponent } from "../../abouts/about.component";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	standalone: true,
	styleUrl: './home-page.component.css',
	imports: [
		RouterLink,
		AsyncPipe,
		GalleryPageComponent,
		brandsPageComponent,
		TickerComponent,
		ServicesPageComponent,
		OfficeDetailsComponent,
		CommonModule,
		OrganizationComponent,
		AboutComponent,
	],
})
export class HomePageComponent implements OnInit {
	mapUrl!: SafeResourceUrl;
	private shopUrl = 'assets/tasmac-shops.json'
	header$: Observable<Header>;
	selectedOfficeData: any;
	selectedOfficeType: string | null = null;
	isShow: boolean = false;
	topPosToStartShowing = 100;
	progressValue: number = 0;
	targetValue: number = 48; // Set your target value here
	shopData: any
	constructor(private config: ConfigService, private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) { }

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

	ngOnInit() {
		this.getPageData('pages', 7);
		setTimeout(() => {
			const button = document.getElementById('prevButton');
			if (button) {
				button.click();
			}
		}, 2000);
		// run porgess
		this.runProgress();
		this.http.get(this.shopUrl).subscribe((res: any) => {
			this.shopData = res
			console.log(this.shopData.length)
		})
		this.loadDefaultMap();
	}

	loadDefaultMap() {

		this.mapUrl =
			this.sanitizer.bypassSecurityTrustResourceUrl(
				'https://maps.google.com/maps?q=Chennai&t=&z=11&ie=UTF8&iwloc=&output=embed'
			);

	}

	findNearbyShop() {

		if (!navigator.geolocation) {

			alert(
				'Geolocation is not supported'
			);

			return;
		}

		navigator.geolocation.getCurrentPosition(

			(position) => {

				const latitude =
					position.coords.latitude;

				const longitude =
					position.coords.longitude;


				// Search nearby TASMAC shops

				this.mapUrl =
					this.sanitizer
						.bypassSecurityTrustResourceUrl(

							`https://maps.google.com/maps?q=TASMAC+near+${latitude},${longitude}&z=14&output=embed`

						);

				setTimeout(() => {

					document
						.getElementById('shopSection')
						?.scrollIntoView({

							behavior: 'smooth',
							block: 'start'

						});

				}, 300);

			},

			(error) => {

				console.log(error);

				alert(
					'Please allow location access'
				);

			}

		);

	}

	runProgress() {
		const interval = setInterval(() => {
			if (this.progressValue < this.targetValue) {
				this.progressValue++;
			} else {
				clearInterval(interval);
			}
		}, 50);
	}

	getPageData(database: string, id?: number): void {
		this.header$ = this.config.getSettings(database, id).pipe(
			catchError(error => {
				console.error('Error fetching feature data:', error);
				return throwError(error);
			})

		);
	}

	regionalOffices = {
		title: 'Regional Managers Offices',
		offices: [
			{
				city: 'Chennai',
				address:
					'735, IV Floor, L.L.A. Building, Anna Salai, Chennai, Tamil Nadu, 600 002.',
				phone: '044-28591025, 28551517',
				mobile: '9445029704',
				fax: '044-28542302',
				email: 'srmchennaitasmac@gmail.com',
				paToSrm: '9944474473',
				flyingSquad: '9445029756',
			},
			{
				city: 'Salem',
				address: 'No.56, Brindavan Road, Fairlands, Salem, Tamil Nadu, 636016.',
				phone: '0427-2445955',
				mobile: '9445029706',
				fax: '0427-2445934',
				email: 'srmtasmacsalem@gmail.com',
				paToSrm: '9443783683',
				flyingSquad: '9750955721',
			},
			{
				city: 'Trichy',
				address:
					'District Collector Office, Old Building First Floor, DRO Chamber, Tiruchirappalli, Tamil Nadu, 620 001.',
				phone: '0431-2400487',
				mobile: '9445029708',
				fax: '0431-2400138',
				email: 'srmtrichy2@gmail.com',
				paToSrm: '9445029708',
				flyingSquad: '9445029758',
			},
			{
				city: 'Madurai',
				address: 'Plot No.100, Anna Nagar, Madurai, Tamil Nadu, 625020.',
				phone: '0452-2536386',
				mobile: '9445029707',
				fax: '0452-2537816',
				email: 'tasmacsrm@yahoo.com',
				paToSrm: '7550150250',
				flyingSquad: '9445029757',
			},
			{
				city: 'Coimbatore',
				address:
					'305A, Vilankurichi road, Peelamedu Railway station back side, Chintamani Co-operative Society Depot, Peelamedu, Coimbatore - 641 004.',
				phone: '0422-2513300, 2513434',
				mobile: '9445029705',
				fax: '-',
				email: 'srmtasmaccbe@gmail.com',
				paToSrm: '-',
				flyingSquad: '9445029759',
			},
		],
	};
	districtOffices = {
		title: 'District Managers Offices',
		offices: [
			{
				city: 'Chennai North',
				address:
					'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'dmtasmacnorth@gmail.com',
				mobile: '9445029710',
				tel: '26250415',
			},
			{
				city: 'Chennai Central',
				address:
					'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'dmtasmaccentral@gmail.com',
				mobile: '9445029711',
				tel: '26230016',
			},
			{
				city: 'Chennai South',
				address:
					'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'dmtasmacsouth@gmail.com',
				mobile: '9445029709',
				tel: '26522381',
			},
			{
				city: 'Thiruvallur East',
				address:
					'IMFS Depot, Bangalore High Road, Chembarambakkam Village, Thiruvallur District, Tamil Nadu - 600123',
				email: 'dmtasmacthiruvallureast@gmail.com',
				mobile: '9445029748',
				tel: '26810423',
			},
			{
				city: 'Kancheepuram North',
				address:
					'IMFS Depot, Bangalore High Road, Chembarambakkam Village, Thiruvallur District, Tamil Nadu - 600123',
				email: 'dmtasmacnorthkanchi@gmail.com',
				mobile: '9445029747',
				tel: '26811555',
			},
			{
				city: 'Kancheepuram South',
				address:
					'14 to 18, SIDCO Industrial Estate, Sevilimedu Village, Kancheepuram, Tamil Nadu - 631502',
				email: 'dmtasmackancheepuram@gmail.com',
				mobile: '9445029728',
				tel: '27238334',
			},
			{
				city: 'Thiruvallur West',
				address:
					'G-29 and 30, Industrial Estate, SIDCO Road, Kakalur, Tamil Nadu, 602003',
				email: 'dmtasmacthiruvallur@gmail.com',
				mobile: '9445029712',
				tel: '27662123',
			},
			{
				city: 'Vellore',
				address:
					'Tamil Nadu Ware Housing Corporation, Katpadi Road, Vellore, Tamil Nadu, 632004',
				email: 'dmtasmacvellore@gmail.com',
				mobile: '9445029726',
				tel: '2223042',
			},
			{
				city: 'Thiruvannamalai',
				address:
					'IMFS Depot, Kanathampoondi Village, Tiruvannamalai Tamil Nadu, 606603.',
				email: 'dmtasmactvmalai@gmail.com',
				mobile: '9445029734',
				tel: '252097',
			},
			{
				city: 'Salem',
				address:
					'87/5, Sandiyur Village, A.Attaiyampatti Village, Salem, Tamil Nadu, 636203',
				email: 'dmtasmacsalem@gmail.com',
				mobile: '9445029739',
				tel: '2341450',
			},
			{
				city: 'Namakkal',
				address:
					'83/6, Krishnapuram Road, Thummankuruchi Village, Tiruchengode Main Road, Namakkal, Tamil Nadu, 637001',
				email: 'dmtasmacnamakkal@gmail.com',
				mobile: '9445029718',
				tel: '280384',
			},
			{
				city: 'Dharmapuri',
				address:
					'Bangalore Salem National Highway, Thadangam Village, Dharmapuri, Tamil Nadu, 636705',
				email: 'dmtasmacdharmapuri@gmail.com',
				mobile: '9445029720',
				tel: '230637',
			},
			{
				city: 'Krishnagiri',
				address:
					'1,2/123, Tamil Nadu Ware Housing Corporation, Biyanapalli Village, Krishnagiri, Tamil Nadu, 635115',
				email: 'dmtasmackrishnagiri@gmail.com',
				mobile: '9445029725',
				tel: '200521',
			},
			{
				city: 'Arakonam',
				address:
					'12-B, Tamil Nadu Ware Housing Corporation, SIPCOt Ranipet, Walaja Taluk, Vellore District, Tamil Nadu, 632401',
				email: 'akmdmoffice@gmail.com',
				mobile: '9445029755',
				tel: '2500193',
			},
			{
				city: 'Villupuram',
				address:
					'59 A, Compartment No.II, Tamil Nadu ware Housing Corporation, Chennai Trunk Road, Villupuram, Tamil Nadu, 605602',
				email: 'dmviluppuram@gmail.com',
				mobile: '9445029730',
				tel: '0416-222828',
			},
			{
				city: 'Thanjavur',
				address:
					'50/57, TANSIDCO Complex, Nanjikottai Road, Thanjavur, Tamil Nadu, 613006',
				email: 'dmtanjore09@gmail.com',
				mobile: '9445029735',
				tel: '0436-255408, 256623',
			},
			{
				city: 'Thiruvarur',
				address:
					'R.S.No.461/2, 461/4 and 462/1, Master Plan Complex, Mannargudi Road,, Vilamal, Tamil Nadu, 610004',
				email: 'dmtiruvarur@gmail.com',
				mobile: '9445029731',
				tel: '04366-222433',
			},
			{
				city: 'Nagapatinam',
				address:
					'Tasmac ltd Industrial Estate, Thirubuvanam, Thiruvidaimarudhur Taluk, Kumbakonam, Tamil Nadu, 612001',
				email: 'districtmanager.tasmacnagai@gmail.com',
				mobile: '9445029727',
				tel: '0435-2460408',
			},
			{
				city: 'Pudukkottai',
				address:
					'5/B1, SIPCOT Industrial Complex, Pudukkottai, Tamil Nadu, 622002',
				email: 'dmtasmacpdkt@gmail.com',
				mobile: '9445029719',
				tel: '04322-244017, 244117',
			},
			{
				city: 'Trichy',
				address:
					'72, C.P.3, SIDCO Estate, BHEL Nagar, Thuvakudi, Tamil Nadu, 620015',
				email: 'depotrchy@gmail.com',
				mobile: '9445029729',
				tel: '2500193',
			},
			{
				city: 'Karur',
				address:
					'Tamil Nadu Ware Housing Corporation, V.S. Vellapatty Post, Tamil Nadu, 639004',
				email: 'dmtasmackarur@gmail.com',
				mobile: '9445029717',
				tel: '04324-242628, 242428',
			},
			{
				city: 'Perambalur',
				address: 'North Madhavi Road, Elambalur Post, Tamil Nadu, 621220',
				email: 'pblrdm@yahoo.com',
				mobile: '9445029732',
				tel: '04328-290465',
			},
			{
				city: 'Cuddalore',
				address:
					'SIDCO Industrial Estate Complex, Kudikadu, Tamil Nadu, 607005',
				email: 'dmcuddalore@gmail.com',
				mobile: '9445029733',
				tel: '04142-239152',
			},
			{
				city: 'Madurai North',
				address:
					'1, Madurai Rameswaram National Highway, Manalur Post, Tamil Nadu, 630611',
				email: 'dmtasmacmdu@gmail.com',
				mobile: '9445029746',
				tel: '232550',
			},
			{
				city: 'Madurai South',
				address:
					'4, Tamil Nadu Ware Housing Corporation, Thirumangalam Taluk, Kappalur Village, Thirumangalam, Tamil Nadu, 625008',
				email: 'dmtasmacmdusouth@gmail.com',
				mobile: '9445029738',
				tel: '2487248',
			},
			{
				city: 'Dindigul',
				address: 'TASCO Unit, Mulipadi, Mulipadi, Dindigul, Tamil Nadu, 624005',
				email: 'amdindigultasmac@gmail.com',
				mobile: '9445029736',
				tel: '2410507',
			},
			{
				city: 'Virudhunagar',
				address:
					'29-34, SIDCO Industrial Estate, Soolakkarai, Soolakarai, Virudhunagar, Tamil Nadu, 626003',
				email: 'amavdutasmac@gmail.com',
				mobile: '9445029741',
				tel: '252913',
			},
			{
				city: 'Ramanathapuram',
				address:
					'139, Master Plan Complex, Madurai Rameswaram Road, Sakkarakottai Village, Ramanathapuram, Tamil Nadu, 623503',
				email: 'tasmac.ramnad@gmail.com',
				mobile: '9445029713',
				tel: '232550',
			},
			{
				city: 'Sivagangai',
				address:
					'Narikuruvar Colony, Thondi Road, Palamalai Nagar, Soorakulam Village, Sivagangai, Tamil Nadu, 630606',
				email: 'amsivaganga@gmail.com',
				mobile: '9445029740',
				tel: '244387',
			},
			{
				city: 'Theni',
				address: 'IMFS Depot, Karuvelnaikkanpatty, Theni, Tamil Nadu, 625531',
				email: 'thenitasmac@gmail.com',
				mobile: '9445029722',
				tel: '252157',
			},
			{
				city: 'Tirunelveli',
				address:
					'TASCO Unit, Melapalayam, Melapalayam, Tirunelveli, Tamil Nadu, 627005',
				email: 'amtvl737@gmail.com',
				mobile: '9445029737',
				tel: '2350685',
			},
			{
				city: 'Tuticorin',
				address:
					'C-104, SIPCOT Industrial Complex, Madurai Thoothukudi Bye Pass Road, Tuticorin, Tamil Nadu, 628008',
				email: 'amatuctasmac@gmail.com',
				mobile: '9445029721',
				tel: '2341050',
			},
			{
				city: 'Nagercoil',
				address:
					'IMFS Depot, Bhethel Nagar, Senbagaramanputhur, Aaralvaymozhi, Thovalai Taluk, Kanyakumari, Tamil Nadu, 629301',
				email: 'amaknktasmac@gmail.com',
				mobile: '9445029714',
				tel: '261281',
			},
			{
				city: 'Coimbatore North',
				address:
					'305A, Vilankurichi road, Peelamedu Railway station back side, Chintamani Co-operative Society Depot, Peelamedu, Coimbatore - 641 004',
				email: 'tascbcbe@gmail.com',
				mobile: '9445029716',
				tel: '2511616',
			},
			{
				city: 'Thiruppur',
				address:
					'Tamil Nadu Ware Housing Corporation, Angeripalayam, Tirupur, Tamil Nadu, 641602',
				email: 'tasmactirupur@yahoo.com',
				mobile: '9445029715',
				tel: '2482399',
			},
			{
				city: 'Erode',
				address:
					'24, TASCO Building, Bhavani Main Road, Suriyampalayam, Erode, Tamil Nadu, 638316',
				email: 'tasmac123@gmail.com',
				mobile: '9445029723',
				tel: '2535410',
			},
			{
				city: 'Coimbatore South',
				address:
					'4/5 A, Sangampalayam Coimbatore Road, Mahalingapuram Post, Achipatti, Pollachi, Tamil Nadu, 642002',
				email: 'dmpollachi@gmail.com',
				mobile: '9445029749',
				tel: '233753, 232753',
			},
			{
				city: 'Ooty',
				address:
					'1, Regent Complex, Club Road, Nilgiris, Chennai, Tamil Nadu, 643001',
				email: 'dmtasmacooty@gmail.com',
				mobile: '9445029724',
				tel: '2440211',
			},
		],
	};
	depotsData = {
		title: 'Depots',
		offices: [
			// Chennai Region
			{
				city: 'Ambattur I',
				address: 'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'dmtasmacnorth@gmail.com',
				phone: '044-26231877'
			},
			{
				city: 'Ambattur II',
				address: 'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'ambatturdepot2@gmail.com',
				phone: '044-26231866'
			},
			{
				city: 'Ambattur III',
				address: 'Plot No.B4, Industrial Estate, Ambattur, Chennai, Tamil Nadu - 600 053',
				email: 'depoamb3tasmac@gmail.com',
				phone: '044-26522381'
			},
			{
				city: 'Thirumazhisai - I',
				address: 'IMFS Depot, Bangalore High Road, Chembarambakkam Village, Thiruvallur District, Tamil Nadu - 600123',
				email: 'tasmactmzone@gmail.com',
				phone: '044-27691785'
			},
			{
				city: 'Thirumazhisai - II',
				address: 'IMFS Depot, Bangalore High Road, Chembarambakkam Village, Thiruvallur District, Tamil Nadu - 600123',
				email: 'depotmz2tasmac@gmail.com',
				phone: '044-26810015'
			},
			{
				city: 'Thirumazhisai - III',
				address: 'IMFS Depot, Bangalore High Road, Chembarambakkam Village, Thiruvallur District, Tamil Nadu - 600123',
				email: 'tasmacpallavaram@gmail.com',
				phone: '044-26811555'
			},
			{
				city: 'Kancheepuram',
				address: '14 to 18, SIDCO Industrial Estate, Sevilimedu Village, Kancheepuram, Tamil Nadu - 631502',
				email: 'depokanchitasmac@gmail.com',
				phone: '044-26810423'
			},
			{
				city: 'Thiruvallur',
				address: 'G-29 and 30, Industrial Estate, SIDCO Road, Kakalur, Tamil Nadu, 602003',
				email: 'tiruvallurdepot@gmail.com',
				phone: '044-27662123'
			},

			// Salem Region
			{
				city: 'Vellore',
				address: 'Tamil Nadu Ware Housing Corporation, Katpadi Road, Vellore, Tamil Nadu, 632004',
				email: 'depotvelloretasmac@gmail.com',
				phone: '0416-2223042'
			},
			{
				city: 'Tiruvannamalai',
				address: 'IMFS Depot, Kanathampoondi Village, Tiruvannamalai Tamil Nadu, 606603',
				email: 'depotvmalaitasmac@gmail.com',
				phone: '9385337211'
			},
			{
				city: 'Salem',
				address: '2/92, TASCO Building, Sandiyur Village, A.Attaiyampatti Village, Salem, Tamil Nadu, 636203',
				email: 'deposalemtasmac@gmail.com',
				phone: '0427-2913370'
			},
			{
				city: 'Namakkal',
				address: '83/6, Krishnapuram Road, Thummankuruchi Village, Tiruchengode Main Road, Namakkal, Tamil Nadu, 637001',
				email: 'deponamaktasmac@gmail.com',
				phone: '04286-280384'
			},
			{
				city: 'Dharmapuri',
				address: 'Bangalore Salem National Highway, Thadangam Village, Dharmapuri, Tamil Nadu, 636705',
				email: 'dmtasmacdharmapuri@gmail.com',
				phone: '9442208814'
			},
			{
				city: 'Krishnagiri',
				address: '1,2/123, Tamil Nadu Ware Housing Corporation, Biyanapalli Village, Krishnagiri, Tamil Nadu, 635115',
				email: 'krishnagiridepot@gmail.com',
				phone: '9442553317'
			},
			{
				city: 'Salem (West)',
				address: 'C/o Natesan Mill, 141 E Sithar Kovil Main Road, Kantha mpatti Post, Salem',
				email: 'deposalemwest@gmail.com',
				phone: '0427-2970272'
			},
			{
				city: 'Arakonam',
				address: '12-B, Tamil Nadu Ware Housing Corporation, SIPCOt Ranipet, Walaja Taluk, Vellore District, Tamil Nadu, 632401',
				email: 'depotakmtasmac@gmail.com',
				phone: '04712-244608'
			},

			// Trichy Region
			{
				city: 'Cuddalore',
				address: 'SIDCO Industrial Estate Complex, Kudikadu, Tamil Nadu, 607005',
				email: 'dmcuddalore@gmail.com',
				phone: '04142-239152'
			},
			{
				city: 'Villupuram',
				address: '59 A, Compartment No.II, Tamil Nadu ware Housing Corporation, Chennai Trunk Road, Villupuram, Tamil Nadu, 605602',
				email: 'dmviluppuram@gmail.com',
				phone: '04146-223618'
			},
			{
				city: 'Thanjavur',
				address: '50/57, TANSIDCO Complex, Nanjikottai Road, Thanjavur, Tamil Nadu, 613006',
				email: 'dmtanjore09@gmail.com',
				phone: '04362-255408'
			},
			{
				city: 'Thiruvarur',
				address: 'R.S.No.461/2, 461/4 and 462/1, Master Plan Complex, Mannargudi Road, Vilamal, Tamil Nadu, 610004',
				email: 'dmtiruvarur@gmail.com',
				phone: '04366-222433'
			},
			{
				city: 'Kumbakonam',
				address: 'Tasmac limited Industrial Estate, Thirubuvanam, Thiruvidaimarudhur Road, Kumbakonam, Tamil Nadu, 612001',
				email: 'districtmanager.tasmacnagai@gmail.com',
				phone: '0435-2460408'
			},
			{
				city: 'Pudukkottai',
				address: '5/B1, SIPCOT Industrial Complex, Pudukkottai, Tamil Nadu, 622002',
				email: 'dmtasmacpdkt@gmail.com',
				phone: '04322-244017'
			},
			{
				city: 'Trichy',
				address: '72, C.P.3, SIDCO Estate, BHEL Nagar, Thuvakudi, Tamil Nadu, 620015',
				email: 'depotrchy@gmail.com',
				phone: '0431-2500835'
			},
			{
				city: 'Karur',
				address: 'Tamil Nadu Ware Housing Corporation, V.S. Vellapatty Post, Tamil Nadu, 639004',
				email: 'dmtasmackarur@gmail.com',
				phone: '04324-242268'
			},
			{
				city: 'Perambalur',
				address: 'North Madhavi Road, Elambalur Post, Tamil Nadu, 621220',
				email: 'pblrdm@yahoo.com',
				phone: '04328-290465'
			},

			// Madurai Region
			{
				city: 'Madurai Urban (East)',
				address: '1, Madurai Rameswaram National Highway, Manalur Post, Tamil Nadu, 630611',
				email: 'depomdwesttasmac@gmail.com',
				phone: '0452-2465197'
			},
			{
				city: 'Madurai Rural (West)',
				address: 'B6, Industrial Estate, Compartment No. 2, Kappalur Village, Thirumangalam, Tamil Nadu, 625008',
				email: 'depomdurbantasmac@gmail.com',
				phone: '0452-2482289'
			},
			{
				city: 'Dindugul',
				address: 'TASCO Unit, Mulipadi, Dindigul, Tamil Nadu, 624005',
				email: 'depodgltasmac@gmail.com',
				phone: '0451-2410392'
			},
			{
				city: 'Virudhunagar',
				address: '29-34, SIDCO Industrial Estate, Soolakkarai, Virudhunagar, Tamil Nadu, 626003',
				email: 'depovirutasmac@gmail.com',
				phone: '0462-252660'
			},
			{
				city: 'Ramanathapuram',
				address: '139, Master Plan Complex, Madurai Rameswaram Road, Sakkarakottai Village, Ramanathapuram, Tamil Nadu, 623503',
				email: 'tasmac.ramnad@gmail.com',
				phone: '04567-232550'
			},
			{
				city: 'Sivagangai',
				address: 'Narikuruvar Colony, Thondi Road, Palamalai Nagar, Soorakulam Village, Sivagangai, Tamil Nadu, 630606',
				email: 'sivagangadepot@gmail.com',
				phone: '04575-240274'
			},
			{
				city: 'Theni',
				address: 'IMFS Depot, Karuvelnaikkanpatty, Theni, Tamil Nadu, 625531',
				email: 'thenitasmac@gmail.com',
				phone: '04546-252157'
			},
			{
				city: 'Tirunelveli',
				address: 'TASCO Unit, Melapalayam, Tirunelveli, Tamil Nadu, 627005',
				email: 'depotnvltasmac@gmail.com',
				phone: '0462-2352864'
			},
			{
				city: 'Tuticorin',
				address: 'C-104, SIPCOT Industrial Complex, Madurai Thoothukudi Bye Pass Road, Tuticorin, Tamil Nadu, 628008',
				email: 'tasmac_tuty@yahoo.com',
				phone: '0461-2341050'
			},
			{
				city: 'Nagercoil',
				address: 'IMFS Depot, Bethel Nagar, Senbagaramanputhur, Aaralvaymozhi, Thovalai Taluk, Kanyakumari, Tamil Nadu, 629301',
				email: 'tasmac_ngl@rediffmail.com',
				phone: '04652-261281'
			},

			// Coimbatore Region
			{
				city: 'Coimbatore South',
				address: 'No.305, Vilankuruchi Road, Old Chinthamani Godown, Peelamedu, Coimbatore - 641 004, Tamil Nadu',
				email: 'depocbesouthtasmac@gmail.com',
				phone: '0422-2511717'
			},
			{
				city: 'Coimbatire North',
				address: 'No.305, Vilankuruchi Road, Old Chinthamani Godown, Peelamedu, Coimbatore - 641 004, Tamil Nadu',
				email: 'depocbenorthtasmac@gmail.com',
				phone: '0422-2510077'
			},
			{
				city: 'Thiruppur',
				address: 'Tamil Nadu Ware Housing Corporation, Angeripalayam, Tirupur, Tamil Nadu, 641602',
				email: ['depotprtasmac@gmail.com', 'tirupurtasmac@gmail.com'],
				phone: '0421-2473228'
			},
			{
				city: 'Erode',
				address: '24, TASCO Building, Bhavani Main Road, Suriyampalayam, Erode, Tamil Nadu, 638316',
				email: 'depoerodetasmac@gmail.com',
				phone: '0424-2535425'
			},
			{
				city: 'Pollachi',
				address: '4/5 A, Sangampalayam Coimbatore Road, Mahalingapuram Post, Achipatti, Pollachi, Tamil Nadu, 642002',
				email: 'pollachidepo@gmail.com',
				phone: '04259-224414'
			},
			{
				city: 'Gobi',
				address: '4/255-B, Tamil Nadu Warehousing Corporation, Sakthi Main Road, Karattadipalayam, Gobi, Tamil Nadu, 638453',
				email: 'depogobitasmac@gmail.com',
				phone: '04285-240417'
			},
			{
				city: 'Ooty',
				address: 'IMFS Depot, 305/G, Vandisolai, Kothagiri Road, Edapalli Village, Coonoor, The Nilgiris',
				email: 'tasmacootydepot@gmail.com',
				phone: '0423-2443024'
			},
			{
				city: 'Kangeyam',
				address: 'IMFS Depot, Veeranampalayam, Pagathipalayam, Kangeyam Taluk, Tiruppur, Tamil Nadu, 638701',
				email: 'depokgymtasmac@gmail.com',
				phone: '04257-246352'
			}
		]
	};



	// showDetails(type: string) {
	// 	if (type === 'regional') {
	// 		this.selectedOfficeData = this.regionalOffices;
	// 		// this.selectedOfficeType = 'regional';
	// 	} else if (type === 'district') {
	// 		this.selectedOfficeData = this.districtOffices;
	// 		// this.selectedOfficeType = 'district';
	// 	}else{
	// 		this.selectedOfficeData = this.depotsData;
	// }
	// }

	showDetails(type: string) {
		if (this.selectedOfficeType === type) {
			// If the same type is clicked again, clear the selection
			this.selectedOfficeData = null;
			this.selectedOfficeType = null;
		} else {
			// Otherwise, update the data and type
			if (type === 'regional') {
				this.selectedOfficeData = this.regionalOffices;
			} else if (type === 'district') {
				this.selectedOfficeData = this.districtOffices;
			} else {
				this.selectedOfficeData = this.depotsData;
			}
			this.selectedOfficeType = type;
		}
	}

	raiserComplain(complaintNo: string) {
		window.open(`https://wa.me/${complaintNo}?text=Hi`, '_blank');
	}
	routePrescense(offices: string) {
		const queryParams = {
			offices: offices
		}
		this.router.navigate([`/offices`], { queryParams: queryParams })
	}

}
