const InteractiveCursorCard = ({ isHovered, followerRef, horizLineRef, vertLineRef, data }) => {
    if (!isHovered) return null;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Horizontal Dotted Line */}
            <div
                ref={horizLineRef}
                className="absolute top-0 left-0 w-full will-change-transform"
            >
                {/* Horizontal Dotted Line */}
                <div className="w-full border-b border-dashed border-neutral-400" />

                {/* Title Label (Positioned on the Left above the Line) */}
                <div className="absolute left-6 bottom-1 text-[15px] tracking-widest uppercase select-none">
                    {data?.title}
                </div>
            </div>

            {/* Vertical Dotted Line */}
            <div
                ref={vertLineRef}
                className="absolute top-0 h-full border-r border-dashed border-neutral-400 transition-all duration-75 ease-out"
            />


            {/* Moving Content Container (Image + Tagline) */}
            <div
                ref={followerRef}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-200 ease-out"
            >
                {/* Center Image Frame */}
                <div className="w-56 h-36 bg-black overflow-hidden rounded ">
                    <img
                        src={data.image}
                        alt={data.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 transition-all duration-300"
                    />
                </div>

                {/* Tagline Label (Positioned directly below the image frame) */}
                <span className="mt-2 text-[15px] tracking-wider px-2 py-0.6 rounded">
                    {data.tagline}
                </span>
            </div>
        </div>
    );
};

export default InteractiveCursorCard;