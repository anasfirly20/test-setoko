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

  console.log("DATA >>", data);

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
      <section className="min-h-screen flex justify-center items-center">
        <Button onClick={() => window.location.reload()}>
          Click here to retry
        </Button>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl text-center mb-10">
        {params?.username}&apos;s repository
      </h1>
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
                      {item?.pushed_at ? dateConverter(item?.pushed_at) : null}
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
      )}
    </section>
  );
}
