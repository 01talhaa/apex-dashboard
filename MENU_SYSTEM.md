# Centralized Menu System
## How it works

### 1. Central Configuration File
File: `composables/useMenuItems.ts`

This file contains all your menu items in one place. To add, remove, or modify menu items, just edit this file!

```typescript
export const useMenuItems = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "Home" },
    { name: "Customers", path: "/customers", icon: "Users" },
    // Add new menu items here!
    { name: "New Feature", path: "/new-feature", icon: "Star" },
  ];

  return { menuItems };
};
```

### 2. Usage in Pages
Instead of defining menu items in every page, just import and use the composable:

```vue
<script setup>
import { useMenuItems } from '@/composables/useMenuItems';

// Get centralized menu items
const { menuItems } = useMenuItems();
</script>

<template>
  <Sidebar :shop="shop" :menuItems="menuItems" />
</template>
```

### 3. Pages Already Updated
✅ dashboard.vue
✅ customers.vue  
✅ withdraw.vue
✅ user-transactions.vue
✅ transaction-id.vue

### 4. Benefits
- **Single Source of Truth**: All menu items in one file
- **Easy Updates**: Change menu once, applies everywhere
- **Consistent**: No more mismatched menus across pages
- **Maintainable**: Easy to add/remove menu items
- **Type Safe**: TypeScript support for better development

### 5. How to Add New Menu Items
Just edit `composables/useMenuItems.ts` and add your new menu item:

```typescript
{ name: "My New Page", path: "/my-new-page", icon: "NewIcon" }
```

That's it! The new menu item will appear in all pages automatically.

### 6. Submenu Support
You can also add submenus:

```typescript
{ 
  name: "Reports", 
  icon: "BarChart",
  subMenu: [
    { name: "Sales Report", path: "/reports/sales", icon: "TrendingUp" },
    { name: "User Report", path: "/reports/users", icon: "Users" }
  ]
}
```

## Migration for Remaining Pages
For any remaining pages that still have individual menu items defined, simply:

1. Import the composable: `import { useMenuItems } from '@/composables/useMenuItems';`
2. Replace the menu items array with: `const { menuItems } = useMenuItems();`
3. Remove the old menu items definition

That's it! No more menu management headaches! 🎉
