import {EmptyState} from '@shopify/polaris';

const Empty = () => {
  return (
    <EmptyState
      heading='Manage your TODO'
      footerContent={
        <p>If you don’t want to do something, you can create a list job here</p>
      }
    ></EmptyState>
  );
};

export default Empty;
