"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";

// Components
import CardEmpty from "@/components/CardEmpty";
import ErrorComponent from "@/components/ErrorComponent";

// Assets
import gitMark from "../../public/image/github-mark-white.png";

// api
import { getUsersByQueries } from "../../api/routes/github";

// Miscellaneous
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [searchString, setSearchString] = useState<string>("");
  const [data, setData] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getUsers = async (string: string) => {
    try {
      setIsLoading(true);
      const res = await getUsersByQueries(string);
      const filteredData = res?.items?.slice(0, 5);
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleSearch = () => {
    if (searchString) {
      getUsers(searchString);
    }
  };

  return (
    <section className="flex flex-col justify-center gap-5 max-sm:pb-normal">
      <Input
        placeholder="Search User..."
        isClearable
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button
        size="lg"
        className="w-full lg:w-[15%] text-white bg-custom-green text-base"
        endContent={
          <Icon
            icon="material-symbols:search"
            color="white"
            className="text-2xl"
          />
        }
        onClick={handleSearch}
        isLoading={isLoading}
        isDisabled={searchString ? false : true}
      >
        Search
      </Button>
      {isError ? (
        <ErrorComponent />
      ) : data?.length > 0 ? (
        <>
          <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {data?.map((item) => (
              <>
                <section
                  key={item?.id}
                  className="border-2 p-2 relative bg-white rounded-md lg:hover:scale-105 transition-transform duration-300"
                >
                  <a
                    href={item?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Tooltip placement="top-start" content="Github profile">
                      <Image
                        alt="git Logo"
                        src={gitMark}
                        width={35}
                        height={35}
                        className="absolute z-10 top-5 right-5 hover:scale-110 transition-transform"
                      />
                    </Tooltip>
                  </a>
                  <figure className="w-full">
                    <Skeleton isLoaded={!isLoading}>
                      <Image
                        src={item?.avatar_url}
                        width={300}
                        height={300}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        alt={`Picture of ${item?.login}`}
                        placeholder="blur"
                        blurDataURL="https://placehold.co/600x400/000000/000"
                      />
                    </Skeleton>
                  </figure>
                  <section className="text-black mt-5 space-y-3">
                    <Skeleton isLoaded={!isLoading}>
                      <p className="text-center font-semibold text-xl">
                        {item?.login}
                      </p>
                    </Skeleton>
                    <section className="flex justify-center max-sm:gap-10 sm:flex-col items-center">
                      <Skeleton isLoaded={!isLoading}>
                        <p>Git score: {item?.score}</p>
                      </Skeleton>
                      <Skeleton isLoaded={!isLoading}>
                        <Link
                          href={`/${item?.login}`}
                          className="text-gray-600 hover:underline"
                        >
                          Repositories
                        </Link>
                      </Skeleton>
                    </section>
                  </section>
                </section>
              </>
            ))}
          </section>
        </>
      ) : (
        <CardEmpty />
      )}
    </section>
  );
}
