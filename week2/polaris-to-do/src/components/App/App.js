import { AppProvider, Frame } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
// import en from "@shopify/polaris/locales/en.json";
import en from "@shopify/polaris/locales/en.json";
import "../../index.css";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";

function App() {
  const theme = {
    colors: {
      topBar: {
        background: "transparent",
        backgroundLighter: "#F4F6F8",
        backgroundDarker: "#DFE3E8",
        border: "#C4CDD5",
        color: "#212B36",
      },
      secondary: "red",
      primary: "#008060",
      critical: "#D82C0D",
    },

    logo: {
      width: 124,
      topBarSource: "/images/logo.png",
      url: "/",
      accessibilityLabel: "Logo",
    },
  };

  return (
    <AppProvider theme={theme} i18n={en}>
      <Frame topBar={<Header />}>
        <TodoList />
      </Frame>
    </AppProvider>
  );
}
export default App;
