"use client";

import ManageInventory from "@/components/dashboard/manage-inventory";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getPaginatedProducts, getProducts, searchProducts } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [limit, setLimit] = useState(1);

  useEffect(() => {
    if (search) {
      searchProducts(search).then(setProducts);
      return;
    }
    getPaginatedProducts(page, 10).then(setProducts);
  }, [open, page, search]);

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
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {products.length > 0 && (
        <Table className="overflow-hidden rounded-md">
          <TableCaption>All product</TableCaption>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary text-white *:px-3 *:text-white">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>IMEI</TableHead>
              <TableHead>Price ($) </TableHead>
              <TableHead>Seller Name</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.imei}</TableCell>
                <TableCell>
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>{product?.sellerName}</TableCell>
                <TableCell>
                  <span
                    className={`h-fit w-fit rounded-md px-3 py-1 ${product?.quantity > 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"} `}
                  >
                    {product?.quantity > 1 ? "In Stock" : "Sold Out"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!search && (
        <div>
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              variant="outline"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Inventory;
