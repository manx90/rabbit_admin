import React, { useState, useCallback, useEffect } from "react";

export default function ImageCellWithModal({ url, alt = "Product Cover" }) {
  const [open, setOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Handler to open modal
  const handleOpen = useCallback((e) => {
    e.stopPropagation();
    setOpen(true);
  }, []);

  // Handler to close modal
  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setOpen(false);
  }, []);

  // Handler for background click
  const handleBgClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  }, []);

  return (
    <>
      <img
        src={url}
        alt={alt}
        className="w-16 h-16 object-cover rounded-md border cursor-pointer"
        style={{ maxWidth: 64, maxHeight: 64 }}
        onClick={handleOpen}
        onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/64x64?text=No+Image"; }}
      />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleBgClick}>
          <div className="relative">
            <img
              src={url}
              alt="Product Cover Large"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg border-4 border-white"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full px-3 py-1 shadow-lg text-lg font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
