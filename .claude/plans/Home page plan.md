# Home Page - Category Section Plan

## What We're Building

The "Shop By Category" section with circular category icons.

```
┌─────────────────────────────────────────┐
│  Shop By Category      View All →      │
├─────────────────────────────────────────┤
│  [🍎]   [🥛]   [👕]   [🍕]   [🥤]   │
│  Fruit  Dairy Fashion Snacks Beverages  │
│                                         │
│  [🏠]   [📚]   [💄]   [🔌]   [🎮]   │
│  Home  Books Beauty  Tech   Toys        │
└─────────────────────────────────────────┘
```

---

## Step-by-Step Build Order

### Step 1: Create Category Model
**File:** `src/app/shared/models/category.model.ts`

```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;      // emoji or icon class
  image?: string;     // image URL (we'll use placeholder for now)
}
```

---

### Step 2: Create CategoryCard Component (Dumb)
**File:** `src/app/shared/ui/category-card/category-card.component.ts`

**Requirements:**
- Standalone component
- Input: `category` (required)
- Output: none (just navigates via routerLink)
- Circular image/icon
- Category name below
- Hover effect: scale(1.05)

**Design specs:**
- Circle size: 80px mobile, 96px desktop
- Text: center-aligned, 14px, font-semibold
- Gap between image and text: 8px
- Use placeholder image: `https://placehold.co/96x96/22c55e/white?text=${category.name[0]}`

---

### Step 3: Create CategorySection Component (Smart)
**File:** `src/app/features/home/components/category-section/category-section.component.ts`

**Requirements:**
- Has Signal with mock categories
- Renders grid of CategoryCard components
- Shows "View All →" link
- Section heading: "Shop By Category"

**Mock Data (8 categories):**
```typescript
categories = signal<Category[]>([
  { id: '1', name: 'Fruit', slug: 'fruit', icon: '🍎' },
  { id: '2', name: 'Dairy & Eggs', slug: 'dairy', icon: '🥛' },
  { id: '3', name: "Women's Fashion", slug: 'women-fashion', icon: '👗' },
  { id: '4', name: 'Snacks', slug: 'snacks', icon: '🍕' },
  { id: '5', name: 'Beverages', slug: 'beverages', icon: '🥤' },
  { id: '6', name: 'Home', slug: 'home', icon: '🏠' },
  { id: '7', name: 'Books', slug: 'books', icon: '📚' },
  { id: '8', name: 'Beauty', slug: 'beauty', icon: '💄' },
]);
```

**Grid layout:**
- Mobile: 4 columns
- Tablet: 6 columns  
- Desktop: 8 columns
- Gap: 16px

**Section styling:**
- Padding: py-8 lg:py-12
- Container: max-w-7xl mx-auto px-4

---

### Step 4: Create Home Page (Container)
**File:** `src/app/features/home/pages/home/home.component.ts`

**For now, just:**
- Import and use `<app-category-section />`
- Simple container
- We'll add other sections later

---

## How to Use with Claude Code

### In VS Code, tell Claude Code:

**First:**
```
"Read architecture.md and home-page-plan.md. 
Create the Category model in src/app/shared/models/category.model.ts"
```

**Then:**
```
"Create the CategoryCard component in shared/ui/ 
following the specs in home-page-plan.md"
```

**Then:**
```
"Create the CategorySection component with the mock data 
from home-page-plan.md"
```

**Finally:**
```
"Create the Home page that uses the CategorySection component"
```

---

## Expected Result

After these steps, you should have:
- ✅ Working category grid
- ✅ Circular category cards  
- ✅ Responsive layout (4-6-8 columns)
- ✅ Hover effects
- ✅ Ready to add more sections later

---

## Testing Checklist

- [ ] Categories display in grid
- [ ] Circles are properly rounded
- [ ] Hover scale effect works
- [ ] Responsive (test mobile, tablet, desktop)
- [ ] "View All" link is visible
- [ ] No console errors

---

**Next Steps After This:**
Once this works, we'll add:
1. Hero Banner
2. Featured Products
3. Other sections one by one