# Project Architecture (Minimal - For Category Section)

## Tech Stack
- Angular 21 (Standalone Components)
- Tailwind CSS (fully configured)
- Signals for state management

## Folder Structure

```
src/app/
├── features/
│   └── home/
│       ├── pages/
│       │   └── home/                    # Main home page (smart component)
│       │       ├── home.component.ts
│       │       └── home.component.html
│       │
│       └── components/
│           └── category-section/        # Category grid section (smart component)
│               ├── category-section.component.ts
│               └── category-section.component.html
│
└── shared/
    └── ui/
        └── category-card/               # Single category card (dumb component)
            ├── category-card.component.ts
            └── category-card.component.html
```

## Component Types

### Smart Components (features/home/...)
- Handle data and logic
- Use Signals for state
- Located in `features/home/pages/` or `features/home/components/`

### Dumb Components (shared/ui/...)
- Pure UI only
- Receive inputs, emit outputs
- 100% reusable
- Located in `shared/ui/`

## Naming Rules
- Files: `kebab-case.component.ts`
- Classes: `PascalCase` (e.g., `CategoryCardComponent`)
- Selectors: `app-{name}` (e.g., `app-category-card`)

## Signal Pattern
```typescript
// State
items = signal<Category[]>([]);
loading = signal(false);

// Computed
itemCount = computed(() => this.items().length);
```

## Responsive Grid (Tailwind)
```html
<!-- Mobile: 4 cols, Tablet: 6 cols, Desktop: 8 cols -->
<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
```

## Import Pattern
```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
```

That's all you need to know for now!