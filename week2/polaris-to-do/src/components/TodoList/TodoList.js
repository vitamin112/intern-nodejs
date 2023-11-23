import { Card, ResourceItem, ResourceList } from "@shopify/polaris";
import { useState } from "react";

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const items = [
    {
      id: "111",
      url: "#",
      name: "Mae Jemison",
      location: "Decatur, USA",
    },
    {
      id: "211",
      url: "#",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
    },
    {
      id: "311",
      url: "#",
      name: "Joe Smith",
      location: "Arizona, USA",
    },
    {
      id: "411",
      url: "#",
      name: "Haden Jerado",
      location: "Decatur, USA",
    },
    {
      id: "511",
      url: "#",
      name: "Tom Thommas",
      location: "Florida, USA",
    },
    {
      id: "611",
      url: "#",
      name: "Emily Amrak",
      location: "Texas, USA",
    },
  ];
  const promotedBulkActions = [
    {
      content: "Item selected " + selectedItems.length,
      onAction: () => setSelectedItems([]),
    },
  ];

  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        totalItemsCount={selectedItems.length}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        resolveItemId={resolveItemIds}
      />
    </Card>
  );

  function renderItem(item, _, index) {
    const { id, url, name } = item;

    return (
      <ResourceItem
        id={id}
        url={url}
        sortOrder={index}
        accessibilityLabel={`View details for ${name}`}
      >
        <div>{name}</div>
      </ResourceItem>
    );
  }

  function resolveItemIds({ id }) {
    return id;
  }
}

export default TodoList;
