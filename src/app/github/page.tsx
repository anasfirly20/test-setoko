"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

import { Icon } from "@iconify/react";
import CardEmpty from "../components/CardEmpty";

import gitMark from "../../../public/image/github-mark-white.png";

// api
import { getUsersByQueries } from "../../../api/routes/github";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async (string: string) => {
    try {
      setIsLoading(true);
      const res = await getUsersByQueries(string);
      const filteredData = res?.items?.slice(0, 5);
      console.log("filteredData >", filteredData);
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center gap-5 pb-shorter">
      <Input
        placeholder="Search User..."
        isClearable
        onChange={(e) => setSearchString(e.target.value)}
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
        onClick={() => {
          if (searchString) {
            getUsers(searchString);
          }
        }}
        isLoading={isLoading}
      >
        Search
      </Button>
      {data?.length > 0 ? (
        <>
          {isLoading ? (
            "LOADING..."
          ) : (
            <>
              <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {data?.map((e: any) => (
                  <div
                    key={e?.id}
                    className="border-2 p-2 relative bg-white rounded-md"
                  >
                    <a
                      href={e?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip placement="top-start" content="Github profile">
                        <Image
                          alt="git Logo"
                          src={gitMark}
                          width={35}
                          height={35}
                          className="absolute top-5 right-5 hover:scale-110 transition-transform"
                        />
                      </Tooltip>
                    </a>
                    <figure className="w-full">
                      <Image
                        src={
                          "https://avatars.githubusercontent.com/u/65725801?v=4"
                        }
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }} // optional
                        alt={`Picture of ${e?.login}`}
                      />
                    </figure>
                    <div className="text-black mt-5">
                      <p>Jack Sparrsow</p>
                      <Link
                        href={`/github/${e?.login}`}
                        className="text-crayola"
                      >
                        Repositories
                      </Link>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </>
      ) : (
        <CardEmpty />
      )}
    </section>
  );
}
