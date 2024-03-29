import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");

  useEffect(() => {
    if (isFullScreen && !document.fullscreenElement)
      document.documentElement.requestFullscreen();
    if (!isFullScreen && document.fullscreenElement) document.exitFullscreen();
  }, [isFullScreen]);

  useEffect(() => {
    const fullScreenChange = () =>
      setIsFullScreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", fullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", fullScreenChange);
    };
  }, []);

  return (
    <IconButton
      title="Full screen"
      sx={{
        height: "50px",
        width: "50px",
        border: `2px solid ${primaryColor}`,
        borderRadius: "50%",
        color: primaryColor,
      }}
      onClick={() => setIsFullScreen(!isFullScreen)}
    >
      {isFullScreen ? (
        <FullscreenExitIcon fontSize="large" />
      ) : (
        <FullscreenIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default FullScreen;
