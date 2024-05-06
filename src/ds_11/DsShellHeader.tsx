import React, { memo } from "react";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import {L10n} from 'bi-internal/ui';
import {DsStateService, useServiceItself, useService} from 'bi-internal/services';
import { urlState } from "bi-internal/core";

interface IDsShellHeaderProps {
  schema_name: string;
  dsTitle?: string;
  dsDescription?: string;
  dsUrl?: string;
}

const CBreadcrumbs = () => {
  const url = urlState.getModel();
  const dsStateService = useService<DsStateService>(DsStateService, url.segmentId);

  const pages = [
    {
      label: <L10n>datasets</L10n>,
      href: '/#/ds',
    },
    {
      label: dsStateService.datasetTitle,
      href: `/#/${url.segment}/${url.segmentId}`,
    },
    {
      label: dsStateService.dboard.title,
      href: `/#/${url.segment}/${url.segmentId}/${url.route.replace('#', '')}`,
    },
  ];
  return (
    <div className="CBreadcrumbs">
      <Breadcrumbs items={pages} size="xs" onlyIconRoot />
    </div>
  );
};

function SomeComponent(props: IDsShellHeaderProps) {
  return (
    <Theme preset={presetGpnDefault}>
      <div className="ConstaHeader">
        <CBreadcrumbs />
      <section className="toolbar">
        {props.schema_name}
      </section>
      </div>
    </Theme>
  );
}

const DsShellHeader = memo(SomeComponent);

export default DsShellHeader;
