import { Component, OnInit } from '@angular/core';
import { BlogService, Blog } from '../../blog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngFor, *ngIf, pipes
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-blog-management',
  imports: [CommonModule,FormsModule ],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs: Blog[] = [];
  blog: Partial<Blog> = {};
  editMode: boolean = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (res: Blog[]) => this.blogs = res,
      error: (err: any) => console.error('Failed to load blogs', err)
    });
  }

 selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

submitBlog() {
  const formData = new FormData();
  formData.append('title', this.blog.title || '');
  formData.append('excerpt', this.blog.excerpt || '');
  formData.append('content', this.blog.content || '');
  formData.append('author', this.blog.author || '');
  formData.append('category', this.blog.category || '');

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.editMode) {
    this.blogService.updateBlog(this.blog.id!, formData).subscribe({
      next: (res) => { this.loadBlogs(); this.editMode = false; this.resetForm(); },
      error: (err) => console.error('Update failed', err)
    });
  } else {
    this.blogService.addBlog(formData).subscribe({
      next: (res) => { this.loadBlogs(); this.resetForm(); },
      error: (err) => console.error('Add failed', err)
    });
  }
}

  editBlog(blog: Blog): void {
    this.blog = { ...blog };
    this.editMode = true;
  }

  deleteBlog(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: (_res: any) => this.loadBlogs(),
        error: (err: any) => console.error('Delete failed', err)
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.blog = {};
    this.editMode = false;
  }
}
