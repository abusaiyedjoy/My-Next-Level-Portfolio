"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-around  gap-5 py-5 text-white">
      <div className="border border-gray-800 w-[90%] mx-auto"></div>
      {/* Social Links */}
      <nav className="text-lg">
        <ul className="flex flex-wrap items-center justify-center gap-5">
          <li className="cursor-pointer">
            <a
              href="https://web.facebook.com/abu.saiyed.joy.2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="size-6 hover:text-primary transition-colors" />
            </a>
          </li>
          <li className="cursor-pointer">
            <a
              href="https://www.instagram.com/abusaiyedjoy1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="size-6 hover:text-primary transition-colors" />
            </a>
          </li>
          <li className="cursor-pointer">
            <a
              href="https://www.linkedin.com/in/abusaiyedjoy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="size-6 hover:text-primary transition-colors" />
            </a>
          </li>
        </ul>
      </nav>

      {/* Copyright */}
      <aside className="text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Abu Saiyed Joy. All Rights Reserved. <Link href="/login">🔐</Link></p>
      </aside>
    </footer>
  );
}
