import React from 'react';
import A2PContactForm from './A2PContactForm';

const Messaging = () => {
  return (
    <section>
      <div className='container'>
        <div className='gray-border-box flex max-lg:flex-col gap-4'>
            <div className='w-full'>
                <h2 className='section-title !mb-0'>Let’s Talk Messaging</h2>
                <h3 className='text-balance'>Tell us a bit about your needs and a member of our team will reach out.</h3>
                <div className='-translate-x-10 lg:max-w-1/2 max-lg:max-w-[90%] mt-32'>
                    <img src='/emblem.webp' />
                </div>
            </div>
            <div className='w-full gray-border-box'>
                <A2PContactForm />
            </div>
        </div>
      </div>
    </section>
  )
}

export default Messaging;
