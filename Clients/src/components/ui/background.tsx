"use client";

import { JSX, useEffect, useMemo, useState } from "react";

const Background = () => {
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);

  // ✅ Explicit typing so TS knows it's a number-indexed object
  const activeDivs = useMemo<Record<number, Set<number>>>(
    () => ({
      0: new Set([4, 1]),
      2: new Set([3]),
      4: new Set([2, 5, 8]),
      5: new Set([4]),
      6: new Set([0]),
      7: new Set([1]),
      10: new Set([3]),
      12: new Set([7]),
      13: new Set([2, 4]),
      14: new Set([1, 5]),
      15: new Set([3, 6]),
    }),
    []
  );

  useEffect(() => {
    const updateBlocks = () => {
      const { innerWidth, innerHeight } = window;
      const blockSize = innerWidth * 0.06;
      const amountOfBlocks = Math.ceil(innerHeight / blockSize);

      const newBlocks = Array.from({ length: 17 }, (_, columnIndex) => (
        <div key={columnIndex} className="w-[6vw] h-full">
          {Array.from({ length: amountOfBlocks }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className={`h-[6vw] w-full border-[1px] dark:border-[rgba(255,255,255,0.015)] border-gray-50 ${
                activeDivs[columnIndex]?.has(rowIndex)
                  ? "dark:bg-[rgba(51,76,236,0.05)] bg-[rgba(51,76,236,0.03)]"
                  : ""
              }`}
              style={{ height: `${blockSize}px` }}
            ></div>
          ))}
        </div>
      ));
      setBlocks(newBlocks);
    };

    updateBlocks();
    window.addEventListener("resize", updateBlocks);
    return () => window.removeEventListener("resize", updateBlocks);
  }, [activeDivs]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      {/* grid dots */}
      <div className="absolute inset-0 h-full w-full dark:bg-[radial-gradient(#1d1d1d_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* gradient overlay */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t dark:from-[#050505] from-white from-0% to-transparent to-60%"></div>
      {/* animated blocks */}
      <div className="flex h-full w-full overflow-hidden absolute inset-0">
        {blocks}
      </div>
    </div>
  );
};

export default Background;
