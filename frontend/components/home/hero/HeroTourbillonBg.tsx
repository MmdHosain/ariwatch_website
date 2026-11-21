export function HeroTourbillonBg({ paused }: { paused: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] rounded-full border-[14px] border-[#d4be8d]/80 shadow-[0_25px_70px_rgba(0,0,0,0.45),inset_0_0_50px_rgba(0,0,0,0.25)] flex items-center justify-center -rotate-12 scale-110">
        <div className={`w-[78%] h-[78%] rounded-full border-[6px] border-[#cbb37c]/70 flex items-center justify-center ${paused ? '' : 'animate-spin-slow'}`}>
          <div className="w-[72%] h-[72%] rounded-full border-[3px] border-[#788296]/80 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full border-[3px] border-[#667288]/85 flex items-center justify-center">
              <div className="w-[65%] h-[65%] rounded-full border-[2px] border-[#5b667a]/90 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e5e7eb] to-[#4b5563] shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
