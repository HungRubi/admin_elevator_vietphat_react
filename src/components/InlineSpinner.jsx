const InlineSpinner = ({ size = 16, className = "" }) => {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      aria-hidden="true"
      className={`inline-block animate-spin rounded-full border-2 border-current/30 border-t-current ${className}`}
      style={{ width: px, height: px }}
    />
  );
};

export default InlineSpinner;

