import {Button, Layout, Page, ResourceList, Stack} from '@shopify/polaris';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import usePaginate from '../../hooks/api/usePaginate';
import moment from 'moment';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {
    data = [],
    prevPage = false,
    nextPage = false,
    onQueryChange,
    pageInfo,
    loading
  } = usePaginate({
    url: '/notifications',
    defaultSort: 'timestamp:desc',
    defaultLimit: 3
  });

  const [sortValue, setSortValue] = useState('timestamp:desc');
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'product',
    plural: 'products'
  };

  const renderItem = item => {
    let date = new Date(item.timestamp);
    var options = {month: 'long', day: 'numeric'};

    var year = date.getFullYear();
    var formattedDate = date.toLocaleDateString('en-US', options);
    return (
      <ResourceList.Item id={item.id} accessibilityLabel={`View details for ${item.name}`}>
        <Stack distribution="fill">
          <Stack.Item>
            <NotificationPopup data={item} />
          </Stack.Item>
          <Stack.Item>
            <Stack distribution="trailing">
              <Stack.Item>From {formattedDate}</Stack.Item>
            </Stack>
            <Stack distribution="trailing">
              <Stack.Item>{year}</Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </ResourceList.Item>
    );
  };

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <ResourceList
            loading={loading}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
            resourceName={resourceName}
            items={data}
            renderItem={renderItem}
            sortValue={sortValue}
            sortOptions={[
              {label: 'Newest update', value: 'timestamp:desc'},
              {label: 'Oldest update', value: 'timestamp:asc'}
            ]}
            onSortChange={selected => {
              setSortValue(selected);
              onQueryChange('sort', selected, true);
            }}
          />
          <Stack distribution="center" spacing="loose">
            <Button icon={ChevronLeftMinor} disabled={pageInfo.hasPre} onClick={prevPage}></Button>
            <Button
              disabled={pageInfo.hasNext}
              icon={ChevronRightMinor}
              onClick={nextPage}
            ></Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
