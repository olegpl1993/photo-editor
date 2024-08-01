import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import appState from "../../store/appState";
import { getScrollPosition } from "./Scroller.utils";

interface Props {
  workspaceRef: React.RefObject<HTMLDivElement>;
}
const Scroller = observer((props: Props) => {
  const { workspaceRef } = props;
  const { zoom } = appState;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0;

  const scrollerBaseSize = 50;
  const scrollerSize = scrollerBaseSize / zoom;

  const [targetPosition, setTargetPosition] = useState(
    getScrollPosition(workspaceRef)
  );

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const handleScroll = () => {
      setIsScrolling(true);
      setTargetPosition(getScrollPosition(workspaceRef));
    };

    workspaceRef.current?.addEventListener("scroll", handleScroll);
    workspaceRef.current?.addEventListener("scrollend", () =>
      setIsScrolling(false)
    );

    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [workspaceRef]);

  return (
    <ControlCameraIcon
      style={{
        display: isTouchDevice ? "block" : "none",
        position: "absolute",
        ...targetPosition,
        minWidth: scrollerSize,
        minHeight: scrollerSize,
        color: isScrolling ? "transparent" : "var(--spinner-color)",
        borderRadius: "50%",
        transform: `translate(-50%, -50%) scale(${zoom})`,
      }}
    />
  );
});

export default Scroller;
