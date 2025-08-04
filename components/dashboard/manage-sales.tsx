"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { Dispatch, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, infer as zodInfer } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  addProduct,
  addSale,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/db";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import SelectSale from "../select-sale";

interface ManageInventoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InventorySchema = z.object({
  sellerName: z.string().min(1, "Name is required"),
  sellerId: z.string().min(1, "Id is required"),
  sellerAddress: z.string().min(1, "Address is required"),
  sellerPhoneNumber: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
});

type InventoryType = zodInfer<typeof InventorySchema>;

const ManageSale = ({ open, setOpen }: ManageInventoryProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  useEffect(() => {
    getProducts().then(setProducts);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(InventorySchema),
    mode: "onChange",
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<InventoryType> = async (data) => {
    try {
      if (!selectedProduct) {
        setError("quantity", {
          type: "manual",
          message: "Please select a product",
        });
        return;
      }

      if (data.quantity > selectedProduct?.quantity) {
        setError("quantity", {
          type: "manual",
          message: "Quantity exceeds available stock",
        });
        return;
      }
      const payload = {
        ...selectedProduct,
        quantity: selectedProduct.quantity - data.quantity,
      };

      await updateProduct(payload);
      const salesToAdd: SalesType = {
        id: Date.now(),
        productId: selectedProduct.id,
        quantity: data.quantity,
        price: selectedProduct.price,
        date: new Date().toISOString(),
        name: selectedProduct.name,
        img: selectedProduct.img,
        sellerName: data.sellerName,
        sellerId: data.sellerId,
        sellerPhoneNumber: data.sellerPhoneNumber,
        imei: selectedProduct.imei,
        sellerAddress: data.sellerAddress,
      };

      await addSale(salesToAdd);
      toast.success("Product added successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to submit product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`space-y-4 sm:max-w-[800px]`}>
        <DialogTitle className="text-2xl">Sell Product</DialogTitle>
        <div className={`flex gap-6`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`grid w-full grid-cols-2 gap-4 space-y-4`}
          >
            <SelectSale
              products={products}
              setSelectedProduct={setSelectedProduct}
            />
            <div>
              <label>Seller Name</label>
              <div>
                <Input className="mt-2" {...register("sellerName")} />
                {errors.sellerName && (
                  <span className="text-sm text-red-600">
                    {errors.sellerName.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label>Seller ID</label>
              <div>
                <Input className="mt-2" {...register("sellerId")} />
                {errors.sellerId && (
                  <span className="text-sm text-red-600">
                    {errors.sellerId.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label>Seller Phone</label>
              <div>
                <Input className="mt-2" {...register("sellerPhoneNumber")} />
                {errors.sellerPhoneNumber && (
                  <span className="text-sm text-red-600">
                    {errors.sellerPhoneNumber.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label>Quantity</label>
              <div>
                <Input
                  type="number"
                  className="mt-2"
                  min={0}
                  {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && (
                  <span className="text-sm text-red-600">
                    {errors.quantity.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label>Price ($)</label>
              <Input
                disabled
                className="mt-2"
                value={(
                  (selectedProduct?.price || 0) * (watch("quantity") || 0)
                ).toLocaleString("en-US", {})}
              />
            </div>
            <div className="col-span-2">
              <label>Seller Address</label>
              <div>
                <Input className="mt-2" {...register("sellerAddress")} />
                {errors.sellerAddress && (
                  <span className="text-sm text-red-600">
                    {errors.sellerAddress.message}
                  </span>
                )}
              </div>
            </div>

            <Button className="col-span-2 w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 /> : "Submit"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSale;
