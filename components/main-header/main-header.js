"use client";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import { usePathname } from "next/navigation";
export default function MainHeader() {
  const path = usePathname();
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href={"/"}>
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link
                href={"/meals"}
                className={
                  path.startsWith("/meals") ? styles.active : undefined
                }
              >
                Brows Meals
              </Link>
            </li>
            <li>
              <Link
                href={"/community"}
                className={
                  path.startsWith("/community") ? styles.active : undefined
                }
              >
                Foodies Community
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
