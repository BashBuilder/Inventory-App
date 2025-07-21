"use client";
import ManageSale from "@/components/dashboard/manage-sales";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getSales } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Record = () => {
  const [open, setOpen] = React.useState(false);
  const [sales, setSales] = React.useState<any[]>([]);

  useEffect(() => {
    getSales().then(setSales);
  }, [open]);

  return (
    <main className="p-4">
      <ManageSale open={open} setOpen={setOpen} />
      <section className="mb-10 flex justify-between gap-4">
        <h2 className="text-xl font-semibold">Sales</h2>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Sell Product
        </Button>
      </section>

      {sales.length > 0 && (
        <Table className="overflow-hidden rounded-md">
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary text-white *:px-3 *:text-white">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price ($) </TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {sales?.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer *:p-3"
                onClick={() => {
                  // setSelectedProduct(product);
                  setOpen(true);
                }}
              >
                <TableCell>
                  {product.img && (
                    <img
                      src={URL.createObjectURL(product.img)}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {new Date(product.date).toLocaleTimeString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default Record;
