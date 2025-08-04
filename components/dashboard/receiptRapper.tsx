"use client";
import { useRef } from "react";
import { Receipt } from "./receipt";
import { DownloadOptions } from "./downloadOption";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/store";

interface PropsType {
  item: SalesType;
}

const UpdatedReceipt = ({ item }: PropsType) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const profile = useSelector((state: RootState) => state.auth.profile);
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Receipt
          ref={receiptRef}
          companyName={profile?.title}
          companyAddress={""}
          companyPhone=""
          receiptNumber={item.id.toString()}
          date={new Date(item.date).toDateString()}
          items={[
            {
              description: item.name,
              quantity: item.quantity,
              unitPrice: item.price,
              total: item.price,
            },
          ]}
          customerInfo={{
            name: item.sellerName,
            phone: item.sellerPhoneNumber || "",
          }}
          paymentMethod="CASH"
          imeiNumber={item.imei}
        />

        <DownloadOptions targetRef={receiptRef} filename="zone-receipt" />
      </div>
    </div>
  );
};

export default UpdatedReceipt;
