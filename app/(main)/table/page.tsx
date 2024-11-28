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

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const list = useAsyncList<SWCharacter>({
    async load({signal}) {
      const res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      const json = await res.json();
      setIsLoading(false);
      return {
        items: json.results,
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

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="height" allowsSorting>
          Height
        </TableColumn>
        <TableColumn key="mass" allowsSorting>
          Mass
        </TableColumn>
        <TableColumn key="birth_year" allowsSorting>
          Birth year
        </TableColumn>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
