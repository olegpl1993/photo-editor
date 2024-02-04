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
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0;

  const [targetPosition, setTargetPosition] = useState(
    getPosition(workspaceRef)
  );

  useEffect(() => {
    if (!workspaceRef.current) return;
    const handleScroll = () => setTargetPosition(getPosition(workspaceRef));
    workspaceRef.current?.addEventListener("scroll", handleScroll);
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
        minWidth: 40 / zoom,
        minHeight: 40 / zoom,
        color: primaryColor,
        borderRadius: "50%",
        transform: `translate(-50%, -50%) scale(${zoom})`,
      }}
    />
  );
});

export default Scroller;
