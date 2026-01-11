import type { CartLine } from "../../hooks/cart/types";

interface CartItemProps {
  line: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  isLoading?: boolean;
}

export default function CartItem({
  line,
  onUpdateQuantity,
  isLoading,
}: CartItemProps) {
  return (
    <li className="flex flex-col sm:flex-row items-center space-x-4 p-4 rounded shadow-sm">
      {line.image && (
        <img
          src={line.image}
          alt={line.title}
          className="w-full sm:w-54 sm:h-54 object-cover rounded "
        />
      )}
      <div className="w-full flex-1 mt-2">
        <p className="font-semibold">{line.title}</p>
        <p>
          Pris: {Math.round(Number(line.price.amount))} {line.price.currencyCode}
        </p>
        <p>Antall: {line.quantity}</p>

        <div className="space-x-2 mt-2">
          <button
            type="button"
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={isLoading}
            onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
          >
            {isLoading ? "..." : "+"}
          </button>

          <button
            type="button"
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
          >
            {isLoading ? "..." : "-"}
          </button>
        </div>
      </div>
    </li>
  );
}
