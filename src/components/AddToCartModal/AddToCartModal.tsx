import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AddedToCartModalProps {
  show: boolean;
  productName: string;
  onClose: () => void;
}

export default function AddedToCartModal({ show, productName, onClose }: AddedToCartModalProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3">
              🛒 {productName} er lagt i handlekurven
            </h2>

            <div className="flex gap-3 justify-center mt-5">
              <button
                onClick={() => navigate("/handlekurv")}
                className="bg-customGreen text-black py-2 px-4 rounded-lg hover:bg-customHover transition"
              >
                Gå til handlekurv
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Fortsett å titte
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
