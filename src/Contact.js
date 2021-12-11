import React from 'react';
import ContactForm from './ContactForm';
import Result from './Result';
export const Contact = ({
  formInput,
  handleFormInput,
  AddUser,
  user,
  handleEdit,
  isEdited,
  deleteDoc,
}) => {
  return (
    <>
      <div className='jumbotron jumbotron-fluid mt-5 rounded'>
        <div className='container'>
          <h4 className='display-4 text-center'>Contact Register</h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <ContactForm
            handleFormInput={handleFormInput}
            formInput={formInput}
            AddUser={AddUser}
            isEdited={isEdited}
          />
        </div>
        <section className='col-md-8'>
          <Result user={user} handleEdit={handleEdit} deleteDoc={deleteDoc} />
        </section>
      </div>
    </>
  );
};
