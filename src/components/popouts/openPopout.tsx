import * as React from "react";
import * as uuid from "uuid";

import { createLayer, LayerSpec, removeLayer, useLayerSubscription } from "../layers/LayersStore";
import { Popout, PopoutProps, PopoutRenderProps } from "./Popout";

export function openPopout(
  render: (props: PopoutRenderProps) => React.ReactNode,
  target: Element,
  options: Omit<PopoutProps, "close" | "render" | "target"> = {},
  name: string = `popout-${uuid.v4()}`,
): string {
  createLayer({
    name,
    render: () => (
      <Popout
        {...options}
        target={target}
        render={(props) => render(props)}
        close={() => removeLayer(name)}
      />
    ),
  });

  return name;
}

export function usePopout(
  render: (props: PopoutRenderProps) => React.ReactNode,
  targetRef: React.RefObject<Element>,
  options: Omit<PopoutProps, "close" | "render" | "target"> = {},
): [() => unknown, boolean, LayerSpec | undefined] {
  const nameRef = React.useRef(`popout-${uuid.v4()}`);

  const open = React.useCallback(() => {
    const target = targetRef.current;
    if (target == null) {
      console.log(
        "[Popout] targetRef was not set. Make sure the given ref is being attached to a DOM element",
      );
      return;
    }
    openPopout(render, target, options, nameRef.current);
  }, [render, targetRef, options]);

  React.useEffect(() => {
    return () => removeLayer(nameRef.current);
  }, []);

  const layer = useLayerSubscription(nameRef.current);
  const isOpen = layer != null;

  return [open, isOpen, layer];
}
