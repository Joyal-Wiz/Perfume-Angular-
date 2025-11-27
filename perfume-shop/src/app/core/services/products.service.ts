import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = [
    {
      id: 1,
      name: "Royal Oud",
      price: 120,
      image: "https://via.placeholder.com/200x250",
      description: "Luxurious oud fragrance."
    },
    {
      id: 2,
      name: "Ocean Breeze",
      price: 80,
      image: "https://via.placeholder.com/200x250",
      description: "Fresh aquatic scent."
    },
    {
      id: 3,
      name: "Vanilla Mist",
      price: 95,
      image: "https://via.placeholder.com/200x250",
      description: "Sweet vanilla aroma."
    }
  ];

  constructor() {}

  getAllProducts() {
    return this.products;
  }
}
