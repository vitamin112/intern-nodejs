import {
  Badge,
  Button,
  Card,
  Modal,
  ResourceItem,
  ResourceList,
  Stack,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import "./TodoList.scss";

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");
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
      onAction: () =>
        setItems(
          items.map((item) => {
            if (selectedItems.includes(item.id)) {
              item.isComplete = true;
              return item;
            }

            return item;
          })
        ),
    },
    {
      content: "Removed",
      onAction: () => {
        setItems((items) =>
          items.filter((item) =>
            selectedItems.includes(item.id) ? false : true
          )
        );
        setSelectedItems([]);
        console.log(selectedItems);
      },
    },
  ];

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isComplete: true } : item
      )
    );
  };

  const handleAdd = (value) => {
    setItems([
      ...items,
      {
        todo: value,
        isComplete: false,
        id: Math.floor(Math.random() * 10000 + 0),
      },
    ]);
    setNewTodo("");
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  function renderItem(item, _, index) {
    console.log(item, _, index);
    const { id, todo, isComplete } = item;

    return (
      <ResourceItem id={id} sortOrder={index}>
        <Stack distribution={"equalSpacing"}>
          <Stack.Item>{todo}</Stack.Item>

          <Stack.Item>
            <Stack alignment={"center"} distribution={"center"}>
              <Stack.Item>
                {isComplete ? (
                  <Badge status="info">Done</Badge>
                ) : (
                  <Badge>Pending</Badge>
                )}
              </Stack.Item>
              <Stack.Item>
                <Button onClick={() => handleComplete(id)}>Complete</Button>
              </Stack.Item>
              <Stack.Item>
                <Button destructive onClick={() => handleRemove(id)}>
                  Delete
                </Button>
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

  const modalFooterMakeup = () => {
    return (
      <Stack distribution="trailing">
        <Button>Cancel</Button>
        <Button
          primary
          onClick={() => {
            handleAdd(newTodo);
            setIsOpenModal(false);
          }}
        >
          Create
        </Button>
      </Stack>
    );
  };

  return (
    <Card>
      <div className="todoList">
        <Stack alignment="center" distribution="equalSpacing">
          <p className="title">Todoes</p>
          <Button id="createBtn" onClick={() => setIsOpenModal(true)}>
            Create todo
          </Button>
        </Stack>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          resolveItemId={resolveItemIds}
        />
      </div>

      <Modal
        title={"Create a new todo"}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        footer={modalFooterMakeup()}
      >
        <Modal.Section>
          <TextField
            value={newTodo}
            onChange={(value) => setNewTodo(value)}
          ></TextField>
        </Modal.Section>
      </Modal>
    </Card>
  );
}

export default TodoList;
