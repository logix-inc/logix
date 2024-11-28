"use client";

import {
  Navbar as LogixNavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@logi-x/navbar";
import {Button} from "@logi-x/button";
import {Kbd} from "@logi-x/kbd";
import {Link} from "@logi-x/link";
import {Input} from "@logi-x/input";
import {link as linkStyles} from "@logi-x/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {signOut, useSession} from "next-auth/react";

import {siteConfig} from "@/config/site";
import {ThemeSwitch} from "@/components/theme-switch";
import {SearchIcon} from "@/components/icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@logi-x/dropdown";
import {User} from "@logi-x/user";
import {Icons} from "@/global";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

export const Navbar = () => {
  const {data: session} = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <LogixNavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      ref={ref}
      className={clsx({
        "z-[100001]": isMenuOpen,
      })}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Icons.logoFull />
            {/* <p className="font-bold text-inherit">LOGIX</p> */}
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key={item.href}>
                <NextLink
                  data-active={`${isActive}`}
                  className={clsx(
                    linkStyles({color: "foreground"}),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex gap-6">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          {session ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: session.user?.image as string,
                    size: "sm",
                  }}
                  className="transition-transform"
                  description={session.user?.email}
                  name={session.user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  href="/profile"
                  key="profile"
                  textValue="Signed in as"
                  className="h-14 gap-2"
                >
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{session.user?.name}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/auth?tab=login"
              variant="flat"
            >
              Login
            </Button>
          )}
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
        <ThemeSwitch />
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}

        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  as={NextLink}
                  href={item.href}
                  color={isActive ? "primary" : "foreground"}
                  onClick={() => setIsMenuOpen(false)}
                  size="md"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            );
          })}
          {session ? (
            <Dropdown
              placement="bottom-start"
              classNames={{
                trigger: "flex justify-start mt-6",
              }}
            >
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: session.user?.image as string,
                    size: "sm",
                  }}
                  className="transition-transform"
                  description={session.user?.email}
                  name={session.user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  href="/profile"
                  key="profile"
                  className="h-14 gap-2"
                  textValue="Signed in as"
                >
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{session.user?.name}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/auth?tab=login"
              variant="flat"
            >
              Login
            </Button>
          )}
        </div>
      </NavbarMenu>
    </LogixNavbar>
  );
};
