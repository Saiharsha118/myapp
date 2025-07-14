import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService, Entry } from '../dataservice';

@Component({
  selector: 'app-marketform',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule],
  templateUrl: './marketform.html',
  styleUrl: './marketform.css'
})
export class Marketform implements OnInit {
  marketForm!: FormGroup;
  marketScopes = ['Central', 'Northeast', 'South', 'Midwest'];
  businessCenters = ['Central', 'Northeast', 'South', 'Midwest'];
  dmas = ['DMA1', 'DMA2', 'DMA3']; // You can replace with real DMA values
  states = ['California', 'Texas', 'New York', 'Florida']; // Placeholder

  dataSource = new MatTableDataSource<Entry>();
  displayedColumns = ['MarketScope', 'MarketName', 'BCenter', 'DMA', 'State', 'Focus', 'Actions'];
  editingIndex: number | undefined;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.marketForm = this.fb.group({
      MarketScope: ['', Validators.required],
      MarketName: ['', Validators.required],
      BCenter: ['', Validators.required],
      DMA: ['', Validators.required],
      State: ['', Validators.required],
      Focus: ['', Validators.required]
    });

    this.dataService.getDataObservable().subscribe(entries => {
      this.dataSource.data = entries;
    });

    this.dataService.selectedEntry$.subscribe(entry => {
      if (entry) {
        this.marketForm.patchValue(entry);
        this.editingIndex = this.dataSource.data.findIndex(e => e === entry);
      }
    });
  }

  onSubmit() {
    if (this.marketForm.invalid) return;

    const entry: Entry = this.marketForm.value;

    if (this.editingIndex !== undefined) {
      this.dataService.update(entry, this.editingIndex);
      this.editingIndex = undefined;
    } else {
      this.dataService.create(entry);
    }

    this.marketForm.reset();
  }

  clearForm() {
    this.marketForm.reset();
    this.editingIndex = undefined;
  }

  deleteEntry(entry: Entry) {
    this.dataService.delete(entry);
  }

  editEntry(entry: Entry) {
    this.dataService.setSelectedEntry(entry);
  }
 }
  


