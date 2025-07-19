import {
  Archive,
  LayoutDashboard,
  ReceiptText,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: "Inventory",
    href: "/Inventory",
    icon: <ShoppingCart className="size-4" />,
  },
  {
    label: "Records",
    href: "/record",
    icon: <Archive className="size-4" />,
  },
  {
    label: "Receipt",
    href: "/receipt",
    icon: <ReceiptText className="size-4" />,
  },
  {
    label: "Products",
    href: "/product",
    icon: <ShoppingBasket className="size-4" />,
  },
];
