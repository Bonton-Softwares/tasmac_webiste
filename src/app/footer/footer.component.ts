import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ConfigService } from '../shared/services/config.service';
import { Footer } from './footer.model';
import { SocialComponent } from '../social/social.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [
        RouterLink,
        SocialComponent,
        AsyncPipe
    ]
})
export class FooterComponent implements OnInit {

    visitorCount: number = 0;
    lastUpdated: string = '';
    footer$: Observable<Footer> = new Observable();

    constructor(private config: ConfigService) { }

    ngOnInit(): void {
        this.getPageData('pages', 6);
        this.initializeVisitorCount();
        this.setLastUpdatedDate();
    }

    getPageData(database: string, id?: number): void {
        this.footer$ = this.config.getSettings(database, id);
    }

    initializeVisitorCount(): void {

        const storedCount = localStorage.getItem('visitorCount');

        if (storedCount) {
            this.visitorCount = Number(storedCount) + 1;
        } else {
            this.visitorCount = 40;
        }

        localStorage.setItem(
            'visitorCount',
            this.visitorCount.toString()
        );
    }

    setLastUpdatedDate(): void {

        const today = new Date();

        this.lastUpdated = today.toLocaleDateString(
            'en-GB',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        );
    }

}