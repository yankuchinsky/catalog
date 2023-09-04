/// <reference types="vite/client" />

interface IProduct {
  id: number;
  image: string;
  name: string;
  brand: string;
  vendor_sku: string;
  url: string;
  price: number;
  categories: number[];
}

interface ICategory {
  id: number;
  name: string;
  children: {
    id: number;
    name: string;
  }[];
}
