/* eslint-disable react/prop-types */
import { ConfigProvider } from "antd";
import { mainTheme } from "../../utils/antTheme";

export default function ThemeProvider({ children }) {
  return (
    <>
      <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
    </>
  );
}
