import CursorGrid from './CursorGrid';

const Vision = () => {
  return (
    <div className="w-full py-16! md:py-24! md:px-8! px-4! bg-black relative">

      <div className="w-full h-full absolute top-0 left-0 z-0">
        <CursorGrid
          cellSize={70}
          color="#D946EF"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={1}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>


      <div className="md:w-[45%] md:mb-30! mb-20! pointer-events-none">
        <h2 className="md:text-4xl text-2xl text-white md:leading-13 relative z-1"><span className="w-5 h-5 inline-block md:mb-1! md:mr-5! bg-white rounded-full"></span> BUILDING WITH PURPOSE, CREATING FOR WHAT COMES NEXT</h2>
      </div>

      <div className="flex flex-col w-full gap-4 pointer-events-none">

        <div className="flex flex-row justify-between">
          <h3 className="text-white w-[48%] border-t border-[#8888888c] py-4! relative z-1">MISSION</h3>
          <p className="text-[#999] w-[48%] text-[14px] text-end border-t border-[#8888888c] py-4! relative z-1">Meaningful Solutions</p>
        </div>
        <div className="flex flex-row justify-between">
          <h3 className="text-white w-[48%] border-t border-[#8888888c] py-4! relative z-1">Vision</h3>
          <p className="text-[#999] w-[48%] text-[14px] text-end border-t border-[#8888888c] py-4! relative z-1">Future Products</p>
        </div>
        <div className="flex flex-row justify-between">
          <h3 className="text-white w-[48%] border-t border-[#8888888c] py-4! relative z-1">Purpose</h3>
          <p className="text-[#999] w-[48%] text-[14px] text-end border-t border-[#8888888c] py-4! relative z-1">Digital Impact</p>
        </div>
      </div>
    </div>
  )
}

export default Vision