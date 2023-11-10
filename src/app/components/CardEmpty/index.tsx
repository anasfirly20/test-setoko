import Image from "next/image";
import githubMark from "../../../../public/github-mark.svg";

export default function CardEmpty() {
  return (
    <section className="rounded-md flex flex-col justify-center items-center p-10 gap-10 py-longer">
      <Image
        src={githubMark}
        width={300}
        height={300}
        alt="Picture of Github Mark"
        priority={true}
      />
      <p className="text-xl">Search Github User</p>
    </section>
  );
}
