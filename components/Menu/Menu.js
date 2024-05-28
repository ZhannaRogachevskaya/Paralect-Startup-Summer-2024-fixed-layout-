"use client";

import "./Menu.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Menu = () => {
  const navLinks = [
    { name: "Movies", href: "/" },
    { name: "Rated movies", href: "/rated" },
  ];
  const pathname = usePathname();

  return (
    <div className="menu">
      {navLinks.map((link) => {
        return (
          <div
            className={
              pathname.split(1).includes(link.href)
                ? "menu__item active"
                : "menu__item"
            }
            key={link.name}
          >
            <Link href={link.href}>{link.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
export { Menu };
