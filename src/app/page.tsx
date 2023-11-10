import Link from "next/link";
import gitLogo from "../../public/image/GitHub_Logo_White.png";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Link href="/github">
        <Image
          src={gitLogo}
          width={500}
          height={500}
          alt="Github Logo"
          priority={true}
        />
      </Link>
    </section>
  );
}
