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

// Miscellaneous
import { table_columns } from "@/constants/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dateConverter } from "@/helpers/utils/utils";

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

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(data?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data]);

  return (
    <div>
      <h1>BY ID {params?.username}</h1>
      {isLoading ? (
        <section className="min-h-screen flex justify-center items-center">
          <Spinner color="success" label="Loading..." />
        </section>
      ) : (
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
              <TableColumn key={index}>{column}</TableColumn>
            ))}
          </TableHeader>
          {items?.length > 0 ? (
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {items?.map((item: any, index: number) => (
                <TableRow key={item?.html_url}>
                  <TableCell>
                    <a
                      className="hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={item?.html_url}
                    >
                      {item?.full_name}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      className="underline"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={item?.html_url}
                    >
                      LINK
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
          )}
        </Table>
      )}
    </div>
  );
}
