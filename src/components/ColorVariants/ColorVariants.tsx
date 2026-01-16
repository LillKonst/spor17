// src/components/ColorVariants.tsx
import React from "react";
import type { ProductVariant } from "../../hooks/fetchProduct";

const COLOR_MAP: Record<string, string> = {
  gul: "#FFEA64",    
  grønn: "#6EE76E",  
  blå: "#ABD8FF",  
  lilla: "#D8ACFF",  
  svart: "#000000",
  hvit: "#FFFFFF",
};

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
  const colorVariants = variants.filter((variant) =>
    variant.selectedOptions.some(
      (opt) => opt.name.toLowerCase() === "farge"
    )
  );

  if (colorVariants.length === 0) return null;
  

  return (
    <div className="flex gap-2 items-center mt-3 p-5">
      {colorVariants.map((variant) => {
        const colorOption = variant.selectedOptions.find(
          (opt) => opt.name.toLowerCase() === "farge"
        )?.value;

        if (!colorOption) return null;

        const colorKey = colorOption.trim().toLowerCase();
        const isSelected = variant.id === selectedVariantId;

        return (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant)}
            className={`
              w-8 h-8 rounded-full border-2 transition-all
              ${isSelected ? "scale-120 border-gray-400 ring-2 ring-gray-400/20" : "border-gray-300"}
            `}
            style={{
              backgroundColor: COLOR_MAP[colorKey] ?? "#e5e7eb",
            }}
            aria-label={`Velg farge ${colorOption}`}
            title={colorOption}
          />
        );
      })}
    </div>
  );
};

export default ColorVariants;
