// src/components/ColorVariants.tsx
import React from "react";

export interface ProductVariant {
  id: string;
  title: string;
  selectedOptions: { name: string; value: string }[];
}

interface ColorVariantsProps {
  variants: ProductVariant[];
  selectedVariantId?: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

const ColorVariants: React.FC<ColorVariantsProps> = ({
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  // Filtrer ut farge-varianter
  const colorVariants = variants.filter((v) =>
    v.selectedOptions.some((opt) => opt.name.toLowerCase() === "farge")
  );

  if (colorVariants.length === 0) return null; // Ingen farge-alternativer

  return (
    <div className="flex gap-2 items-center mt-2">
      {colorVariants.map((variant) => {
        const colorOption = variant.selectedOptions.find(
          (opt) => opt.name.toLowerCase() === "farge"
        )?.value;

        // Enkel sikkerhet, hvis farge ikke finnes
        if (!colorOption) return null;

        // Velg om denne sirkelen er aktiv
        const isSelected = variant.id === selectedVariantId;

        return (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant)}
            className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-transform ${
              isSelected ? "scale-110 border-black" : "border-gray-300"
            }`}
            style={{ backgroundColor: colorOption.toLowerCase() }}
            aria-label={colorOption}
          />
        );
      })}
    </div>
  );
};

export default ColorVariants;
