import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-title',
  template: `
    <div class="p-4 border-round surface-card shadow-2 mb-3">
      <div class="flex align-items-center gap-3">
        <div>
          <h2 class="m-0 text-xl font-semibold text-900">{{ title }}</h2>
          @if (description) {
          <p class="m-0 text-sm text-600">
            {{ description }}
          </p>
          }
        </div>
      </div>
    </div>

    
  `,
  styles: ``,
  standalone: true,
  imports: [CommonModule],
})
export class PageTitleComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
