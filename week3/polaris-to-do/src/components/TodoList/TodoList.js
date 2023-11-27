import {
  Badge,
  Button,
  Card,
  Page,
  ResourceItem,
  ResourceList,
  Stack,
} from "@shopify/polaris";
import { EnableSelectionMinor } from "@shopify/polaris-icons";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import React, { useState } from "react";
import { app } from "../../configs/dbConfig";
import useModal from "../../hooks/modal/useModal";
import ModalAdd from "../Modal/Modal";
import "./TodoList.scss";

const db = getFirestore(app);
const productsCol = collection(db, "todoes");

async function getData(db) {
  const productSnapshot = await getDocs(productsCol);

  return productSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
}

const initTodoes = await getData(db);

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [todoes, setTodoes] = useState(initTodoes);
  const [isOpen, setIsOpen] = useState(false);

  const { modal, openModal } = useModal({
    items: todoes,
    setOpen: setIsOpen,
    open: isOpen,
    setItems: setTodoes,
    title: "Create a new todo",
    content: <ModalAdd item={todoes} setItem={setTodoes} cb={setIsOpen} />,
  });

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

  const handleComplete = async (id) => {
    setTodoes(
      todoes.map((item) =>
        item.id === id ? { ...item, isComplete: true } : item
      )
    );
  };

  const handleRemove = async (id) => {
    setTodoes(todoes.filter((item) => (item.id !== id ? true : false)));
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
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create todo",
        onAction: () => {
          openModal();
        },
      }}
    >
      <Card>
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
      </Card>
      {modal}
    </Page>
  );
}

export default TodoList;
