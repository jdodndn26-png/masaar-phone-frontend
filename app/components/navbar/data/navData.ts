export interface NavChild {
  label: string;
  href: string;
}

export interface NavGroup {
  groupLabel: string;
  items: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  groups?: NavGroup[];
}

export const navItems: NavItem[] = [
  {
    label: "الهواتف الذكية",
    href: "/shop",
    groups: [
      {
        groupLabel: "آيفون",
        items: [
          { label: "آيفون 17 برو ماكس", href: "/shop/17-pro-max" },
          { label: "آيفون 17 برو", href: "/shop/17-pro" },
          { label: "آيفون 17 إير", href: "/shop/17-air" },
          { label: "آيفون 17", href: "/shop/17" },
          { label: "آيفون 16 برو ماكس", href: "/shop/16-pro-max" },
          { label: "آيفون 16 برو", href: "/shop/16-pro" },
          { label: "آيفون 16 بلس", href: "/shop/16-plus" },
          { label: "آيفون 16", href: "/shop/16" },
          { label: "آيفون 15 برو ماكس", href: "/shop/15-pro-max" },
          { label: "آيفون 15 برو", href: "/shop/15-pro" },
        ],
      },
      {
        groupLabel: "سامسونج",
        items: [
          { label: "سامسونج جالاكسي اس 26 الترا", href: "/shop/galaxy-s26-ultra" },
          { label: "سامسونج جالاكسي اس 26 بلس", href: "/shop/galaxy-s26-plus" },
          { label: "سامسونج جالاكسي اس 26", href: "/shop/galaxy-s26" },
          { label: "سامسونج جالاكسي اس 25 الترا", href: "/shop/galaxy-s25-ultra" },
          { label: "سامسونج جالاكسي اس 25 بلس", href: "/shop/galaxy-s25-plus" },
          { label: "سامسونج جالاكسي اس 25", href: "/shop/galaxy-s25" },
        ],
      },
    ],
  },
  {
    label: "لابتوبات",
    href: "/laptops",
    children: [
      { label: "ماك بوك إير M4", href: "/shop/macbook-air" },
      { label: "ماك بوك برو", href: "/shop/macbook-pro" },
    ],
  },
];
