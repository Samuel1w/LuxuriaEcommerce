import { Component, OnInit } from '@angular/core';
import { BlogService, Blog } from '../blog.service';

import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { CommonModule as NGCommon } from '@angular/common';

@Component({
  selector: 'app-blogdet',
   imports: [NGCommon,FooterComponent,CommonModule,HeaderComponent],
  templateUrl: './blogdet.component.html',
  styleUrls: ['./blogdet.component.css']
})
export class BlogdetComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private blogService: BlogService,  private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe({
      next: (res: Blog) => {
        this.blog = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Blog not found';
        this.loading = false;
      }
    });
  }
  back() {
    this.router.navigate(['/blog']);
  }
}

