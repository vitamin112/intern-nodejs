import {
  Badge,
  Button,
  Card,
  ResourceItem,
  ResourceList,
  Stack,
} from "@shopify/polaris";
import { useState } from "react";
import "./TodoList.scss";

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([
    {
      id: 111,
      todo: "Note Why Each To-Do on Your List Is Important.",
      isComplete: false,
    },
    {
      id: 211,
      todo: "Delete Low/No-Value Tasks and Nice-To-Dos",
      isComplete: true,
    },
    {
      id: 311,
      todo: "Create a To-Do List for Each Week or Each Day",
      isComplete: false,
    },
    {
      id: 411,
      todo: "Break Large To-Dos Down Into Smaller To-Dos",
      isComplete: false,
    },
    {
      id: 511,
      todo: "Write a “What I'll Probably Do” List.",
      isComplete: false,
    },
    {
      id: 611,
      todo: "Make Your To-Do List Public.",
      isComplete: false,
    },
  ]);

  const resourceName = {
    singular: "todoes",
    plural: "todoes",
  };

  const promotedBulkActions = [
    {
      content: "Completed",
      onAction: () => console.log("Todo: implement bulk completed"),
    },
    {
      content: "Removed",
      onAction: () => console.log("Todo: implement bulk remove"),
    },
  ];

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isComplete: true } : item
      )
    );
  };

  const handleAdd = (item) => {
    setItems([...items, item]);
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  function renderItem(item, _, index) {
    const { id, todo, isComplete } = item;
    return (
      <ResourceItem id={id} sortOrder={index}>
        <Stack alignment={"center"} distribution={"equalSpacing"}>
          <Stack.Item>{todo}</Stack.Item>

          <Stack.Item>
            <Stack alignment={"center"}>
              <Stack.Item>
                {isComplete ? (
                  <Badge status="info">Done</Badge>
                ) : (
                  <Badge>Pending</Badge>
                )}
              </Stack.Item>
              <Stack.Item>
                <Button onClick={() => handleRemove(id)}>Cancel</Button>
              </Stack.Item>
              <Stack.Item>
                <Button onClick={() => handleComplete(id)}>Save</Button>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    );
  }

  function resolveItemIds({ id }) {
    return id;
  }

  return (
    <div className="todoList">
      <Card>
        <p className="title">Todoes</p>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          resolveItemId={resolveItemIds}
          showHeader={true}
        />
      </Card>
    </div>
  );
}

export default TodoList;
