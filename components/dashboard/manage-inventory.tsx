"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { Dispatch, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, infer as zodInfer } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addProduct, deleteProduct, updateProduct } from "@/lib/db";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface ManageInventoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setProduct: Dispatch<React.SetStateAction<ProductType | null>>;
  product?: ProductType | null;
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
  description: z.string().min(1, "Description is required"),
});

type InventoryType = zodInfer<typeof InventorySchema>;

const ManageInventory = ({
  open,
  setOpen,
  product,
  setProduct,
}: ManageInventoryProps) => {
  const [action, setAction] = useState<"edit" | "delete" | null>(null);

  const handleClose = () => {
    setOpen(false);
    reset();
    setProduct(null);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(InventorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        img: product.img, // Assuming img is a File object
        description: product.description,
      });
    } else {
      reset({
        name: "",
        quantity: 0,
        price: 0,
        img: undefined, // Reset img to undefined
        description: "",
      }); // Explicitly clear the form
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<InventoryType> = async (
    data: InventoryType,
  ) => {
    try {
      if (action === "delete" && product) {
        if (!product?.id) {
          toast.error("Product ID is required for deletion.");
          return;
        }
        await deleteProduct(product.id);
        toast.success("Product deleted successfully");
        handleClose();
        return;
      }
      if (action === "edit" && product) {
        const updatedProduct = {
          ...product,
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          img: data.img, // save File directly
          description: data.description,
        };
        await updateProduct(updatedProduct);
        toast.success("Product updated successfully");
        handleClose();
        return;
      }
      const payload = {
        id: Date.now(),
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        img: data.img, // save File directly
        description: data.description,
      };

      await addProduct(payload);
      toast.success("Product added successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to submit product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`${watch("img") ? "sm:max-w-5xl" : ""} w-full space-y-4 transition duration-100 ease-linear`}
      >
        <DialogTitle className="text-2xl">
          {product ? "Update" : "Add"} Product
        </DialogTitle>
        <div className={`flex gap-6 ${watch("img") ? "flex-row" : "flex-col"}`}>
          {watch("img") && (
            <img
              src={URL.createObjectURL(watch("img"))}
              alt="Product Preview"
              className="w-1/2 flex-1 rounded-md object-cover"
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${watch("img") ? "w-1/2" : "w-full"} space-y-4`}
          >
            <div>
              <label>Product Image</label>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-2 cursor-pointer"
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
            <div>
              <label>Name</label>
              <div>
                <Input type="text" {...register("name")} className="mt-2" />
                {errors.name && (
                  <span className="text-sm text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label>Description</label>
              <div>
                <Textarea {...register("description")} className="mt-2" />
                {errors.name && (
                  <span className="text-sm text-red-600">
                    {errors.name.message}
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
              <label>Price ($) </label>
              <div>
                <Input
                  type="number"
                  className="mt-2"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <span className="text-sm text-red-600">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            {product ? (
              <div className="flex flex-wrap justify-between gap-4">
                <Button
                  variant={"secondary"}
                  className=""
                  onClick={() => setAction("edit")}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 /> : "Update Product"}
                </Button>
                <Button
                  variant={"destructive"}
                  disabled={isSubmitting}
                  onClick={() => setAction("delete")}
                >
                  {isSubmitting ? <Loader2 /> : "Delete Product"}
                </Button>
              </div>
            ) : (
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 /> : "Submit"}
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInventory;
