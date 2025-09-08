
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehindService, Behind } from '../../behind.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bts-crafts',
  imports: [CommonModule,FormsModule ],
  templateUrl: './bts-crafts.component.html',
  styleUrls: ['./bts-crafts.component.css']
})
export class BtsCraftsComponent implements OnInit {
  scenes: Behind [] = [];
  scene: Partial<Behind > = {};
  selectedFile: File | null = null;
  editMode: boolean = false;

  constructor(private behindScenesService: BehindService) {}

  ngOnInit(): void {
    this.loadScenes();
  }

  loadScenes() {
    this.behindScenesService.getAll().subscribe({
      next: (res: Behind []) => this.scenes = res,
      error: (err: any) => console.error('Failed to load scenes', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitScene(form: NgForm) {
    const formData = new FormData();
    if (this.scene.title) formData.append('title', this.scene.title);
    if (this.scene.description) formData.append('description', this.scene.description);
    if (this.scene.type) formData.append('type', this.scene.type);
    if (this.selectedFile) formData.append('video', this.selectedFile);

    if (this.editMode && this.scene.id) {
      this.behindScenesService.updateBehind(this.scene.id, formData).subscribe({
        next: () => {
          this.loadScenes();
          this.resetForm(form);
        },
        error: (err: any) => console.error('Update failed', err)
      });
    } else {
      this.behindScenesService.addBehind(formData).subscribe({
        next: () => {
          this.loadScenes();
          this.resetForm(form);
        },
        error: (err: any) => console.error('Add failed', err)
      });
    }
  }

  editScene(scene: Behind) {
    this.scene = { ...scene };
    this.editMode = true;
  }

  deleteScene(id: number) {
    this.behindScenesService.deleteBehind(id).subscribe({
      next: () => this.loadScenes(),
      error: (err: any) => console.error('Delete failed', err)
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.scene = {};
    this.selectedFile = null;
    this.editMode = false;
  }
}
