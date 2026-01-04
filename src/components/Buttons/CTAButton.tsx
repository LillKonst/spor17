interface CTAButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function CTAButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  className,
}: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`bg-ctaPink hover:bg-customPink text-customWhite text-xl p-3 px-4 rounded ${className || ""}`}
    >
      {loading ? "Laster..." : label}
    </button>
  );
}
