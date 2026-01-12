import type { ProductVariant } from "./ColorVariants"; // vi kan bruke samme interface

const COLOR_MAP: Record<string, string> = {
  gul: "#FFEA64",
  grønn: "#6EE76E",
  blå: "#3B82F6",
  rosa: "#EC4899",
  svart: "#000000",
  hvit: "#FFFFFF",
};

interface ColorOptionsMiniProps {
  variants: ProductVariant[];
}

export default function ColorVariantsMini({ variants }: ColorOptionsMiniProps) {
  // filtrer kun farge-varianter
  const colorVariants = variants.filter((variant) =>
    variant.selectedOptions.some((opt) => ["farge", "color"].includes(opt.name.toLowerCase()))
  );

  if (colorVariants.length === 0) return null;

  // hent unike farger
  const uniqueColors = Array.from(
    new Set(
      colorVariants.map(
        (variant) =>
          variant.selectedOptions.find((opt) => ["farge", "color"].includes(opt.name.toLowerCase()))
            ?.value
      )
    )
  ).filter(Boolean) as string[];

  return (
    <div className="flex gap-1 mt-2">
      {uniqueColors.slice(0, 3).map((color) => (
        <span
          key={color}
          className="h-3 w-3 rounded-full border border-gray-300"
          style={{ backgroundColor: COLOR_MAP[color.toLowerCase()] ?? color.toLowerCase() }}
          title={color}
        />
      ))}
      {uniqueColors.length > 3 && (
        <span className="text-xs text-gray-500 ml-1">+{uniqueColors.length - 3}</span>
      )}
    </div>
  );
}
