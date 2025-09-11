
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService, Blog } from '../blog.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blog',
  imports: [FooterComponent,CommonModule,HeaderComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  error: string | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe({
      next: (res: Blog[]) => {
        this.blogs = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Failed to load blogs';
        this.loading = false;
      }
    });
  }

 
   goToBlog(id:number | undefined){
    if(id === undefined) return;
    console.log('Navigating to blog id:', id);
    this.router.navigate(['/blogdet', id]);

  }
}
