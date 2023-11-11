"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserRepo } from "../../../api/routes/github";
import { useEffect } from "react";

export default function PageDetail({
  params,
}: {
  params: { username: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["repo", params?.username],
    queryFn: () => getUserRepo(params?.username),
  });

  useEffect(() => {
    console.log("data >", data);
  }, [data]);

  return (
    <div>
      <h1>BY ID {params?.username}</h1>
    </div>
  );
}
