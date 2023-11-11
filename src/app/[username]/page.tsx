"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getUserRepo } from "../../../api/routes/github";

// Components
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";

// Miscellaneous
import { useMemo, useState } from "react";
import { table_columns } from "@/constants/constants";

// Utils
import { dateConverter, getStringAfterSlash } from "@/helpers/utils/utils";
import Image from "next/image";

// Assets
import gitMark from "../../../public/github-mark.svg";

export default function PageDetail({
  params,
}: {
  params: { username: string };
}) {
  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repo", params?.username],
    queryFn: () => getUserRepo(params?.username, page),
  });

  // Pagination
  const pages = Math.ceil(data?.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data]);

  // Handle Error
  if (isError) {
    return (
      <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
        <h1>An error has occurred</h1>
        <Button onClick={() => window.location.reload()}>
          Click here to retry
        </Button>
      </section>
    );
  }

  return (
    <section>
      {isLoading ? (
        <section className="min-h-screen flex justify-center items-center">
          <Spinner color="success" label="Loading..." />
        </section>
      ) : (
        <>
          <section className="flex flex-col justify-center items-center py-5 gap-5">
            <a
              href={data?.[0]?.owner?.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative rounded-full overflow-hidden">
                <Image
                  src={data?.[0]?.owner?.avatar_url}
                  alt="github user's image"
                  width={200}
                  height={200}
                />
                <div className="absolute bg-slate-500/60 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={gitMark}
                    alt="github user's image"
                    width={100}
                    height={100}
                  />
                  <p>Github Profile</p>
                </div>
              </div>
            </a>
            <h1 className="text-2xl">{params?.username}&apos;s repository</h1>
          </section>
          <Table
            aria-label="Example static collection table"
            bottomContent={
              items?.length ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    showControls
                    showShadow
                    loop
                    color="success"
                    page={page}
                    total={pages}
                    onChange={(page) => {
                      setPage(page);
                    }}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              {table_columns?.map((column, index: number) => (
                <TableColumn key={index} width={30}>
                  {column}
                </TableColumn>
              ))}
            </TableHeader>
            {items?.length > 0 ? (
              <TableBody
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
              >
                {items?.map((item: TRepositories, index: number) => {
                  const items_numbering = (page - 1) * rowsPerPage + index + 1;
                  return (
                    <TableRow key={item?.html_url}>
                      <TableCell>{items_numbering}</TableCell>
                      <TableCell>
                        <a
                          className="hover:underline"
                          rel="noopener noreferrer"
                          target="_blank"
                          href={item?.html_url}
                        >
                          {item?.full_name
                            ? getStringAfterSlash(item?.full_name)
                            : null}
                        </a>
                      </TableCell>
                      <TableCell>
                        {item?.created_at
                          ? dateConverter(item?.created_at)
                          : null}
                      </TableCell>
                      <TableCell>
                        {item?.updated_at
                          ? dateConverter(item?.updated_at)
                          : null}
                      </TableCell>
                      <TableCell>
                        {item?.pushed_at
                          ? dateConverter(item?.pushed_at)
                          : null}
                      </TableCell>
                      <TableCell>{item?.visibility}</TableCell>
                      <TableCell>
                        {item?.description ? item?.description : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
            )}
          </Table>
        </>
      )}
    </section>
  );
}
