export interface Product {
  id:number;
  title:string;
  price:number;
  thumbnail: string | CloudinaryImage;
  subimages: (string | CloudinaryImage)[];
  sold?:string;
  store?:string;
}

export interface CloudinaryImage {
  secure_url?: string;
  url?: string;
}
