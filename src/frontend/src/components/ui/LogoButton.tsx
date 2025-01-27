import Image from "next/image";
import Link from "next/link";

export function LogoButton() {
  return (
    <button
      className="flex absolute top-10 left-10 z-20 
    hover:animate-pulse hover:scale-110"
    >
      <Link href="/">
        <Image
          src="/images/TavernTales-Logo-button.png"
          alt="Tavern Tales logo"
          width={120}
          height={120}
        />
      </Link>
    </button>
  );
}
