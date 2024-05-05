import React, { memo } from "react";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

interface IDsShellHeaderProps {
  schema_name: string;
  dsTitle?: string;
  dsDescription?: string;
  dsUrl?: string;
}

const CBreadcrumbs = () => {
  return (
    <div className="CBreadcrumbs">
      {/* <Breadcrumbs items={pages} size="xs" onlyIconRoot /> */}
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
