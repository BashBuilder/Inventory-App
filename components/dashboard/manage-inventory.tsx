"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, infer as zodInfer } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addProduct } from "@/lib/db";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ManageInventoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InventorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  price: z.number().min(0, "Price must be at least 0"),
  img: z
    .file()
    .refine((data) => data.size <= 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    })
    .refine((data) => data.type.startsWith("image/"), {
      message: "File must be an image",
    }),
  description: z.string().optional(),
});

type InventoryType = zodInfer<typeof InventorySchema>;

const ManageInventory = ({ open, setOpen }: ManageInventoryProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(InventorySchema), mode: "onChange" });

  const onSubmit: SubmitHandler<InventoryType> = async (
    data: InventoryType,
  ) => {
    try {
      const product = {
        id: Date.now(),
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        img: data.img, // save File directly
        description: data.description,
      };
      await addProduct(product);
      toast.success("Product added successfully");
      handleClose();
    } catch (error) {}

    console.log(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="space-y-4">
        <DialogTitle className="text-2xl"> Add Product</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label>Product Image</label>
            <div>
              <Input
                type="file"
                accept="image/*"
                // {...register("img")}
                className="cursor-pointer"
                multiple={false}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    (register("img").onChange as any)({
                      target: { name: "img", value: files[0] },
                    });
                  }
                }}
              />
              {errors.img && (
                <span className="text-sm text-red-600">
                  {errors.img.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label>Name</label>
            <div>
              <Input type="text" {...register("name")} className="input" />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label>Quantity</label>
            <div>
              <Input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="input"
              />
              {errors.quantity && (
                <span className="text-sm text-red-600">
                  {errors.quantity.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label>Price</label>
            <div>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="input"
              />
              {errors.price && (
                <span className="text-sm text-red-600">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInventory;
