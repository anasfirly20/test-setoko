// Assets
import githubLogo from "../../../public/image/GitHub_Logo_White.png";

// Miscellaneous
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-6 flex justify-between items-center">
      <Link href="/">
        <Image
          src={githubLogo}
          width={100}
          height={100}
          alt="Github Logo White"
        />
      </Link>
    </nav>
  );
}
