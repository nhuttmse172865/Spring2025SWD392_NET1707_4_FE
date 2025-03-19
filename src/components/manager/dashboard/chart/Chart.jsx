import React, { useEffect, useMemo, useRef, useState } from "react";
import DASHBOARD from "../../../../constants/dashboard";
import findClosestNumber from "../../../../helpers/CaculateClosestNumber";
import CALENDAR from "../../../../constants/calendar";

const Chart = () => {
  const svgRef = useRef(null);
  const [path, setPath] = useState();
  const [dataPoints, setDataPoints] = useState();
  const [gradientPath, setGradientPath] = useState();
  const [lineCurrent, setLineCurrent] = useState();
  const [leftChart, setLeftChart] = useState();
  const [spaceX, setSpaceX] = useState();
  const [arrayX, setArrayX] = useState();
  const [revenueX, setRevenueX] = useState();
  const [revenueY, setRevenueY] = useState();
  const [indexArrayHover, setIndexArrayHover] = useState();
  const [pointsChart, setPointChart] = useState();
  const [arrayVertical, setArrayVertical] = useState(CALENDAR.WEEK);

  const [statusActive, setStatusActive] = useState(
    DASHBOARD.STATUS_CHART.WEEKLY
  );
  const [activeChooseStatus, setActiveChooseStatus] = useState(false);

  const revenueData = [10, 1, 1, 1, 2, 2, 10];

  const handleMouseMove = (event) => {
    const xPosition = event.clientX - leftChart;
    if (!arrayX) {
    }
    const closestNumber = findClosestNumber(xPosition, arrayX);

    const index = arrayX.indexOf(closestNumber);
    if (index > pointsChart.length - 1) {
      setIndexArrayHover(pointsChart.length - 1);
    } else {
      setIndexArrayHover(index);
    }
  };

  const handleChangeStatus = (item) => {
    setStatusActive(item);
    switch (item) {
      case DASHBOARD.STATUS_CHART.WEEKLY:
        setArrayVertical(CALENDAR.WEEK);
        break;
      case DASHBOARD.STATUS_CHART.MONTHLY:
        setArrayVertical(DASHBOARD.LIST_MONTH);
        break;
      case DASHBOARD.STATUS_CHART.YEARLY:
        setArrayVertical(DASHBOARD.LIST_YEAR);
        break;
    }
  };

  useEffect(() => {
    if (pointsChart) {
      let point;
      if (!indexArrayHover && indexArrayHover !== 0) {
        point = pointsChart[pointsChart.length - 1];
      } else {
        point = pointsChart[indexArrayHover];
      }
      if (point === pointsChart[pointsChart.length - 1]) {
        setRevenueX(point.x - 100);
        setRevenueY(point.y);
      } else {
        setRevenueX(point?.x);
        setRevenueY(point?.y);
      }
    }
  }, [indexArrayHover, pointsChart]);

  useEffect(() => {
    const svg = svgRef.current;
    const padding = 20;
    const height = svg.clientHeight - 2 * padding;
    const width = svg.clientWidth - 2 * padding;

    const rect = svg.getBoundingClientRect();
    setLeftChart(rect.left);

    const maxRevenue = Math.max(...revenueData) + Math.max(...revenueData) / 2;
    const gapX = width / (arrayVertical.length - 1);
    setSpaceX(gapX);
    const arrayX = Array.from(
      { length: arrayVertical.length },
      (_, i) => 0 + i * gapX
    );
    setArrayX(arrayX);
    const points = revenueData.map((revenue, index) => {
      const x = padding + index * gapX;
      const y = padding + Math.abs(height - (height * revenue) / maxRevenue);
      return { x, y };
    });
    setPointChart(points);

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const xMid = (points[i].x + points[i + 1].x) / 2;
      const yMid = (points[i].y + points[i + 1].y) / 2;
      const cpX1 = (xMid + points[i].x) / 2;
      const cpX2 = (xMid + points[i + 1].x) / 2;
      pathD += ` Q ${cpX1} ${points[i].y}, ${xMid} ${yMid}`;
      pathD += ` Q ${cpX2} ${points[i + 1].y}, ${points[i + 1].x} ${
        points[i + 1].y
      }`;
    }
    setPath(pathD);

    let gradientPathD = `M ${points[0].x} ${points[0].y}`;
    gradientPathD += pathD.substring(1);
    for (let i = points.length - 1; i >= 0; i--) {
      gradientPathD += `L ${points[i].x} ${height + 2 * padding}`;
    }
    gradientPathD += `Z`;

    setGradientPath(gradientPathD);

    const dataPoints = [
      <circle
        key={points.length - 1}
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="6"
        fill="rgba(255, 79, 157, 0.5)"
        className="cursor-pointer data-point-animation"
      />,
      <circle
        key={points.length - 1}
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="4"
        fill="#FF60A7"
        className="cursor-pointer relative z-40"
      />,
    ];

    const lineCurrent = (
      <line
        x1={points[points.length - 1].x}
        y1="20"
        x2={points[points.length - 1].x}
        y2={height + padding}
        strokeWidth="2"
        stroke="#FF60A7"
      />
    );
    setLineCurrent(lineCurrent);
    setDataPoints(dataPoints);
  }, [arrayVertical]);

  return (
    <div className="col-span-7 bg-white rounded-[.375rem] p-5 relative h-[400px] flex flex-col">
      <div className="flex justify-between">
        <h6 className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Revenue Overview
        </h6>
        <div
          className="px-3.5 min-w-[80px] cursor-pointer relative bg-(--color-primary-80) rounded-[.375rem] flex justify-center items-center"
          onClick={() => setActiveChooseStatus((prev) => !prev)}
        >
          <span className="text-[14px] text-white">
            {statusActive && statusActive}
          </span>
          {activeChooseStatus && (
            <ul className="absolute border-input-form-login w-full left-0 top-[100%] px-3.5 bg-white mt-1 z-[500]">
              {Object.values(DASHBOARD.STATUS_CHART).map((item) => (
                <li
                  onClick={() => handleChangeStatus(item)}
                  className="text-[14px] text-[rgba(0,0,0,0.5)] py-1 hover:text-(--color-primary-100)"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div
        className="mt-2 flex relative flex-col"
        style={{ height: "calc(100% - 35px)" }}
      >
        <svg
          ref={svgRef}
          style={{
            height: "calc(100% - 30px)",
          }}
          className=" mb-4 cursor-pointer"
          onMouseMove={(event) => handleMouseMove(event)}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF60A7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF60A7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={path && path} fill="none" stroke="#FF60A7" strokeWidth="2" />
          <path d={gradientPath && gradientPath} fill="url(#areaGradient)" />
          {lineCurrent && lineCurrent}
          {dataPoints && dataPoints}
        </svg>
        <div
          className="absolute z-50 border-input-form-login min-w-[100px] p-2 bg-white ease-linear duration-300"
          style={{
            left: revenueX,
            top: revenueY,
            transform: "translateY(-100%)",
          }}
        >
          <h6 className="text-[13px] text-[rgba(0,0,0,0.5)]">
            {arrayVertical && arrayVertical[indexArrayHover]}
          </h6>
          <span className="text-[14px] text-(--color-primary-100)">
            {revenueData[indexArrayHover]}$
          </span>
        </div>
        <div className="flex justify-between px-5">
          {arrayVertical &&
            arrayVertical.map((item, index) => (
              <>
                {
                  <div className="w-0 text-[15px] text-[rgba(0,0,0,0.5)] relative">
                    <span className="absolute text-[13px] text-[rgba(0,0,0,0.5)] translate-x-[-50%]">
                      {index % 2 === 0 ? item : null}
                    </span>
                  </div>
                }
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
