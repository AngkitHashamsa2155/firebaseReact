import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useUserContext } from './userContext';
const Result = () => {
  const { user, handleEdit, handleDeleteDoc, isLoading } = useUserContext();
  return isLoading ? (
    <div
      style={{
        display: 'grid',
        height: '100%',
        width: '100%',
        placeItems: 'center',
      }}
    >
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  ) : (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>fullName</th>
            <th scope='col'>email</th>
            <th scope='col'>mobile</th>
            <th scope='col'>address</th>
            <th scope='col'>edit</th>
            <th scope='col'>delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => {
            const { id, email, fullName, mobile, address } = item;
            return (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                <td>{address}</td>
                <td>
                  <button onClick={() => handleEdit(id)}>
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteDoc(id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
