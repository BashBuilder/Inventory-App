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
  img: File;
}
