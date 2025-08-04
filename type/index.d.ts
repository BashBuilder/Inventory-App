declare interface ProductType {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: File; // Store the image as a File object
  imei: string;
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
  quantity: number;
  sellerPhoneNumber?: string | undefined;
  imei: string;
  img: File;
}
