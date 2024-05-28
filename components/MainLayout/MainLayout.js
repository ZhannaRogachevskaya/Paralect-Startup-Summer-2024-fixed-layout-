"use client";
import "./MainLayout.css";
import { AppShell, Button } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "../Menu/Menu";

const MainLayout = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

  return (
    <>
      <AppShell
        navbar={{
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Navbar withBorder={false}>
          <Link href="/" className="logo-link">
            <Image src="/logo.png" width={179} height={36} alt="logo" />
          </Link>
          <Menu />
          <Button
            variant="filled"
            color="#e5d5fa"
            onClick={toggleDesktop}
            visibleFrom="sm"
            leftSection={<GiHamburgerMenu />}
            size="lg"
            className="btn_toggle_menu"
          ></Button>
          <Button
            variant="filled"
            color="#e5d5fa"
            onClick={toggleMobile}
            hiddenFrom="sm"
            leftSection={<GiHamburgerMenu />}
            size="lg"
            className="btn_toggle_menu"
          ></Button>
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};
export { MainLayout };
