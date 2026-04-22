export const PROTOTYPE_DESKTOP_LAYOUT_BREAKPOINT = 1200;

export const shouldUsePrototypeDesktopLayout = (windowWidth: number) =>
  windowWidth >= PROTOTYPE_DESKTOP_LAYOUT_BREAKPOINT;
