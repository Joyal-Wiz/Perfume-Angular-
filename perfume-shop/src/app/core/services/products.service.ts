import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
products = [
  { id: 1,  name: "Royal Oud",        brand: "Aura",         price: 149, discount: 25, category: "Oud",     stock: 12, image: "assets/img/1.jpg" },
  { id: 2,  name: "Velvet Bloom",     brand: "Zara",         price: 129, discount: 15, category: "Women",   stock: 20, image: "assets/img/24.jpg" },
  { id: 3,  name: "Noir Mystique",    brand: "Dior",         price: 139, discount: 20, category: "Men",     stock: 18, image: "assets/img/3.jpg" },
  { id: 4,  name: "Amber Luxe",       brand: "Gucci",        price: 159, discount: 30, category: "Luxury",  stock: 10, image: "assets/img/4.jpg" },
  { id: 5,  name: "Ocean Breeze",     brand: "Aqua",         price: 99,  discount: 10, category: "Fresh",   stock: 25, image: "assets/img/5.jpg" },
  { id: 6,  name: "Floral Kiss",      brand: "Chanel",       price: 119, discount: 18, category: "Women",   stock: 16, image: "assets/img/6.jpg" },
  { id: 7,  name: "Night Shadow",     brand: "Versace",      price: 179, discount: 22, category: "Men",     stock: 14, image: "assets/img/7.jpg" },
  { id: 8,  name: "Citrus Burst",     brand: "Calvin Klein", price: 89,  discount: 12, category: "Fresh",   stock: 30, image: "assets/img/8.jpg" },
  { id: 9,  name: "Rose Desire",      brand: "Zara",         price: 109, discount: 14, category: "Women",   stock: 18, image: "assets/img/9.jpg" },
  { id: 10, name: "Fresh Mint",       brand: "Aura",         price: 79,  discount: 10, category: "Fresh",   stock: 28, image: "assets/img/10.jpg" },
  { id: 11, name: "Golden Hour",      brand: "Gucci",        price: 169, discount: 25, category: "Luxury",  stock: 11, image: "assets/img/11.jpg" },
  { id: 12, name: "Dark Whisper",     brand: "Dior",         price: 189, discount: 28, category: "Men",     stock: 13, image: "assets/img/12.jpg" },
  { id: 13, name: "Blossom Pink",     brand: "Chanel",       price: 145, discount: 20, category: "Women",   stock: 17, image: "assets/img/13.jpg" },
  { id: 14, name: "Summer Vibes",     brand: "Zara",         price: 95,  discount: 12, category: "Fresh",   stock: 26, image: "assets/img/14.jpg" },
  { id: 15, name: "Sapphire Mist",    brand: "Aqua",         price: 135, discount: 18, category: "Unisex",  stock: 15, image: "assets/img/15.jpg" },
  { id: 16, name: "Mystic Forest",    brand: "Versace",      price: 199, discount: 30, category: "Men",     stock: 10, image: "assets/img/a.jpg" },
  { id: 17, name: "Coco Breeze",      brand: "Coco",         price: 105, discount: 15, category: "Women",   stock: 20, image: "assets/img/b.jpg" },
  { id: 18, name: "Lavender Hills",   brand: "Aura",         price: 115, discount: 17, category: "Unisex",  stock: 19, image: "assets/img/c.jpg" },
  { id: 19, name: "Royal Jasmine",    brand: "Chanel",       price: 175, discount: 22, category: "Women",   stock: 11, image: "assets/img/d.jpg" },
  { id: 20, name: "Vanilla Smoke",    brand: "Gucci",        price: 155, discount: 26, category: "Unisex",  stock: 13, image: "assets/img/e.jpg" },
  { id: 21, name: "Cedar Fresh",      brand: "Calvin Klein", price: 92,  discount: 11, category: "Men",     stock: 24, image: "assets/img/f.jpg" },
  { id: 22, name: "Midnight Love",    brand: "Dior",         price: 182, discount: 27, category: "Luxury",  stock: 10, image: "assets/img/g.jpg" },
  { id: 23, name: "Pure Blossom",     brand: "Zara",         price: 98,  discount: 14, category: "Women",   stock: 22, image: "assets/img/b.jpg" },
  { id: 24, name: "Exotic Bloom",     brand: "Aura",         price: 139, discount: 16, category: "Women",   stock: 18, image: "assets/img/h.jpg" },
  { id: 25, name: "Urban Spice",      brand: "Calvin Klein", price: 118, discount: 12, category: "Men",     stock: 17, image: "assets/img/i.jpg" },
  { id: 26, name: "Black Velvet",     brand: "Gucci",        price: 199, discount: 30, category: "Luxury",  stock: 7,  image: "assets/img/j.jpg" },
  { id: 27, name: "Fresh Blossom",    brand: "Chanel",       price: 149, discount: 18, category: "Women",   stock: 16, image: "assets/img/k.jpg" },
  { id: 28, name: "Wood Smoke",       brand: "Versace",      price: 169, discount: 22, category: "Men",     stock: 13, image: "assets/img/l.jpg" },
  { id: 29, name: "Sweet Orchid",     brand: "Zara",         price: 119, discount: 15, category: "Women",   stock: 20, image: "assets/img/m.jpg" },
  { id: 30, name: "Royal Citrus",     brand: "Aura",         price: 109, discount: 13, category: "Fresh",   stock: 21, image: "assets/img/n.jpg" },
  { id: 31, name: "Opal Rose",        brand: "Chanel",       price: 159, discount: 20, category: "Women",   stock: 14, image: "assets/img/o.jpg" },
  { id: 32, name: "Deep Ocean",       brand: "Aqua",         price: 99,  discount: 10, category: "Men",     stock: 23, image: "assets/img/p.jpg" },
  { id: 33, name: "Ruby Noir",        brand: "Dior",         price: 199, discount: 28, category: "Luxury",  stock: 9,  image: "assets/img/q.jpg" },
  { id: 34, name: "Crystal Mist",     brand: "Versace",      price: 189, discount: 20, category: "Women",   stock: 12, image: "assets/img/r.jpg" },
  { id: 35, name: "Black Ocean",      brand: "Gucci",        price: 175, discount: 25, category: "Men",     stock: 15, image: "assets/img/s.jpg" },
  { id: 36, name: "Aqua Lime",        brand: "Calvin Klein", price: 89,  discount: 12, category: "Fresh",   stock: 27, image: "assets/img/t.jpg" },
  { id: 37, name: "Berry Fresh",      brand: "Zara",         price: 105, discount: 15, category: "Fresh",   stock: 22, image: "assets/img/u.jpg" },
  { id: 38, name: "Rose Dream",       brand: "Aura",         price: 139, discount: 18, category: "Women",   stock: 18, image: "assets/img/v.jpg" },
  { id: 39, name: "Night Rain",       brand: "Dior",         price: 189, discount: 22, category: "Men",     stock: 13, image: "assets/img/w.jpg" },
  { id: 40, name: "Spice King",       brand: "Versace",      price: 179, discount: 25, category: "Men",     stock: 11, image: "assets/img/x.jpg" },
  { id: 41, name: "Golden Powder",    brand: "Gucci",        price: 169, discount: 28, category: "Luxury",  stock: 10, image: "assets/img/y.jpg" },
  { id: 42, name: "White Musk",       brand: "Chanel",       price: 149, discount: 18, category: "Unisex",  stock: 20, image: "assets/img/z.jpg" },
  { id: 43, name: "Citrus Pop",       brand: "Calvin Klein", price: 95,  discount: 10, category: "Fresh",   stock: 29, image: "assets/img/16.jpg" },
  { id: 44, name: "Royal Rouge",      brand: "Zara",         price: 135, discount: 16, category: "Women",   stock: 17, image: "assets/img/17.jpg" },
  { id: 45, name: "Blue Bliss",       brand: "Aqua",         price: 115, discount: 12, category: "Men",     stock: 22, image: "assets/img/18.jpg" },
  { id: 46, name: "Cocoa Woods",      brand: "Aura",         price: 155, discount: 20, category: "Unisex",  stock: 14, image: "assets/img/19.jpg" },
  { id: 47, name: "Black Rose",       brand: "Dior",         price: 199, discount: 30, category: "Women",   stock: 9,  image: "assets/img/20.jpg" },
  { id: 48, name: "Moonlight Mist",   brand: "Versace",      price: 189, discount: 18, category: "Women",   stock: 13, image: "assets/img/21.jpg" },
  { id: 49, name: "Opium Fresh",      brand: "Gucci",        price: 169, discount: 22, category: "Fresh",   stock: 26, image: "assets/img/22.jpg" },
  { id: 50, name: "Flower Bomb",      brand: "Chanel",       price: 159, discount: 20, category: "Women",   stock: 0, image: "assets/img/23.jpg" }
];



  constructor() {}

  getAllProducts() {
    return this.products;
  }
  
}
