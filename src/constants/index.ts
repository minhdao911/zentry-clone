import { FunctionComponent, SVGAttributes } from "react";
import { IconType } from "react-icons";
import { MdArrowOutward } from "react-icons/md";
import ArrowUpRight from "../assets/arrow-up-right.svg?react";

export const navItems = [
  {
    text: "Nexus",
    icon: ArrowUpRight,
    mobile: true,
  },
  {
    text: "Vault",
    icon: ArrowUpRight,
    mobile: false,
  },
  {
    text: "Prologue",
    mobile: false,
  },
  {
    text: "About",
    mobile: false,
  },
  {
    text: "Contact",
    mobile: false,
  },
];

type FooterLink = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: IconType | FunctionComponent<SVGAttributes<SVGElement>>;
};

export const footerLinks: { [key: string]: FooterLink[] } = {
  explore: [
    {
      title: "Home",
      href: "#",
    },
    {
      title: "Prologue",
      href: "#",
    },
    {
      title: "About",
      href: "#",
    },
    {
      title: "Contact",
      href: "#",
    },
  ],
  products: [
    {
      title: "Radiant",
      disabled: true,
      href: "#",
    },
    {
      title: "Nexus",
      icon: MdArrowOutward,
      href: "#",
    },
    {
      title: "Zigma",
      disabled: true,
      href: "#",
    },
    {
      title: "Azul",
      disabled: true,
      href: "#",
    },
  ],
  "follow us": [
    {
      title: "Discord",
      href: "#",
    },
    {
      title: "X",
      href: "#",
    },
    {
      title: "Youtube",
      href: "#",
    },
    {
      title: "Medium",
      href: "#",
    },
  ],
  resources: [
    {
      title: "Media Kit",
      href: "#",
    },
  ],
};

export const vaultItems = [
  {
    title: "Shaping Zentry Collectively",
    description:
      "Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations",
  },
  {
    title: "Unlocking Economic Opportunity",
    description:
      "ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem.",
  },
  {
    title: "Sharing Value Accrued",
    description:
      "ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities.",
  },
];
