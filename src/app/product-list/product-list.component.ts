
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductService, Product, Paginated  } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
  /** Inputs allow embedding in any page without routes */
  @Input() category?: 'imports' | 'craft';
  @Input() type?: 'preorder' | 'available';

  /** State */
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  currentPage = 1;
  pageSize = 12;
  totalPages = 0;
  totalItems = 0;

  /** Helpers */
  skeletons = Array.from({ length: 8 });
  pages: number[] = [];

  private subs = new Subscription();
  private routedMode = false; // true if using routes like /products/:category/:type

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Detect routed mode (params present)
    this.routedMode = !!this.route.snapshot.paramMap.get('category') || !!this.route.snapshot.paramMap.get('type');

    const src$ = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]);

    this.subs.add(
      src$.subscribe(([params, q]) => {
        if (this.routedMode) {
          this.category = (params.get('category') as any) ?? this.category;
          this.type = (params.get('type') as any) ?? this.type;
          const p = Number(q.get('page') || this.currentPage);
          const size = Number(q.get('pageSize') || this.pageSize);
          this.currentPage = Math.max(1, p);
          this.pageSize = size > 0 ? size : this.pageSize;
        }
        this.fetch();
      })
    );

    // If not using routed mode (pure Inputs), still fetch once
    if (!this.routedMode) this.fetch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.routedMode && (changes['category'] || changes['type'])) {
      this.currentPage = 1;
      this.fetch();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  fetch(): void {
    if (!this.category || !this.type) return; // wait until both are known

    this.loading = true;
    this.error = null;

    this.productService.getProducts({
      category: this.category,
      type: this.type,
      page: this.currentPage,
      pageSize: this.pageSize
    })
    .pipe(finalize(() => (this.loading = false)))
    .subscribe({
      next: (res: Paginated<Product>) => {
        this.products = res.items;
        this.totalItems = res.total;
        this.totalPages = res.pages;
        this.currentPage = res.page;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => {
        this.error = typeof err === 'string' ? err : 'Failed to load products.';
        this.products = [];
        this.totalItems = 0;
        this.totalPages = 0;
        this.pages = [];
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    if (this.routedMode) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, pageSize: this.pageSize },
        queryParamsHandling: 'merge'
      });
    } else {
      this.fetch();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    if (this.routedMode) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, pageSize: this.pageSize },
        queryParamsHandling: 'merge'
      });
    } else {
      this.fetch();
    }
  }

  reload(): void { this.fetch(); }

  trackByProductId = (_: number, p: Product) => p.id;
}
