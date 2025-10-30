import { useState } from "react";

interface ClearCartButtonProps {
  onConfirm: () => void;
}

export default function ClearCartButton({ onConfirm }: ClearCartButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setShowConfirm(false);
  }

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
   <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        className="border border-gray-400 px-3 py-3 m-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
        aria-label="Tøm handlekurv"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
        </svg>
      </button>


      {showConfirm && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-10">
          <p className="text-sm mb-4">Er du sikker på at du vil tømme handlekurven?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleConfirm}
              className="px-3 py-1 rounded bg-customRed text-white hover:bg-customRedHover transition"
            >
              Ja, tøm
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              Nei
            </button>
          </div>
        </div>
      )}
    </div>
  );
}