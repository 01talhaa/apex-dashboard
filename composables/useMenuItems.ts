// Centralized menu configuration
export const useMenuItems = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "Home" },
    { name: "Customers", path: "/customers", icon: "Users" },
    { name: "Lucky Spin", path: "/luckyspin", icon: "Award" },
    { name: "Leaderboard", path: "/leaderboard", icon: "Trophy" },
    { name: "Withdraw", path: "/withdraw", icon: "CreditCard" },
    { 
      name: "Transactions", 
      icon: "DollarSign",
      subMenu: [
        { name: "Transaction ID", path: "/transaction-id", icon: "CreditCard" },
        { name: "User Transactions", path: "/user-transactions", icon: "FileText" }
      ]
    },
    // { name: "Products", path: "/products", icon: "Package" },
    // { name: "Categories", path: "/categories", icon: "Grid" },
    // { name: "Brands", path: "/brands", icon: "Tag" },
    // { name: "Orders", path: "/orders", icon: "ShoppingCart" },
    // { name: "Reports", path: "/reports", icon: "BarChart" },
    // { name: "POS System", path: "/pos-system", icon: "Monitor" },
    // { name: "Invoicing", path: "/invoicing", icon: "FileText" },
    // { name: "Billing", path: "/billing", icon: "Receipt" },
    // { name: "Coupons", path: "/cupon", icon: "Percent" },
    // { name: "Files", path: "/files", icon: "Folder" },
    // { name: "Earnings", path: "/earnings", icon: "TrendingUp" },
    { name: "Ads", path: "/ads", icon: "Megaphone" },
    // New Settings Menu Items
    { name: "Commission Settings", path: "/commissionSettings", icon: "CreditCard" },
    { name: "Ranking Settings", path: "/rankingSettings", icon: "Award" },
    // Easy to add new menu items here!
    // { name: "Settings", path: "/settings", icon: "Settings" },
    // { name: "Analytics", path: "/analytics", icon: "BarChart3" },
  ];

  return {
    menuItems
  };
};
