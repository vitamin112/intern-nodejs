import { AppProvider, Frame } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import en from "@shopify/polaris/locales/en.json";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";

function App() {
  return (
    <AppProvider i18n={en}>
      <Frame>
        <Header />
        <TodoList />
      </Frame>
    </AppProvider>
  );
}
export default App;
