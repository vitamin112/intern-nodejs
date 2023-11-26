import {
  Badge,
  Button,
  Card,
  ResourceItem,
  ResourceList,
  Stack,
} from "@shopify/polaris";
import { EnableSelectionMinor } from "@shopify/polaris-icons";
import React, { useState } from "react";
import ModalAdd from "../Modal/Modal";
import "./TodoList.scss";

const initTodoes = [
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
];

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todoes, setTodoes] = useState(initTodoes);

  const resourceName = {
    singular: "todoes",
    plural: "todoes",
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: () => {
        setTodoes((todoes) =>
          todoes.map((item) =>
            selectedItems.includes(item.id)
              ? { ...item, isComplete: true }
              : item
          )
        );
        setSelectedItems([]);
      },
    },
    {
      content: "Delete",
      onAction: () => {
        setTodoes((todoes) =>
          todoes.filter((item) =>
            selectedItems.includes(item.id) ? false : true
          )
        );
        setSelectedItems([]);
      },
    },
  ];

  const handleComplete = (id) => {
    setTodoes(
      todoes.map((item) =>
        item.id === id ? { ...item, isComplete: true } : item
      )
    );
  };

  const handleRemove = (id) => {
    setTodoes(todoes.filter((item) => item.id !== id));
  };

  const selectAllBtnMarkup = (
    <Button
      onClick={() => setSelectedItems(todoes.map((item) => item.id))}
      icon={EnableSelectionMinor}
    >
      Select
    </Button>
  );

  function renderItem(item, _, index) {
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
                <Button
                  disabled={isComplete}
                  onClick={() => handleComplete(id)}
                >
                  Complete
                </Button>
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

  return (
    <Card>
      <div className="todoList">
        <Stack alignment="center" distribution="equalSpacing">
          <p className="title">Todoes</p>
          <Button primary onClick={() => setIsOpenModal(true)}>
            Create todo
          </Button>
        </Stack>

        <ResourceList
          resourceName={resourceName}
          items={todoes}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          resolveItemId={resolveItemIds}
          alternateTool={selectAllBtnMarkup}
        />
      </div>

      <ModalAdd
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        todoes={todoes}
        setTodoes={setTodoes}
      />
    </Card>
  );
}

export default TodoList;
