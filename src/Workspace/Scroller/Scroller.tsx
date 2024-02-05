import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import appState from "../../store/appState";

interface Props {
  workspaceRef: React.RefObject<HTMLDivElement>;
}

const getPosition = (workspaceRef: React.RefObject<HTMLDivElement>) => {
  const workspace = workspaceRef.current;
  if (!workspace) return;
  const { scrollTop, scrollLeft, clientHeight, clientWidth } = workspace;
  return {
    left: scrollLeft + clientWidth / 2,
    top: scrollTop + clientHeight - 100,
  };
};

const Scroller = observer((props: Props) => {
  const { workspaceRef } = props;
  const { zoom } = appState;
  const rootStyles = getComputedStyle(document.documentElement);
  const scrollerColor = rootStyles.getPropertyValue("--spinner-color");
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0;

  const scrollerBaseSize = 50;
  const scrollerSize = scrollerBaseSize / zoom;

  const [targetPosition, setTargetPosition] = useState(
    getPosition(workspaceRef)
  );

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const handleScroll = () => {
      setIsScrolling(true);
      setTargetPosition(getPosition(workspaceRef));
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
        color: isScrolling ? "transparent" : scrollerColor,
        borderRadius: "50%",
        transform: `translate(-50%, -50%) scale(${zoom})`,
      }}
    />
  );
});

export default Scroller;
