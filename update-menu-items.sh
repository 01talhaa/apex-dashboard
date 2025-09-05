#!/bin/bash

# Script to update all Vue pages to use centralized menu items

# List of files to update (excluding already updated ones)
FILES=(
    "pages/ads.vue"
    "pages/transaction-id.vue"
    "pages/reports.vue"
    "pages/products.vue"
    "pages/orders.vue"
    "pages/spinset.vue"
    "pages/leaderboard.vue"
    "pages/luckyspin.vue"
    "pages/manageShop.vue"
    "pages/earnings.vue"
    "pages/invoicing.vue"
    "pages/billing.vue"
    "pages/files.vue"
    "pages/pos-system.vue"
    "pages/stats.vue"
    "pages/sales_current_month.vue"
    "pages/orders-stats.vue"
    "pages/addproduct.vue"
    "pages/brands.vue"
    "pages/categories.vue"
    "pages/cupon.vue"
)

echo "Starting to update Vue files to use centralized menu items..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Add the import for useMenuItems if not already present
        if ! grep -q "useMenuItems" "$file"; then
            # Find the import section and add our import
            sed -i '/import.*from.*vue/a import { useMenuItems } from '"'"'@/composables/useMenuItems'"'"';' "$file"
        fi
        
        # Replace the menu items definition with the composable usage
        if grep -q "const menuItems = \[" "$file"; then
            # Find the start and end of the menuItems array and replace it
            sed -i '/^const menuItems = \[/,/^\];$/c\
// Get centralized menu items\
const { menuItems } = useMenuItems();' "$file"
        fi
        
        echo "Updated $file"
    else
        echo "File $file not found, skipping..."
    fi
done

echo "Completed updating Vue files!"
