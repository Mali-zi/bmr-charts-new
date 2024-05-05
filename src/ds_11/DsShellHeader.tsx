import React, { memo } from "react";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import {L10n} from 'bi-internal/ui';

interface IDsShellHeaderProps {
  schema_name: string;
  dsTitle?: string;
  dsDescription?: string;
  dsUrl?: string;
}

const CBreadcrumbs = () => {
  const pages = [
    {
      label: <L10n>datasets</L10n>,
      href: '/#/ds',
    },
    {
      label: 'Страница 1',
      href: 'https://url.com/page-1',
    },
    {
      label: 'Страница 2',
      href: 'https://url.com/page-2',
    },
    {
      label: 'Страница 3',
      href: 'https://url.com/page-3',
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
