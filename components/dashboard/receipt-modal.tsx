"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Logo from "@/components/globals/logo";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "./pdf-renderer";
import UpdatedReceipt from "./receiptRapper";

interface ManageInventoryProps {
  sales: SalesType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReceiptModal: React.FC<ManageInventoryProps> = ({
  open,
  setOpen,
  sales,
}) => {
  const handleClose = () => setOpen(false);

  const total = (sales?.quantity ?? 0) * (sales?.price ?? 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full space-y-4">
        <DialogTitle className="text-2xl">
          <Logo />
        </DialogTitle>

        <UpdatedReceipt item={sales} />

        {/* <div className="flex gap-6">
          <div className="w-full">
            <h2 className="mb-2 text-lg font-semibold">Receipt</h2>
            <div className="rounded border bg-gray-50 p-4">
              {sales ? (
                <>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>{sales.name}</span>
                      <span>
                        {sales.quantity} × ₦{sales.price?.toLocaleString()}
                      </span>
                      <span className="font-semibold">
                        ₦{total.toLocaleString()}
                      </span>
                    </li>
                    <li className="mt-2 flex justify-between border-t pt-2 font-bold">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </li>
                  </ul>

                  <PDFDownloadLink
                    document={<ReceiptPDF sale={sales} />}
                    fileName="receipt.pdf"
                    className="mt-4 block"
                  >
                    {({ loading }) => (
                      <Button disabled={loading}>
                        {loading ? "Preparing PDF..." : "Download Receipt"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </>
              ) : (
                <div className="text-gray-500">No sale to display.</div>
              )}
            </div>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
