import React, { useState, useEffect } from "react";
import { Column } from "@consta/charts/Column";
import {
  useService,
  KoobFiltersService,
  KoobDataService,
} from "bi-internal/services";
import { ConstaThemeService } from "../services/ConstaThemeService";
import { Theme } from "@consta/uikit/Theme";

interface IItem {
  emp_fio: string;
  sum_year_salary: string;
}

interface IData {
  category: string;
  value: string;
  x: number;
  y: number;
}

const MyColumn = (props) => {
  const { cfg, subspace, dp } = props;
  const [data, setData] = useState<IItem[]>([]);
  const constaThemeServiceModel =
    useService<ConstaThemeService>(ConstaThemeService);
  const koobFiltersServiceModel =
    useService<KoobFiltersService>(KoobFiltersService);

  useEffect(() => {
    dp.getKoobData(subspace).then((rawData: IItem[]) => {
      console.log("rawData: ", rawData);
      console.log("subspace: ", subspace);

      // const newData = subspace.xs.map((x, xIdx) => ({
      //   category: x.id,
      //   x,
      //   y: subspace.ys[0],
      //   value: rawData[0][xIdx],
      // }));
      // console.log("newData: ", newData);
      setData(rawData);
    });
  }, []);

  const onEvent = (chart, event) => {
    console.log("event.data: ", event.type, event.data);

    switch (event.type) {
      case "element:click":
        // Проверяем, есть ли в конфиге дешлета свойство onClickDataPoint, отвечающее
        // в коробке за логику клика на точку по умолчанию
        if (cfg.getRaw().hasOwnProperty("onClickDataPoint")) {
          console.log(
            "onClickDataPoint: ",
            event
          );

          // vcpv - этот объект содержит в себе информацио обо всех сущностях в текущей точке
          const vcpv = {
            m: undefined,
            l: undefined,
            p: undefined,
            z: subspace.zs[0],
            y: subspace.ys[0],
            x: subspace.xs.find((el) => el.id === event.data.data.emp_fio),
            v: event.data.data.sum_year_salary,
          };
          cfg.controller.handleVCPClick(event.event, vcpv);
        }
        // если нет - просто реализована произвольная логика выставления текущего значения дименшна в фильтр
        else {
          console.log(
            "event.data.items[0].data.emp_fio: ",
            event.data.data.emp_fio
          );
          KoobFiltersService.getInstance().setFilters("", {
            emp_fio: ["=", event.data.data.emp_fio],
          });

          // console.log(
          //   "KoobFiltersService.getInstance(): ",
          //   KoobFiltersService.getInstance()._model.filters.emp_fio[1]
          // );
        }
        console.log(event.data);
        break;
    }
  };

  return (
    <Theme preset={constaThemeServiceModel.currentTheme.preset}>
      <Column
        data={data}
        xField={"emp_fio"}
        yField={"sum_year_salary"}
        style={{ width: "100%", height: 280 }}
        onEvent={onEvent}
        renderer={"svg"}
      />
    </Theme>
  );
};

export default MyColumn;
