import * as React from "react";
import { Accent, ThemeContext } from "gdq-design";

export default function usePageAccent(accent: Accent) {
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    theme.setAccent(accent);
  }, [accent]);
}
