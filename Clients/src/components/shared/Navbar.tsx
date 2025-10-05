"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { Drawer } from "vaul";
import { useMediaQuery } from "@/hooks/use-media-query";
import Button from "@/components/ui/button";

export default function HomeHeader() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "/", title: "Home" },
    { id: "/about", title: "About" },
    { id: "/projects", title: "Projects" },
    { id: "/blogs", title: "Blogs" },
    { id: "/contact", title: '"Say Hello"' },
  ];

  return (
    <header className="w-full top-0 z-20 absolute lg:flex lg:items-center lg:px-8 lg:py-0 text-primary-foreground">
      <div className="flex md:max-w-screen-lg mx-auto w-full items-center relative justify-between h-16 px-4 p-2 bg-white border dark:border-neutral-800 border-neutral-200 rounded-b-xl dark:bg-zinc-950">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <ul className="list-none flex justify-center items-center gap-8">
            {navLinks.map((nav) => {
              return (
                <li
                  key={nav.id}
                  className="relative group text-[18px] font-medium cursor-pointer"
                >
                  <Link
                    href={nav.id}
                    className={` ${
                      pathname === nav.id
                        ? "text-[#334CEC]"
                        : "text-neutral-600 dark:text-neutral-300"
                    } hover:text-[#334CEC] transition-colors`}
                  >
                    {nav.title}
                  </Link>
                  <span
                    className={`${
                      pathname === nav.id
                        ? "absolute left-0 bottom-[-6px] h-[3px] w-full bg-[#334CEC] rounded-full"
                        : "absolute left-0 bottom-[-6px] h-[3px] w-0 bg-[#334CEC] rounded-full transition-all duration-300 group-hover:w-full"
                    }`}
                  ></span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Right actions */}
        <nav className="flex items-center gap-2">
          <Button
            title="Resume"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Resume.pdf";
              link.download = "Abu_Saiyed_Joy_Resume.pdf";
              link.click();
            }}
          />
          {/* Mobile Menu Button */}
          {isMobile && (
            <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
              <Drawer.Trigger className="px-3 text-white h-10 grid place-content-center bg-[#334CEC] w-fit rounded-lg">
                <AlignJustify />
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Drawer.Content className="left-2 top-2 bottom-2 fixed z-50 outline-none w-72 flex">
                  <div className="dark:bg-black bg-white border border-neutral-200 dark:border-neutral-800 p-4 h-full w-full flex flex-col rounded-[16px]">
                    <div className="w-full flex justify-between mb-4">
                      <Link href="/" className="flex items-center">
                        <Image
                          src="/logo.png"
                          alt="logo"
                          width={32}
                          height={32}
                        />
                      </Link>
                      <button
                        className="rounded-md bg-neutral-900 px-3 py-2 text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <X />
                      </button>
                    </div>

                    <ul className="list-none flex flex-col gap-4">
                      {navLinks.map((nav) => {
                        return (
                          <li
                            key={nav.id}
                            className="relative group text-[18px] font-medium cursor-pointer"
                          >
                            <Link
                              href={nav.id}
                              className={`${
                                pathname === nav.id
                                  ? "text-[#334CEC]"
                                  : "text-neutral-600 dark:text-neutral-300"
                              } hover:text-[#334CEC] transition-colors`}
                              onClick={() => setIsOpen(false)}
                            >
                              {nav.title}
                            </Link>
                            <span
                              className={`${
                                pathname === nav.id
                                  ? "absolute left-0 bottom-[-6px] h-[3px] w-[50%] bg-[#334CEC] rounded-full"
                                  : "absolute left-0 bottom-[-6px] h-[3px] w-0 bg-[#334CEC] rounded-full transition-all duration-300 group-hover:w-full"
                              }`}
                            ></span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          )}
        </nav>
      </div>
    </header>
  );
}
