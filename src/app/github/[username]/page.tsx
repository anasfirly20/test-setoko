import React from "react";

export default function PageDetail({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div>
      <h1>BY ID {params?.username}</h1>
    </div>
  );
}
