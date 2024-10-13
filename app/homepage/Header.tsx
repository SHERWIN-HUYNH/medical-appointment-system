"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import DropDown from "./DropDown";

function Header() {
  const { data: session } = useSession();
  const Menu = [
    {
      id: 1,
      name: "Trang chủ",
      path: "/",
    },
    {
      id: 2,
      name: "Giới thiệu",
      path: "/",
    },
    {
      id: 3,
      name: "Dịch vụ",
      path: "/explore",
    },
    {
      id: 4,
      name: "Chuyên khoa",
      path: "/",
    },
    {
      id: 5,
      name: "Đội ngũ bác sĩ",
      path: "/",
    },
  ];
  return (
    <header className="bg-blue-100 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="flex gap-3 dark:text-teal-300" href="#">
          <span className="sr-only">Trang chủ</span>
          <Image
            src="/assets/icons/logo-icon.svg"
            alt="logo"
            width={40}
            height={80}
          ></Image>
          <h2 className="text-2xl font-bold text-primary">Care Pulse</h2>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {Menu.map((item, i) => (
                <Link key={i} href={item.path}>
                  <li className="hover:bg-[#56c2e6] text-primary hover:text-white font-bold p-2 rounded-md cursor-pointer hover:scale-105 transition-all ease-in-out">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!session ? (
                // Hiển thị nút Login và Register nếu người dùng chưa đăng nhập
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#56c2e6] dark:hover:bg-[#56c2e6]"
                    href="/login"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    className="hidden rounded-md px-5 py-2.5 text-sm font-medium bg-white hover:bg-slate-100 text-primary transition hover:text-[#56c2e6] sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="/register"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                // Hiển thị tên người dùng nếu đã đăng nhập
                <div className="flex items-center space-x-4">
                  <DropDown
                    username={session.user?.name}
                    className="flex items-center space-x-2 rounded-3xl border px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white cursor-pointer transition-all ease-in-out duration-100 overflow-y-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
