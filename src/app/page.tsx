"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { Icon } from "@iconify/react";
import CardEmpty from "./components/CardEmpty";

import { useQuery } from "@tanstack/react-query";

// api
import { getUsersByQueries } from "../../api/routes/users";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchString, setSearchString] = useState("");
  const { isLoading, data } = useQuery({
    queryKey: ["users", searchString],
    queryFn: () => searchString && getUsersByQueries(searchString),
  });

  return (
    <section className="flex flex-col justify-center gap-5">
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
      >
        Search
      </Button>
      <CardEmpty />
    </section>
  );
}
