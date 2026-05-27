import { Component } from '@angular/core';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-organisation-structure',
  standalone: true,
  imports: [OrganizationChartModule],
  templateUrl: './organisation-structure.component.html',
  styleUrl: './organisation-structure.component.css'
})
export class OrganisationStructureComponent {
  boardOfDirector = [
    {
      label: 'CHAIRPERSON',
      expanded: true,
      children: [
        {
          label: 'The ACS Secretary to Govt.Home Prohibition & Excise Dept .',
          expanded: false,
        },
        {
          label: 'The Principal Secretary to Govt. Finance Dept .',
          expanded: false,
        },
        {
          label: 'The Principal Secretary to Govt. Commercial Taxes & Registration Dept .',
          expanded: false,
        },
        {
          label: 'The Diretor Commissioner of Prohibition & Excise .',
          expanded: false,
        },
        {
          label: 'Additional Director (BPE), Finance Department, Secretariat.',
          expanded: false,
        },
        {
          label: 'The Managing Director, Tasmac Ltd.',
          expanded: false,
        }
      ]
    }
  ];

  tasmacOrganisatinStructure = [
    {
      label: 'MANAGING DIRECTOR',
      expanded: true,
      children: [
        {
          label: 'GENERAL MANAGER (WholeSale & Admin)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Retail Vending)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Personnel & Welfare)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Finance)',
          expanded: false,
        },
        {
          label: 'SENIOR REGIONAL MANAGERS',
          expanded: true,
          children: [
            {
              label: 'CHENNAI REGION',
              expanded: false,
              // children: [
              //   {
              //     label: '38 District Managers',
              //     expanded: false,
              //   },
              //   {
              //     label: '5 SPECIAL FLYING SQUAD',
              //     expanded: false,
              //   }
              // ]
            },
            {
              label: 'COIMBATORE REGION',
              expanded: false,
            },
            {
              label: 'MADURAI REGION',
              expanded: false,
            },
            {
              label: 'SALEM REGION',
              expanded: false,
            },
            {
              label: 'TRICHY REGION',
              expanded: false,
            },
          ]
        },
        {
          label: 'COMPANY SECRETARY',
          expanded: false,
        },
        {
          label: 'LAW OFFICER',
          expanded: false,
        },
      ]
    }
  ]

  corporateOrganisatinStructure = [
    {
      label: 'MANAGING DIRECTOR',
      expanded: true,
      children: [
        {
          label: 'GENERAL MANAGER (WholeSale & Admin)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Retail Vending)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Personnel & Welfare)',
          expanded: false,
        },
        {
          label: 'GENERAL MANAGER (Finance)',
          expanded: false,
        },
        {
          label: 'COMPANY SECRETARY',
          expanded: false,
        },
        {
          label: 'LAW OFFICER',
          expanded: false,
        },

      ]
    }
  ]
}
