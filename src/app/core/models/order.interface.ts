export interface OrderShippingAddress {
    details: string;
    city:    string;
    phone:   string;
  }
  
  export interface OrderProduct {
    _id:            string;
    id:             string;
    title:          string;
    imageCover:     string;
    ratingsAverage: number;
    ratingsQuantity: number;
    category: {
      _id:   string;
      name:  string;
      slug:  string;
      image: string;
    };
    brand: {
      _id:   string;
      name:  string;
      slug:  string;
      image: string;
    };
  }
  
  export interface OrderCartItem {
    _id:     string;
    count:   number;
    price:   number;
    product: OrderProduct;
  }
  
  export interface OrderUser {
    _id:   string;
    name:  string;
    email: string;
    phone: string;
  }
  
  export interface Order {
    _id:               string;
    id:                number;      // numeric order ID shown in UI e.g. #76188
    shippingAddress:   OrderShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: 'cash' | 'card';
    isPaid:            boolean;
    isDelivered:       boolean;
    paidAt?:           string;
    user:              OrderUser;
    cartItems:         OrderCartItem[];
    createdAt:         string;
    updatedAt:         string;
    __v:               number;
  }