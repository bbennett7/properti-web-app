const isMobile = window.innerWidth < 501;
const isTablet = window.innerWidth > 500 && window.innerWidth < 1201;
const isDesktop = window.innerWidth > 1200;

export default {
  isMobile,
  isTablet,
  isDesktop
};
