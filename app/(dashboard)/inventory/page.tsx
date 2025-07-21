"use client";

import ManageInventory from "@/components/dashboard/manage-inventory";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlignVerticalDistributeEndIcon } from "lucide-react";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, [open]);

  console.log("Products:", products);

  return (
    <main className="space-y-6 p-4">
      <ManageInventory open={open} setOpen={setOpen} />
      <section className="mb-4 flex justify-between gap-4">
        <h2 className="text-xl font-semibold">Inventories</h2>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </section>
      {products.length && (
        <Table className="overflow-hidden rounded-md">
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow className="bg-primary text-white *:px-3 *:text-white">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price ($) </TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {products?.map((product) => (
              <TableRow key={product.product} className="cursor-pointer *:p-3">
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
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      )}
    </main>
  );
};

export default Inventory;
