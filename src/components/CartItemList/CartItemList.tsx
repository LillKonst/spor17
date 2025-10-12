// import type { CartLine } from "../../hooks/shopifyCart";
// import CartItem from "../CartItem/CartItem";

// interface CartItemListProps {
//   lines: CartLine[];
//   onUpdateQuantity: (lineId: string, quantity: number) => void;
// }

// export default function CartItemList({ lines, onUpdateQuantity}: CartItemListProps) {
//   return (
//     <ul className="flex flex-col gap-5">
//       {lines.map((line) => (
//         <CartItem key={line.id} line={line} onUpdateQuantity={onUpdateQuantity} />
//       ))}
//     </ul>
//   );
// }

import type { CartLine } from "../../hooks/shopifyCart";
import CartItem from "../CartItem/CartItem";

interface CartItemListProps {
  lines: CartLine[];
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  loadingLineId?: string | null;
}

export default function CartItemList({
  lines,
  onUpdateQuantity,
  loadingLineId,
}: CartItemListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {lines.map((line) => (
        <CartItem
          key={line.id}
          line={line}
          onUpdateQuantity={onUpdateQuantity}
          isLoading={loadingLineId === line.id}
        />
      ))}
    </ul>
  );
}
