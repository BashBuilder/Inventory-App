"use client";

import { Separator } from "@/components/ui/separator";
import { forwardRef } from "react";
import Logo from "../globals/logo";

interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ReceiptProps {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  receiptNumber?: string;
  date?: string;
  items?: ReceiptItem[];
  customerInfo?: {
    name: string;
    phone: string;
  };
  paymentMethod?: string;
  imeiNumber?: string;
}

const defaultItems: ReceiptItem[] = [
  {
    description: "Diagnostic software warranty policy",
    quantity: 1,
    unitPrice: 24.0,
    total: 24.0,
  },
  {
    description: "Unit Price",
    quantity: 1,
    unitPrice: 16.0,
    total: 16.0,
  },
];

export const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  (
    {
      companyName = "ZONE",
      companyAddress = "Multimedia, Tel: 076/274997",
      companyPhone = "Zrenjanincentar.com",
      receiptNumber = "0001234",
      date = "14/05/2024",
      items = defaultItems,
      customerInfo = {
        name: "Customer Name",
        phone: "Customer Phone",
      },
      paymentMethod = "CASH",
      imeiNumber = "Passed code",
    },
    ref,
  ) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal;

    return (
      <div
        ref={ref}
        className="bg-receipt border-receipt-border mx-auto max-w-md border shadow-lg print:border-black print:shadow-none"
      >
        {/* Header */}
        <div className="bg-receipt-header p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-4xl">
            <Logo />
          </div>
          <p className="text-sm opacity-90">{companyAddress}</p>
          <p className="text-xs opacity-80">{companyPhone}</p>
        </div>

        {/* Receipt Info */}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-receipt-muted text-sm">Receipt No:</span>
            <span className="text-receipt-text font-mono">{receiptNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-receipt-muted text-sm">Date:</span>
            <span className="text-receipt-text font-mono">{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-receipt-muted text-sm">IMEI No:</span>
            <span className="text-receipt-text font-mono">{imeiNumber}</span>
          </div>
        </div>

        <Separator />

        {/* Items */}
        <div className="p-4">
          <h3 className="text-receipt-text mb-3 font-semibold">
            Item Description
          </h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-receipt-text text-sm leading-tight">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-receipt-muted">
                    {" "}
                    Quantity {item.quantity}
                  </span>
                  {/* <span className="text-receipt-muted">
                    {item.quantity} x ${item.unitPrice.toFixed(2)}
                  </span> */}
                  <span className="text-receipt-text font-mono">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-receipt-muted">Subtotal:</span>
            <span className="text-receipt-text font-mono">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-receipt-text">Total:</span>
            <span className="text-receipt-total font-mono">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Payment & Customer Info */}
        <div className="space-y-3 p-4">
          {/* <div>
            <p className="text-receipt-muted mb-1 text-sm">Payment Method:</p>
            <div className="flex items-center gap-2">
              <div className="border-receipt-border h-3 w-3 border">
                {paymentMethod === "CASH" && (
                  <div className="bg-receipt-text h-full w-full"></div>
                )}
              </div>
              <span className="text-receipt-text text-sm">CASH</span>
              <div className="border-receipt-border ml-4 h-3 w-3 border">
                {paymentMethod === "CARD" && (
                  <div className="bg-receipt-text h-full w-full"></div>
                )}
              </div>
              <span className="text-receipt-text text-sm">CARD</span>
            </div>
          </div> */}

          <div>
            <p className="text-receipt-muted mb-1 text-sm">Customer:</p>
            <p className="text-receipt-text text-sm">{customerInfo.name}</p>
            <p className="text-receipt-text text-sm">{customerInfo.phone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 text-center">
          <p className="text-receipt-muted text-xs">
            Thank you for your business!
          </p>
        </div>
      </div>
    );
  },
);
