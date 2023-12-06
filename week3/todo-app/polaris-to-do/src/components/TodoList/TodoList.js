import {
  Badge,
  Button,
  Card,
  Frame,
  Page,
  ResourceItem,
  ResourceList,
  Stack,
} from '@shopify/polaris';
import {EnableSelectionMinor} from '@shopify/polaris-icons';
import {useState} from 'react';
import axios from '../../configs/axios';
import useDeleteAPI from '../../hooks/api/useDeleteApi';
import useGetAPI from '../../hooks/api/useGetApi';
import usePostAPI from '../../hooks/api/usePostApi';
import usePutAPI from '../../hooks/api/usePutApi';
import useModal from '../../hooks/modal/useModal';
import useToast from '../../hooks/toast/useToast';
import Empty from '../Empty/Empty';
import ModalCreate from '../Modal/Modal';
import './TodoList.scss';

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [todo, setTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {toast, showToast, setToatMessage} = useToast();
  const {data: todos, setData: setTodos, getting} = useGetAPI('/api/todo');
  const {postData} = usePostAPI('/api/todo');
  const {handleDeleteItem, deleting} = useDeleteAPI();
  const {handlePutItem, putting} = usePutAPI();

  const resourceName = {
    singular: 'todos',
    plural: 'todos',
  };

  const handleCreate = async () => {
    const resp = await postData({todo});

    if (resp.success) {
      setTodos([...todos, resp.data]);

      setToatMessage(resp.message);
      showToast();
      setTodo('');
    } else {
      setToatMessage(resp.message);
      showToast();
    }
  };

  const {modal, openModal} = useModal({
    title: 'Create a new todo',
    primaryAction: handleCreate,
    content: (
      <ModalCreate
        item={todos}
        setItem={setTodos}
        value={todo}
        setValue={setTodo}
      />
    ),
  });

  const handleDeleteSelectedItems = async () => {
    const reps = await handleDeleteItem('/api/todos', selectedItems);

    if (reps.success) {
      setToatMessage(reps.message);
      showToast();
    }

    setTodos((todos) =>
      todos.filter((item) => (selectedItems.includes(item.id) ? false : true))
    );
    setSelectedItems([]);
  };

  const handleCompleteSelectedItems = async () => {
    setIsLoading(true);
    const reps = await axios.put('/api/todos', {idList: selectedItems});

    if (reps.success) {
      setToatMessage(reps.message);
      showToast();
    }
    setTodos((todos) =>
      todos.map((item) =>
        selectedItems.includes(item.id) ? {...item, isComplete: true} : item
      )
    );
    setIsLoading(false);
    setSelectedItems([]);
  };

  const handleComplete = async (id) => {
    const resp = await handlePutItem('/api/todo/' + id);

    setTodos(
      todos.map((item) => (item.id === id ? {...item, isComplete: true} : item))
    );
    setToatMessage(resp.message);
    showToast(resp.message);
  };

  const handleDelete = async (id) => {
    const resp = await handleDeleteItem('api/todo/' + id);
    if (resp.success) {
      setTodos(todos.filter((item) => (item.id !== id ? true : false)));

      setToatMessage(resp.message);
      showToast();
    } else {
      setToatMessage(resp.message);
      showToast();
    }
  };

  const promotedBulkActions = [
    {
      content: 'Complete',
      onAction: handleCompleteSelectedItems,
    },
    {
      content: 'Delete',

      onAction: handleDeleteSelectedItems,
    },
  ];

  const selectAllBtnMarkup = (
    <Button
      onClick={() => setSelectedItems(todos.map((item) => item.id))}
      icon={EnableSelectionMinor}
    >
      Select
    </Button>
  );

  function renderItem(item, _, index) {
    const {id, todo, isComplete} = item;

    return (
      <ResourceItem id={id} sortOrder={index}>
        <Stack distribution={'equalSpacing'}>
          <Stack.Item>{todo}</Stack.Item>
          <Stack.Item>
            <Stack alignment={'center'} distribution={'center'}>
              <Stack.Item>
                {isComplete ? (
                  <Badge status='info'>Done</Badge>
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
                <Button destructive onClick={() => handleDelete(id)}>
                  Delete
                </Button>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    );
  }

  function resolveItemIds({id}) {
    return id;
  }

  return (
    <Frame>
      <Page
        title='Todos'
        primaryAction={{
          content: 'Create todo',
          onAction: openModal,
        }}
      >
        {toast}
        <Card>
          <ResourceList
            emptyState={<Empty />}
            loading={getting || deleting || putting}
            resourceName={resourceName}
            items={todos}
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
    </Frame>
  );
}

export default TodoList;
