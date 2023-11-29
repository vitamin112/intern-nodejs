import {
  Badge,
  Button,
  Card,
  Page,
  ResourceItem,
  ResourceList,
  Stack,
} from '@shopify/polaris';
import {EnableSelectionMinor} from '@shopify/polaris-icons';
import {useState} from 'react';
import axios from '../../configs/axios';
import useModal from '../../hooks/modal/useModal';
import useToast from '../../hooks/toast/useToast';
import ModalCreate from '../Modal/Modal';
import './TodoList.scss';

async function getData() {
  const response = await axios.get('/api/todo');
  return response;
}

const initTodoes = await getData();

function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [todoes, setTodoes] = useState(initTodoes ? initTodoes.data : []);
  const [todo, setTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {toast, showToast, setToatMessage} = useToast({message: 'Success'});

  const handleCreate = async () => {
    const resp = await axios.post('/api/todo', {todo});
    if (resp.success) {
      setTodoes([...todoes, resp.data]);
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
        item={todoes}
        setItem={setTodoes}
        value={todo}
        setValue={setTodo}
      />
    ),
  });

  const resourceName = {
    singular: 'todoes',
    plural: 'todoes',
  };

  const handleDeleteSelectedItems = async () => {
    const reps = await axios.delete('/api/todoes', {data: selectedItems});

    if (reps.success) {
      setToatMessage(reps.message);
      showToast();
    }

    setTodoes((todoes) =>
      todoes.filter((item) => (selectedItems.includes(item.id) ? false : true))
    );
    setSelectedItems([]);
  };

  const handleCompleteSelectedItems = async () => {
    setIsLoading(true);
    const reps = await axios.put('/api/todoes', {idList: selectedItems});

    if (reps.success) {
      setToatMessage(reps.message);
      showToast();
    }
    setTodoes((todoes) =>
      todoes.map((item) =>
        selectedItems.includes(item.id) ? {...item, isComplete: true} : item
      )
    );
    setIsLoading(false);
    setSelectedItems([]);
  };

  const handleComplete = async (id) => {
    setIsLoading(true);
    const resp = await axios.put('api/todo/' + id);
    setTodoes(
      todoes.map((item) =>
        item.id === id ? {...item, isComplete: true} : item
      )
    );
    setIsLoading(false);
    setToatMessage(resp.message);
    showToast(resp.message);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    const resp = await axios.delete('/api/todo/' + id);
    if (resp.success) {
      setTodoes(todoes.filter((item) => (item.id !== id ? true : false)));
      setToatMessage(resp.message);
      showToast();
    } else {
      setToatMessage(resp.message);
      showToast();
    }
    setIsLoading(false);
  };

  const promotedBulkActions = [
    {
      content: 'Complete',
      onAction: () => {
        handleCompleteSelectedItems();
      },
    },
    {
      content: 'Delete',

      onAction: () => {
        handleDeleteSelectedItems();
      },
    },
  ];

  const selectAllBtnMarkup = (
    <Button
      onClick={() => setSelectedItems(todoes.map((item) => item.id))}
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
    <Page
      title='Todoes'
      primaryAction={{
        content: 'Create todo',
        onAction: () => {
          openModal();
        },
      }}
    >
      {toast}
      <Card>
        <ResourceList
          loading={isLoading}
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
