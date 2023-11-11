import { Button } from "@nextui-org/button";
import React from "react";

type TProps = {
  onClick: () => void;
};

export default function ErrorComponent({ onClick }: TProps) {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Button onClick={onClick}>Click here to retry</Button>
    </section>
  );
}
