"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { Icon } from "@iconify/react";
import CardEmpty from "./components/CardEmpty";

import { useQuery } from "@tanstack/react-query";

// api
import { getAllPosts } from "../../api/routes/post";

export default function Home() {
  // GET users
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllPosts,
  });
  console.log("RESULT >>", data);

  return (
    <section className="flex flex-col justify-center gap-5">
      <Input placeholder="Search User..." isClearable />
      <Button
        size="lg"
        className="w-[15%] text-white bg-custom-green text-base"
        endContent={
          <Icon
            icon="material-symbols:search"
            color="white"
            className="text-2xl"
          />
        }
      >
        Search
      </Button>
      <CardEmpty />
    </section>
  );
}
