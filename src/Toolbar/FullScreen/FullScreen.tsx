import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const fullScreenChanger = (isFullScreen: boolean) => {
  if (isFullScreen && !document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
  if (!isFullScreen && document.fullscreenElement) {
    document.exitFullscreen();
  }
};

const FullScreen = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );

  useEffect(() => {
    fullScreenChanger(isFullScreen);
  }, [isFullScreen]);

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
