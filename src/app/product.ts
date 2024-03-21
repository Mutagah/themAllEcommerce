export class Product {
  id!: number;
  title!: string;
  price!: number;
  description!: string;
  category!: string;
  image!: any;
  rating!: { rate: number; count: number };
}
