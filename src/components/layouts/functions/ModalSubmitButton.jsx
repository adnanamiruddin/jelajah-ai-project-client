export default function ModalSubmitButton({
  loading,
  onClick,
  fullWidth,
  children,
}) {
  return (
    <button
      type="button"
      onClick={loading ? null : onClick}
      className={`py-1.5 border border-green-700 bg-gradient-to-br from-green-800 to-green-400 rounded text-white hover:brightness-110 focus:brightness-75 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      } ${fullWidth ? "w-full" : "w-36"}`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm -mb-0.5"></span>
      ) : (
        children
      )}
    </button>
  );
}
