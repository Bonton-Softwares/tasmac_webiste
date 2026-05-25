import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boardofdirector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boardofdirector.component.html',
  styleUrl: './boardofdirector.component.css'
})
export class BoardofdirectorComponent {
  boardData = [
    {
      name: "Thiru. K.Manivasan , IAS",
      description: "The Chairman, TASMAC and Additional Chief Secretary to Government, Home, Prohibition and Excise Department, Secretariat, Chennai – 600 009."
    },
    {
      name: "Thiru. M.A. Siddique, IAS",
      description: "Additional Chief Secretary to Government, Finance Department, Secretariat, Chennai – 600 009."
    },
    {
      name: "Thiru. J. Kumaragurubaran, IAS",
      description: "Secretary to Government, Commercial Taxes and Registration Department, Secretariat, Chennai – 600 009."
    },
    {
      name: "Tmt. S.P. Karthikaa, IAS",
      description: "Director of Prohibition and Excise, Chepauk, Chennai – 600 005."
    },
    {
      name: "Thiru. K. Nanthakumar, IAS",
      description: "Managing Director, TASMAC Ltd., Egmore, Chennai – 600 008."
    },
    {
      name: "Thiru. C.R. Balaji",
      description: "Additional Director (BPE), Finance Department, Secretariat, Chennai."
    }
  ];

}
