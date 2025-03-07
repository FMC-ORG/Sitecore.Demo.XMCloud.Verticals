import { Share2 } from 'lucide-react';

export default function Default() {
  return (
    <div className="container">
      <div className=" mx-auto bg-white shadow-sm rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image section - takes full width on mobile, half width on desktop */}
        <div className="md:w-1/2">
          <img
            src="https://a.espncdn.com/photo/2025/0302/r1458734_1296x518_5-2.jpg"
            alt="Football players in training"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          {/* Red line at the top */}
          <div className="w-12 h-1 bg-red-600 mb-4"></div>

          {/* Headline */}
          <h2 className="text-2xl font-bold uppercase leading-tight mb-3 text-black">
            AMORIM EXPLAINS SMALLER SQUAD SELECTION
          </h2>

          {/* Subheading/Description */}
          <p className="text-[#333333] mb-6">
            The boss wants to protect the club's youngsters, which is why only 18 players have
            travelled to Spain.
          </p>

          {/* Footer with time, category and share button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2 text-sm text-[#666666]">
              <span>21 h</span>
              <span>|</span>
              <span>news</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-[#444444]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

