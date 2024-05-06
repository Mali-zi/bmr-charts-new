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
    dp.getMatrixYX(subspace).then((rawData) => {
      const newData = subspace.xs.map((x, xIdx) => ({
        category: x.id,
        x,
        y: subspace.ys[0],
        value: rawData[0][xIdx],
      }));
      setData(newData);
    });
  }, []);

  return (
    <Theme preset={constaThemeServiceModel.currentTheme.preset}>
      <Column data={data} xField={"category"} yField={"value"} />
    </Theme>
  );
};

export default MyColumn;
