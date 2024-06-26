"use client"
import Image from "next/image"
import { ModeToggle } from "./Modetoggle"


export default function Nav() {
  return(
    <header >
      <nav>
        <ul className="flex items-center justify-between">
          <li>
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://twitter.com/rahatcodes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/raza.png"
              alt="PEX Logo"
              width={100}
              height={24}
              priority
            />
          </a>
          </li>
          <li><ModeToggle /></li>
        </ul>
      </nav>
    </header>
  )
}