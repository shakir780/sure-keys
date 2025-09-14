"use client";

import { Table } from "@components/Table/page";
import { ColumnDef } from "@tanstack/react-table";

type Tenant = {
  name: string;
  property: string;
  amount: string;
  dueDate: string;
  status: "Due Soon" | "Paid" | "Overdue";
};

const data: Tenant[] = [
  {
    name: "John Doe",
    property: "Lekki Palm Apartments",
    amount: "₦250,000",
    dueDate: "June 25",
    status: "Due Soon",
  },
  {
    name: "Jane Smith",
    property: "Ikeja GRA Flats",
    amount: "₦300,000",
    dueDate: "July 1",
    status: "Due Soon",
  },
  {
    name: "Bola Akinyemi",
    property: "Surulere Duplex",
    amount: "₦500,000",
    dueDate: "May 15",
    status: "Overdue",
  },
  {
    name: "Emeka Obi",
    property: "Abuja Pearl Towers",
    amount: "₦800,000",
    dueDate: "April 10",
    status: "Paid",
  },
  {
    name: "Kemi Ogunleye",
    property: "Magodo Heights",
    amount: "₦420,000",
    dueDate: "July 12",
    status: "Due Soon",
  },
];

const columns: ColumnDef<Tenant>[] = [
  { accessorKey: "name", header: "Tenant" },
  { accessorKey: "property", header: "Property" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "dueDate", header: "Due Date" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as Tenant["status"];
      const color =
        value === "Paid"
          ? "text-green-600"
          : value === "Overdue"
          ? "text-red-600"
          : "text-yellow-600";

      return <span className={`${color} font-medium`}>{value}</span>;
    },
  },
];

export default function RentDueTable() {
  return <Table columns={columns} data={data} />;
}
