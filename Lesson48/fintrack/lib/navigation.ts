import {
  CreditCard,
  LayoutGrid,
  Ticket,
  User,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/rewards", label: "Rewards", icon: Ticket },
  { href: "/profile", label: "Profile", icon: User },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
