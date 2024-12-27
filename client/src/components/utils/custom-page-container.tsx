import { PageContainer, PageContainerProps, PageHeader } from "@toolpad/core";
import React from "react";

export default function CustomPageContainer(
  props: PageContainerProps & {
    addHeader?: boolean;
  }
) {
  const { slots, slotProps, ...rest } = props;
  /// don't bring deps here
  const header = React.useCallback(() => {
    return <PageHeader {...rest} slots={{ toolbar: slots!.header }} />;
  }, [slots?.header]);
  if (props.addHeader === true && props.slots) {
    return <PageContainer slots={{ header }} children={rest.children} />;
  }
  return <PageContainer {...props} />;
}
