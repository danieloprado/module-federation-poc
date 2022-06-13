import createTheme from '@eduzz/houston-styles/createTheme';

const variables = {};

const theme = createTheme('orbita', variables);

declare module '@eduzz/houston-styles' {
  type Variables = typeof variables;
  interface IHoustonThemeCustomVariables extends Variables {}
}

export default theme;
