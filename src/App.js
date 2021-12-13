import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';

import { Contact } from './Contact';
function App() {
  const [user, setUser] = useState([]);
  const [formInput, setFormInput] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
  });

  const [fire, setFire] = useState(false);
  const [isEdited, SetIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleFormInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
  };
  const userCollection = collection(db, 'user');

  const handleEdit = (id) => {
    let { fullName, mobile, email, address } = user.find(
      (item) => item.id === id
    );

    const newObject = { fullName, mobile, email, address };
    SetIsEdit(true);
    setEditId(id);
    setFormInput(newObject);
  };

  const firebaseUpdate = async () => {
    try {
      const userDoc = doc(db, 'user', editId);

      const { fullName, mobile, email, address } = user.find(
        (item) => item.id === editId
      );

      const newObject = { fullName, mobile, email, address };
      const newField = {
        ...newObject,
        fullName: formInput.fullName,
        mobile: formInput.mobile,
        email: formInput.email,
        address: formInput.address,
      };

      await updateDoc(userDoc, newField);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDoc = async (id) => {
    try {
      await deleteDoc(doc(db, 'user', id));
      setFire(true);
    } catch (error) {
      console.log(error);
    }
  };

  const firebaseAdd = async (obj) => {
    await addDoc(userCollection, obj);
  };

  const AddUser = (e) => {
    e.preventDefault();
    if (
      formInput.fullName &&
      formInput.email &&
      formInput.mobile &&
      formInput.address &&
      isEdited
    ) {
      firebaseUpdate();

      SetIsEdit(false);
      setFire(true);
      setFormInput({
        ...formInput,
        fullName: '',
        mobile: '',
        email: '',
        address: '',
      });
      setEditId(null);
    } else if (
      !formInput.fullName &&
      !formInput.email &&
      !formInput.mobile &&
      !formInput.address &&
      !isEdited
    ) {
      alert('please Enter value as the input field is empty');
    } else {
      firebaseAdd(formInput);
      setFire(true);
      setEditId(null);
      setFormInput({
        fullName: '',
        mobile: '',
        email: '',
        address: '',
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getDocs(userCollection);
        console.log('im fired');
        if (data) {
          setUser(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        setFire(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fire]);

  return (
    <div className='row'>
      <div className='col-md-10 mx-auto offset-md-1'>
        <Contact
          formInput={formInput}
          handleFormInput={handleFormInput}
          AddUser={AddUser}
          user={user}
          handleEdit={handleEdit}
          isEdited={isEdited}
          handleDeleteDoc={handleDeleteDoc}
        />
      </div>
    </div>
  );
}

export default App;
