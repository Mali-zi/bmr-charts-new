import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./MyComponent.scss";

export default function MyComponent(props) {
  const { cfg, subspace, dp } = props;
  const [data, setData] = useState<any>([]);
  const containerRef = useRef(null);
  let chart = null;
  let options = {};

  const onChartClick = (params) => {
    if (cfg.getRaw().hasOwnProperty("onClickDataPoint")) {
      const vcpv = {
        m: undefined,
        l: undefined,
        p: undefined,
        z: params.data.z,
        y: params.data.y,
        x: params.data.x,
        v: params.value,
      };
      cfg.controller.handleVCPClick(params.event, vcpv);
    }
  };

  const renderChart = (dataArr) => {
    if (containerRef?.current && dataArr?.length) {
      if (!chart) {
        chart = echarts.init(containerRef.current, null, { renderer: "svg" });
        options = {
          title: {
            show: false,
          },
          xAxis: {
            type: "category",
            data: subspace.xs.map((x) => x.title),
          },
          yAxis: {
            type: "value",
          },
          legend: {
            show: true,
            data: subspace.ys.map((y, yIndex) => {
              return {
                name: y.title,
                icon: "circle",
                itemStyle: {
                  // контроллер, который получает информацию о цвете автоматически, исходя из контекста
                  color: cfg.getColor(y, null, yIndex),
                },
              };
            }),
          },
          series: subspace.ys.map((y, yIndex) => ({
            data: subspace.xs.map((x, xIndex) => ({
              name: x.title,
              itemStyle: {
                // контроллер, который получает информацию о цвете автоматически, исходя из контекста
                color: cfg.getColor(y, null, yIndex),
              },
              value: dataArr[yIndex][xIndex],
              x,
              y,
              z: subspace.zs[0],
            })),
            name: y.title,
            type: "bar",
            showBackground: true,
          })),
          tooltip: {
            trigger: "item",
            show: true,
            appendToBody: true,
          },
        };
        chart.setOption(options);
        chart.resize();
        chart.on("click", "series", onChartClick);
      }
    }
  };

  useEffect(() => {
    // Получаем полное декартово произведение для указанного конфига в дешлете
    // ожидаем матрицу [subspace.ys.length][subspace.xs.length]
    dp.getMatrixYX(subspace).then((dataArr) => {
      console.log("cfg: ", cfg);
      console.log("subspace: ", subspace);
      console.log("dp: ", dp);
      console.log("dataArr: ", dataArr);
      renderChart(dataArr);
    });
  }, []);

  return (
    <div className="MyComponent">
      Новая диаграмма
      <div className="MyComponent__graphic" ref={containerRef}></div>
    </div>
  );
}
