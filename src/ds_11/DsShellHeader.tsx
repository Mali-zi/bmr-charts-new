import React, { memo } from "react";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { Theme } from "@consta/uikit/Theme";
import { L10n, MainToolbarVC, MainToolbar, Profile } from "bi-internal/ui";
import {
  DsStateService,
  useServiceItself,
  useService,
} from "bi-internal/services";
import { urlState } from "bi-internal/core";
import { ThemeToggler } from "@consta/uikit/ThemeToggler";
import { ConstaThemeService } from "../services/ConstaThemeService";
import "./DsShellHeader.scss";

interface IDsShellHeaderProps {
  schema_name: string;
  dsTitle?: string;
  dsDescription?: string;
  dsUrl?: string;
}

const CBreadcrumbs = () => {
  const url = urlState.getModel();
  const dsStateService = useService<DsStateService>(
    DsStateService,
    url.segmentId
  );

  const pages = [
    {
      label: <L10n>datasets</L10n>,
      href: "/#/ds",
    },
    {
      label: dsStateService.datasetTitle,
      href: `/#/${url.segment}/${url.segmentId}`,
    },
    {
      label: dsStateService.dboard.title,
      href: `/#/${url.segment}/${url.segmentId}/${url.route.replace("#", "")}`,
    },
  ];
  return (
    <div className="CBreadcrumbs">
      <Breadcrumbs items={pages} fitMode="scroll" />
    </div>
  );
};

const ThemeTogglerExampleGetters = () => {
  const constaThemeService =
    useServiceItself<ConstaThemeService>(ConstaThemeService);
  const themeModel = constaThemeService.getModel();
  return (
    <Theme preset={themeModel.currentTheme.preset}>
      <ThemeToggler
        className="ThemeToggler"
        items={themeModel.themes}
        value={themeModel.currentTheme}
        getItemKey={(item) => item.key}
        getItemLabel={(item) => item.label}
        getItemIcon={(item) => item.icon}
        onChange={(item) => constaThemeService.setTheme(item)}
        direction="downStartLeft"
      />
    </Theme>
  );
};

const DsShellHeader = memo((props: IDsShellHeaderProps) => {
  const { schema_name } = props;
  const mainToolbar = useService<MainToolbarVC>(MainToolbarVC, schema_name);
  const constaThemeService =
    useServiceItself<ConstaThemeService>(ConstaThemeService);
  const themeModel = constaThemeService.getModel();

  return (
    <Theme preset={themeModel.currentTheme.preset}>
      <div className="ConstaHeader">
        <CBreadcrumbs />
        <div className="rightSectionHeader">
          <section className="toolbar">
            {!mainToolbar.loading && !mainToolbar.error && (
              <MainToolbar {...mainToolbar} />
            )}
          </section>
          <ThemeTogglerExampleGetters />
          <Profile />
        </div>
      </div>
    </Theme>
  );
});

export default DsShellHeader;
