import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import { db } from './firebase';
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [formInput, setFormInput] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fire, setFire] = useState(false);
  const [isEdited, SetIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleFormInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
  };
  //* firebase database
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
      setIsLoading(true);
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
      setIsLoading(false);
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
    setIsLoading(true);
    await addDoc(userCollection, obj);
    setIsLoading(false);
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
      setIsLoading(true);
      try {
        const data = await getDocs(userCollection);
        console.log('im fired');
        if (data) {
          setUser(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }

        setFire(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [fire]);
  return (
    <UserContext.Provider
      value={{
        user,
        formInput,
        isLoading,
        fire,
        handleFormInput,
        handleEdit,
        handleDeleteDoc,
        AddUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
