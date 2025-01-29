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

export const treasuryItems = [
  {
    text: "Liquid token",
    value: 70,
    color: "bg-black",
  },
  {
    text: "Investments",
    value: 20,
    color: "bg-zentry-yellow-300",
  },
  {
    text: "NFT assets",
    value: 10,
    color: "bg-zentry-blue-75",
  },
];

export const partnersDescription = [
  {
    boldText: "Our partners",
    text: "include top-tier VCs, funds, and companies, providing expertise, network and resources to fuel our project's success.",
  },
  {
    boldText: "Our gaming partners",
    text: "span projects, communities, protocols, & infrastructure, accelerating expansive growth of the new gaming era.",
  },
  {
    boldText: "Our Web3 partners",
    text: "support tech & community, driving cutting-edge innovation and a vibrant ecosystem users.",
  },
  {
    boldText: "Our brand partners",
    text: "cover tech, gaming, entertainment, & lifestyle sectors, enhancing our reach and player experience.",
  },
];

export const backers = [
  {
    name: "Coinbase Ventures",
    type: "backer",
    image: "img/backers-coinbase.webp",
    description: partnersDescription[0],
  },
  {
    name: "Binance Labs",
    type: "backer",
    image: "img/backers-binance.webp",
    description: partnersDescription[0],
  },
  {
    name: "Definance Capital",
    type: "backer",
    image: "img/backers-definance.webp",
    description: partnersDescription[0],
  },
  {
    name: "Pantera Capital",
    type: "backer",
    image: "img/backers-pantera.webp",
    description: partnersDescription[0],
  },
  {
    name: "Animoca Brands",
    type: "backer",
    image: "img/backers-animoca.webp",
    description: partnersDescription[0],
  },
  {
    name: "Play Ventures",
    type: "backer",
    image: "img/backers-play.webp",
    description: partnersDescription[0],
  },
  {
    name: "Skyvision Capital",
    type: "backer",
    image: "img/backers-skyvision.webp",
    description: partnersDescription[0],
  },
  {
    name: "Vessel Capital",
    type: "backer",
    image: "img/backers-vessel.webp",
    description: partnersDescription[0],
  },
  {
    name: "Arche Fund",
    type: "backer",
    image: "img/backers-arche.webp",
    description: partnersDescription[0],
  },
  {
    name: "Marblex",
    type: "gaming",
    image: "img/backers-marblex.webp",
    description: partnersDescription[1],
  },
  {
    name: "Fnatic",
    type: "gaming",
    image: "img/backers-fnatic.webp",
    description: partnersDescription[1],
  },
  {
    name: "Xset",
    type: "gaming",
    image: "img/backers-xset.webp",
    description: partnersDescription[1],
  },
  {
    name: "Jambo",
    type: "web3",
    image: "img/backers-jambo.webp",
    description: partnersDescription[2],
  },
  {
    name: "AWS",
    type: "brands",
    image: "img/backers-aws.webp",
    description: partnersDescription[3],
  },
];
