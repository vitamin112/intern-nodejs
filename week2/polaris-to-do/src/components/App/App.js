import { AppProvider, Frame } from "@shopify/polaris";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";

function App() {
  return (
    <AppProvider>
      <Frame>
        <Header />
        <TodoList />
      </Frame>
    </AppProvider>
  );
}
export default App;
