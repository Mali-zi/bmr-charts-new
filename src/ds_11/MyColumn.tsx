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
      console.log("rawData: ", rawData);
      console.log("subspace.xs: ", subspace.xs);

      const newData = subspace.xs.map((x, xIdx) => {
        console.log("subspace.ys: ", subspace.ys);

        return {
          category: x.id,
          x,
          y: subspace.ys[0],
          value: rawData[xIdx].sum_year_salary,
        };
      });
      setData(newData);
    });
  }, []);

  return (
    <Theme preset={constaThemeServiceModel.currentTheme.preset}>
      <div>Еще одна диаграмма</div>
      <Column
        data={data}
        xField={"category"}
        yField={"value"}
        style={{ width: "100%", height: 400 }}
      />
    </Theme>
  );
};

export default MyColumn;
