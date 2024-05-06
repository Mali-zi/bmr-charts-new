import React, { useState, useEffect } from "react";
import { Column } from "@consta/charts/Column";
import {
  useService,
  KoobFiltersService,
  KoobDataService,
} from "bi-internal/services";
import { ConstaThemeService } from "../services/ConstaThemeService";
import { Theme } from "@consta/uikit/Theme";

const MyColumn = (props) => {
  const { cfg, subspace, dp } = props;
  const [data, setData] = useState([]);
  const constaThemeServiceModel =
    useService<ConstaThemeService>(ConstaThemeService);

  useEffect(() => {
    dp.getKoobData(subspace).then((rawData) => {
      console.log('rawData: ', rawData);
      const newData = subspace.xs.map((x, xIdx) => ({
        category: x.id,
        x,
        y: subspace.ys[0],
        value: rawData[0][xIdx],
      }));
      setData(newData);
    });
  }, []);

  const dataSimple = [
    { parameter: 'Параметр 1', number: 1234 },
    { parameter: 'Параметр 2', number: 1083 },
    { parameter: 'Параметр 3', number: 672 },
    { parameter: 'Параметр 4', number: 301 },
    { parameter: 'Параметр 5', number: 167 },
  ];

  return (
    <Theme preset={constaThemeServiceModel.currentTheme.preset}>
      <div>Еще одна диаграмма</div>
      <Column
      style={{ maxWidth: 500, maxHeight: 200 }}
      data={dataSimple}
      xField="parameter"
      yField="number"
    />
      {/* <Column data={data} xField={"category"} yField={"value"} /> */}
    </Theme>
  );
};

export default MyColumn;
