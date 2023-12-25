import React from 'react';
import {Card, Layout, Page, Stack, Thumbnail} from '@shopify/polaris';

export default function MainFeedMedia({
  title = 'Title',
  space = 10,
  numOfColumn = 2,
  numOfRow = 2
}) {
  return (
    <Page fullWidth>
      <Card title={title}>
        <Stack distribution="center">
          <Stack.Item>
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              alt="Black choker necklace"
            />
          </Stack.Item>
          <Stack.Item>
            <Thumbnail
              source="https://media.istockphoto.com/id/1738975127/vi/anh/b%C3%A0n-g%E1%BB%97-v%C4%83n-ph%C3%B2ng-v%E1%BB%9Bi-m%C3%A1y-t%C3%ADnh-x%C3%A1ch-tay-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-th%C3%B4ng-minh-v%C3%A0-c%C3%A1c-v%E1%BA%ADt-d%E1%BB%A5ng-l%C3%A0m-vi%E1%BB%87c-kh%C3%A1c-v%E1%BB%9Bi.jpg?s=1024x1024&w=is&k=20&c=zj4Vc0oO9dHzsXxpRjIjC20QB9H1-VvIxuRO2kdh-o8="
              alt="Black choker necklace"
            />
          </Stack.Item>
        </Stack>
      </Card>
    </Page>
  );
}
