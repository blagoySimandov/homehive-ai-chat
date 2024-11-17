"use client";

import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (!properties.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 mt-2 max-w-[80%]">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

