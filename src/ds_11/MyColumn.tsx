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
}

const MyColumn = (props) => {
  const { cfg, subspace, dp } = props;
  const [data, setData] = useState<IData[]>([]);
  const constaThemeServiceModel =
    useService<ConstaThemeService>(ConstaThemeService);

  useEffect(() => {
    dp.getKoobData(subspace).then((rawData: IItem[]) => {
      console.log("rawData: ", rawData);

      const newData = rawData.map((item) => ({
        category: item.emp_fio,
        value: item.sum_year_salary,
      }));
      console.log("newData: ", newData);

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
