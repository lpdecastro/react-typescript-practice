import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

const App = () => {
  const [modalType, setModalType] = useState<'add' | 'delete' | null>(null);

  function handleClose() {
    setModalType(null);
  }

  return (
    <div className='container'>
      <h1>User Management</h1>

      <button onClick={() => setModalType('add')}>Add User</button>
      <button onClick={() => setModalType('delete')}>Delete User</button>

      <Modal isOpen={modalType === 'add'} title='Add User' onClose={handleClose}>
        <input type='text' placeholder='Full name' />
        <input type='email' placeholder='Email address' />

        <button onClick={handleClose}>Save</button>
      </Modal>

      <Modal isOpen={modalType === 'delete'} title='Delete User' onClose={handleClose}>
        <p>Are you sure you want to delete this user?</p>

        <button onClick={handleClose}>Delete</button>
        <button onClick={handleClose}>Cancel</button>
      </Modal>
    </div>
  );
};

export default App;
