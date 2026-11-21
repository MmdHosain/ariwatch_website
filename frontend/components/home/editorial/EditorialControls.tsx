export function EditorialControls({
  handlePrev,
  handleNext,
  currentSlide,
  totalSlides,
  showProgressBar = true,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  currentSlide: number;
  totalSlides: number;
  isFa: boolean;
  showProgressBar?: boolean;
}) {
  const progressPercent = ((currentSlide + 1) / Math.max(1, totalSlides)) * 100;

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 flex items-center gap-2" dir="ltr">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous brand"
          className="w-9 h-9 bg-white border border-gray-200 flex items-center justify-center text-xs text-ariwatch-black hover:bg-gray-50 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next brand"
          className="w-9 h-9 bg-[#c8102e] text-white flex items-center justify-center text-xs hover:bg-red-800 transition-colors"
        >
          ›
        </button>
        <span className="ms-2 text-[11px] font-medium tracking-widest text-gray-600">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" dir="ltr">
          <div
            className="h-full bg-[#c8102e] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </>
  );
}
