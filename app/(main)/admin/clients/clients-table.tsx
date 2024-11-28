"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@logi-x/table";
import {useAsyncList} from "@react-stately/data";
import {Spinner} from "@logi-x/spinner";
import Link from "next/link";

type SWCharacter = {
  _id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: string;
};

export default function ClientsTable({clients, loading, setLoading}) {
  type Client = (typeof clients)[0];

  const list = useAsyncList<SWCharacter>({
    async load() {
      setLoading(false);
      return {
        items: clients,
      };
    },
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column!];
          const second = b[sortDescriptor.column!];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  const renderCell = React.useCallback((client: Client, columnKey: React.Key) => {
    const cellValue = client[columnKey as keyof Client];

    switch (columnKey) {
      case "company_name":
        return <Link href={"/admin/clients/" + client._id}>{client.company_name}</Link>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Clients table" sortDescriptor={list.sortDescriptor} onSortChange={list.sort}>
      <TableHeader>
        <TableColumn key="company_name" allowsSorting>
          Company Name
        </TableColumn>
        <TableColumn key="contact_name" allowsSorting>
          Contact Name
        </TableColumn>
        <TableColumn key="email" allowsSorting>
          Email
        </TableColumn>
        <TableColumn key="phone" allowsSorting>
          Phone
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          Status
        </TableColumn>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={loading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
