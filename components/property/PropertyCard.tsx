"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Euro } from "lucide-react";
import { Property } from "@/types/property";
import PropertyDetails from "./PropertyDetails";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-neutral-100">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"}
          alt={`${property.type} property`}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="mb-2">
            {property.type}
          </Badge>
          <p className="text-xl font-bold flex items-center">
            <Euro className="w-5 h-5 inline mr-1" />
            {property.price.toLocaleString()}
          </p>
        </div>
        <PropertyDetails property={property} />
      </div>
    </Card>
  );
}