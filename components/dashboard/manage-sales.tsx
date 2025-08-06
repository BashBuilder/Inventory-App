"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { Dispatch, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { set, z, infer as zodInfer } from "zod";
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
import { Loader2, Phone } from "lucide-react";
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
  price: z.number().min(0, "Price must be at least 0"),
});

type InventoryType = zodInfer<typeof InventorySchema>;

const ManageSale = ({ open, setOpen }: ManageInventoryProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    getProducts().then(setProducts);
  }, [open]);

  const handleClose = () => {
    setCustomer({ name: "", phone: "" });
    setStep(1);
    setSelectedProduct(null);
    setOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(InventorySchema),
    mode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    if (selectedProduct) {
      setValue("sellerName", selectedProduct.sellerName);
      setValue("sellerId", selectedProduct.sellerId);
      setValue("sellerAddress", selectedProduct.sellerAddress);
      setValue("sellerPhoneNumber", selectedProduct.sellerPhoneNumber || "");
      setValue("quantity", 1);
      setValue("price", selectedProduct.price);
    }
  }, [selectedProduct, setValue, reset]);

  const onSubmit: SubmitHandler<InventoryType> = async (data) => {
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

    if (step === 1) {
      setStep(2);
      return;
    }

    if (!customer.name || !customer.phone) {
      setError("quantity", {
        type: "manual",
        message: "Please add customer details ",
      });
      return;
    }

    try {
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
        customerName: customer.name,
        customerPhone: customer.phone,
        dateSold: new Date().toISOString(),
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {step === 1 && (
              <div className={`grid w-full grid-cols-2 gap-4 space-y-4`}>
                <SelectSale
                  products={products}
                  setSelectedProduct={setSelectedProduct}
                />
                <div>
                  <label>Seller Name</label>
                  <div>
                    <Input
                      className="mt-2"
                      disabled
                      {...register("sellerName")}
                    />
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
                    <Input
                      className="mt-2"
                      disabled
                      {...register("sellerId")}
                    />
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
                    <Input
                      className="mt-2"
                      disabled
                      {...register("sellerPhoneNumber")}
                    />
                    {errors.sellerPhoneNumber && (
                      <span className="text-sm text-red-600">
                        {errors.sellerPhoneNumber.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label>Price ($)</label>
                  <Input
                    disabled
                    className="mt-2"
                    value={(selectedProduct?.price || 0).toLocaleString(
                      "en-US",
                      {
                        currency: "USD",
                        style: "currency",
                      },
                    )}
                  />
                </div>
                <div>
                  <label>Seller Address</label>
                  <div>
                    <Input
                      disabled
                      className="mt-2"
                      {...register("sellerAddress")}
                    />
                    {errors.sellerAddress && (
                      <span className="text-sm text-red-600">
                        {errors.sellerAddress.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="mb-4 flex flex-col gap-4">
                <div>
                  <label>Customer Name</label>
                  <Input
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Customer Phone</label>
                  <Input
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {errors.quantity && (
              <span className="col-span-2 text-sm text-red-600">
                {errors.quantity.message}
              </span>
            )}

            <Button className="col-span-2 w-full" disabled={isSubmitting}>
              {step === 1 ? "Next" : isSubmitting ? <Loader2 /> : "Submit"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSale;
