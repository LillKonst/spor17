import type { CartLine } from "../../hooks/shopifyCart";

interface CartItemProps {
  line: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
}

export default function CartItem({ line, onUpdateQuantity }: CartItemProps) {
  return (
     <li className="flex flex-col md:flex-row items-center space-x-4 p-4 rounded shadow-sm">
      {line.image && (
        <img src={line.image} alt={line.title} className="w-54 h-54 object-cover rounded" />
      )}
      <div className="flex-1">
        <p className="font-semibold">{line.title}</p>
        <p>
          Pris: {Math.round(Number(line.price.amount))} {line.price.currencyCode}
        </p>
        <p>Antall: {line.quantity}</p>
        <div className="space-x-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
          >
            +
          </button>
          <button
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
          >
            -
          </button>
        </div>
      </div>
    </li>
  );
}