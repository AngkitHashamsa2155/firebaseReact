import React, { useState } from 'react';
import { FaUserAlt, FaMobileAlt, FaAddressCard } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { useUserContext } from './userContext';
const ContactForm = () => {
  const { formInput, handleFormInput, AddUser, isEdited, isLoading } =
    useUserContext();
  return (
    <form autoComplete='off' onSubmit={(e) => AddUser(e)}>
      <div className='form-group input-group '>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <FaUserAlt />
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Full Name'
            name='fullName'
            value={formInput.fullName}
            onChange={handleFormInput}
          />
        </div>
      </div>
      <div className='form-group input-group '>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <FaMobileAlt />
          </div>
          <input
            type='tel'
            className='form-control'
            placeholder='mobile number'
            name='mobile'
            value={formInput.mobile}
            onChange={handleFormInput}
          />
        </div>
      </div>
      <div className='form-group input-group '>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <MdOutlineEmail />
          </div>
          <input
            type='email'
            className='form-control'
            placeholder='email'
            name='email'
            value={formInput.email}
            onChange={handleFormInput}
          />
        </div>
      </div>
      <div className='form-group input-group '>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <FaAddressCard />
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='address'
            name='address'
            value={formInput.address}
            onChange={handleFormInput}
          />
        </div>
      </div>
      <button disabled={isLoading} type='submit' className='btn btn-primary'>
        {isEdited ? 'edit' : 'submit'}
      </button>
    </form>
  );
};

export default ContactForm;
