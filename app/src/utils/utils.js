export const getScale = (buttonWidth, buttonHeight) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw > vh)
    return (`scale(${(vw / buttonWidth?.offsetWidth) * 1.5}) translate(-50%,-50%)`);

  return (`scale(${(vh / buttonHeight?.offsetWidth) * 1.5}) translate(-50%,-50%)`);
};
