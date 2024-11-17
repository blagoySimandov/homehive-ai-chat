interface Property {
  id: string;
  description: string;
  price: number;
  area: number;
  beds: number;
  type: string;
  baths: number;
  images: string[];
  geocodedAddress: {
    address: {
      formattedAddress: string;
    };
  };
}

const mockProperties: Property[] = [
  {
    id: "1",
    description: "Modern apartment in the heart of the city with stunning views",
    price: 350000,
    area: 85,
    beds: 2,
    type: "Apartment",
    baths: 1,
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"],
    geocodedAddress: {
      address: {
        formattedAddress: "123 City Center, Dublin 2",
      },
    },
  },
  {
    id: "2",
    description: "Spacious family home with large garden",
    price: 550000,
    area: 180,
    beds: 4,
    type: "House",
    baths: 3,
    images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800"],
    geocodedAddress: {
      address: {
        formattedAddress: "45 Suburban Lane, Dublin 14",
      },
    },
  },
  {
    id: "3",
    description: "Cozy studio apartment perfect for students",
    price: 200000,
    area: 45,
    beds: 1,
    type: "Studio",
    baths: 1,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    geocodedAddress: {
      address: {
        formattedAddress: "78 College Road, Dublin 6",
      },
    },
  },
];

export function mockSearchProperties(query: string): Property[] {
  // Convert query to lowercase for case-insensitive matching
  const lowerQuery = query.toLowerCase();
  
  // Define search criteria based on common keywords
  const isLookingForApartment = lowerQuery.includes("apartment");
  const isLookingForHouse = lowerQuery.includes("house");
  const isLookingForStudio = lowerQuery.includes("studio");
  
  // Extract price range (if mentioned)
  const priceMatch = query.match(/(\d+),?000/);
  const maxPrice = priceMatch ? parseInt(priceMatch[1]) * 1000 : 1000000;
  
  // Extract number of bedrooms (if mentioned)
  const bedroomMatch = query.match(/(\d+)\s*bed/);
  const desiredBedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : null;

  return mockProperties.filter(property => {
    // Filter by property type
    if (isLookingForApartment && property.type !== "Apartment") return false;
    if (isLookingForHouse && property.type !== "House") return false;
    if (isLookingForStudio && property.type !== "Studio") return false;
    
    // Filter by price
    if (property.price > maxPrice) return false;
    
    // Filter by bedrooms if specified
    if (desiredBedrooms !== null && property.beds !== desiredBedrooms) return false;
    
    return true;
  });
}