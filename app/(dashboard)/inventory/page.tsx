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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  useEffect(() => {
    getProducts().then(setProducts);
  }, [open]);

  return (
    <main className="p-4">
      <ManageInventory
        open={open}
        setOpen={setOpen}
        product={selectedProduct}
        setProduct={setSelectedProduct}
      />
      <section className="mb-10 flex justify-between gap-4">
        <h2 className="text-xl font-semibold">Inventories</h2>
        <Button
          onClick={() => {
            setOpen(true);
            setSelectedProduct(null);
          }}
        >
          Add Product
        </Button>
      </section>
      {products.length > 0 && (
        <Table className="overflow-hidden rounded-md">
          <TableCaption>All product</TableCaption>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary text-white *:px-3 *:text-white">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>IMEI</TableHead>
              <TableHead>Price ($) </TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {products?.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer *:p-3"
                onClick={() => {
                  setSelectedProduct(product);
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
                <TableCell>{product.imei}</TableCell>
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

export default Inventory;
