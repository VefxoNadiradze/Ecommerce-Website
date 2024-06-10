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
  img: {
    img1: string;
    img2: string;
  };
};

type Product = {
  id: string;
  category: string;
  page?: string;
  name: string;
  seller: string;
  price: number;
  description?: string;
  ratings: number;
  ratingsCount: number;
  quantity?: number;
  img: {
    img1: string;
    img2: string;
  };
};
