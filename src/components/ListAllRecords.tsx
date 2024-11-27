"use client";

import { Kbd, Stack, Table } from "@chakra-ui/react";
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const ListAllRecords = () => {
  const [selection, setSelection] = useState<string[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map((item) => (
    <Table.Row
      key={item.name}
      data-selected={selection.includes(item.name) ? "" : undefined}
      cursor={"pointer"}
      _hover={{ fontWeight: "bold" }}
    >
      <Table.Cell>
        <Checkbox
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name)
            );
          }}
          cursor={"pointer"}
        />
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell>${item.price}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Stack
      w={{ base: "100%", md: "50%" }}
      mx={{ base: "0", md: "auto" }}
      p={{ base: "4", md: "0" }}
    >
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox
                top="1"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? items.map((item) => item.name) : []
                  );
                }}
                cursor={"pointer"}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </Stack>
  );
};

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
  { id: 6, name: "TV", category: "Electronics", price: 799.99 },
  { id: 7, name: "Monitor", category: "Electronics", price: 299.99 },
  { id: 8, name: "Tablet", category: "Electronics", price: 499.99 },
  { id: 9, name: "Keyboard", category: "Accessories", price: 49.99 },
  { id: 10, name: "Mouse", category: "Accessories", price: 29.99 },
  { id: 11, name: "Printer", category: "Electronics", price: 199.99 },
  { id: 12, name: "Scanner", category: "Electronics", price: 99.99 },
  { id: 13, name: "Projector", category: "Electronics", price: 399.99 },
  { id: 14, name: "Microwave", category: "Home Appliances", price: 99.99 },
  { id: 15, name: "Refrigerator", category: "Home Appliances", price: 499.99 },
  {
    id: 16,
    name: "Washing Machine",
    category: "Home Appliances",
    price: 399.99,
  },
  { id: 17, name: "Dryer", category: "Home Appliances", price: 299.99 },
  { id: 18, name: "Dishwasher", category: "Home Appliances", price: 399.99 },
  { id: 19, name: "Oven", category: "Home Appliances", price: 499.99 },
  { id: 20, name: "Blender", category: "Home Appliances", price: 49.99 },
  { id: 21, name: "Toaster", category: "Home Appliances", price: 29.99 },
];

export default ListAllRecords;
