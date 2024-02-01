export const loadImg = (
  setFile: (file: File | null) => void,
  setLoadSpinner: (loadSpinner: boolean) => void
) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";

  const changeLoadEvent = async (event: Event) => {
    const loadEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
    const file = loadEvent.target?.files?.[0];
    if (!file) return;
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setFile(file);
        resolve();
      }, 10);
    });
  };

  input.addEventListener("change", changeLoadEvent);
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};
