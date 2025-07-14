import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface DMAEntry {
  name: string;
  businessCenter: string;
  dma: string;
  status: boolean;
}

@Component({
  selector: 'app-dmagroup',
  templateUrl: './dmagroup.html',
  styleUrl: './dmagroup.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class DMAgroup {
  filterForm: FormGroup;
  addForm: FormGroup;

  businessCenters = ['Central', 'Northeast', 'South', 'Midwest'];
  dmaOptions = ['Alpena (583)', 'Atlanta (524)', 'Austin (635)', 'Baltimore (512)'];

  dmaList: DMAEntry[] = [
    {
      name: 'DMA 1',
      businessCenter: 'Midwest',
      dma: 'Alpena (583)',
      status: true
    },
    {
      name: 'DMA 2',
      businessCenter: 'Northeast',
      dma: 'Atlanta (524)',
      status: false
    }
  ];

  filteredDMAList: DMAEntry[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      businessCenter: [''],
      dma: ['']
    });

    this.addForm = this.fb.group({
      name: [''],
      businessCenter: [''],
      dma: [''],
      status: [false]
    });

    this.filteredDMAList = [...this.dmaList];
  }

  clearFilters() {
    this.filterForm.reset();
    this.filteredDMAList = [...this.dmaList];
  }

  search() {
    const { businessCenter, dma } = this.filterForm.value;
    this.filteredDMAList = this.dmaList.filter(item =>
      (!businessCenter || item.businessCenter === businessCenter) &&
      (!dma || item.dma === dma)
    );
  }

  addDMA() {
    const newEntry: DMAEntry = this.addForm.value;
    this.dmaList.push({ ...newEntry });
    this.filteredDMAList = [...this.dmaList];
    this.addForm.reset();
  }

  deleteDMA(index: number) {
    this.dmaList.splice(index, 1);
    this.filteredDMAList = [...this.dmaList];
  }

  editDMA(index: number) {
    const item = this.filteredDMAList[index];
    this.addForm.setValue({
      name: item.name,
      businessCenter: item.businessCenter,
      dma: item.dma,
      status: item.status
    });
    this.deleteDMA(index);
  }
}


