import * as React from "react";

import { useLayersStore } from "./LayersStore";

export function Layers() {
  const activeLayers = useLayersStore((state) => state.layers);

  return (
    <>
      {activeLayers.map(({ name, render }) => (
        <React.Fragment key={name}>{render()}</React.Fragment>
      ))}
    </>
  );
}
