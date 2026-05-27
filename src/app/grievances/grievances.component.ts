import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grievances',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grievances.component.html',
  styleUrl: './grievances.component.css'
})
export class GrievancesComponent {

  popupVisible = false;
  popupMessage = '';

  showPopup(message: string) {
    this.popupMessage = message;
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
  }

}