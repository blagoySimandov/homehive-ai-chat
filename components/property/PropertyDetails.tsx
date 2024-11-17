"use client";

import { Bed, Bath, Square } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
        {property.geocodedAddress.address.formattedAddress}
      </p>
      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center">
          <Bed className="w-4 h-4 mr-1" />
          {property.beds}
        </div>
        <div className="flex items-center">
          <Bath className="w-4 h-4 mr-1" />
          {property.baths}
        </div>
        <div className="flex items-center">
          <Square className="w-4 h-4 mr-1" />
          {property.area}m²
        </div>
      </div>
      <p className="mt-2 text-sm line-clamp-2">{property.description}</p>
    </>
  );
}