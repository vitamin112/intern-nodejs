import {useStore} from '@assets/reducers/storeReducer';
import {Button, Layout, Page, ResourceList, Stack} from '@shopify/polaris';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {dispatch} = useStore();
  const items = Array.from({length: 15}, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`
  }));

  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'product',
    plural: 'products'
  };

  const renderItem = item => (
    <ResourceList.Item id={item.id} accessibilityLabel={`View details for ${item.name}`}>
      <Stack distribution="fill">
        <Stack.Item>
          <NotificationPopup />
        </Stack.Item>
        <Stack.Item>
          <Stack distribution="trailing">
            <Stack.Item>From March 8</Stack.Item>
          </Stack>
          <Stack distribution="trailing">
            <Stack.Item>2021</Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </ResourceList.Item>
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalItems = items.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <ResourceList
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
            resourceName={resourceName}
            items={paginatedItems}
            renderItem={renderItem}
            sortValue={sortValue}
            totalItemsCount={items.length}
            sortOptions={[
              {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
              {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
            ]}
            onSortChange={selected => {
              setSortValue(selected);
              console.log(`Sort option changed to ${selected}.`);
            }}
          />
          <Stack distribution="center" spacing="loose">
            <Button
              icon={ChevronLeftMinor}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            ></Button>
            <Button
              icon={ChevronRightMinor}
              disabled={endIndex >= totalItems}
              onClick={() => handlePageChange(currentPage + 1)}
            ></Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
