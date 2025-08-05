declare interface ProductType {
  id: number;
  name: string;
  price: number;
  img: File;
  imei: string;
  sellerName: string;
  sellerId: string;
  sellerAddress: string;
  sellerPhoneNumber?: string | undefined;
  dateBought: string;
  quantity: number;
}

declare interface SalesType {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  date: string;
  name: string;
  sellerName: string;
  sellerId: string;
  sellerAddress: string;
  sellerPhoneNumber?: string | undefined;
  imei: string;
  img: File;
  dateSold: string;
  quantity: number;
}
