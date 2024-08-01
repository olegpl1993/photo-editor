export const getScrollPosition = (
  workspaceRef: React.RefObject<HTMLDivElement>
) => {
  const workspace = workspaceRef.current;
  if (!workspace) return;
  const { scrollTop, scrollLeft, clientHeight, clientWidth } = workspace;
  return {
    left: scrollLeft + clientWidth / 2,
    top: scrollTop + clientHeight - 100,
  };
};
