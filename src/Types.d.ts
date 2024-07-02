type HomeSliderItem = {
  id: string;
  url: string;
  discount: string;
  AboutItem: string;
};

type Offer = {
  icon: string;
  offerText: string;
  bgColor: string;
};

interface Review {
  name: string;
  text: string;
}

type DiscountItem = {
  id: string;
  category: string;
  name: string;
  seller: string;
  oldprice: number;
  price: number;
  description: string;
  ratings: number;
  ratingsCount: number;
  review: Review[];
  img: string[];
};

interface Product {
  id: string;
  category: string;
  page?: string;
  name: string;
  seller: string;
  price: number;
  description?: string;
  ratings: number;
  quantity?: number;
  review: Review[];
  img: string[];
}
