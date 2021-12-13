import React from 'react';
import ContactForm from './ContactForm';
import Result from './Result';

export const Contact = () => {
  return (
    <>
      <div className='jumbotron jumbotron-fluid mt-5 rounded'>
        <div className='container'>
          <h4 className='display-4 text-center'>Contact Register</h4>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <ContactForm />
        </div>
        <section className='col-md-8'>
          <Result />
        </section>
      </div>
    </>
  );
};
