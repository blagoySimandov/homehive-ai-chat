export interface Property {
  id: string;
  images: string[];
  price: number;
  beds: number;
  baths: number;
  area: number;
  description: string;
  type: string;
  geocodedAddress: {
    address: {
      formattedAddress: string;
    };
  };
}