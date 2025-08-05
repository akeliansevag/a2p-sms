import React from 'react';

const UseCases = () => {
  return (
    <section id="use-cases">
      <div className='container text-black '>
        <div className='gray-box lg:items-center flex max-lg:flex-col max-lg:gap-10 lg:gap-24'>
            <div className="lg:w-1/3 p-5 pl-0">
                <img src='/security-alert.webp' />
            </div>
            <div className='lg:w-2/3 p-5 '>
                <h2 className='section-title !mb-0'>
                    Use Cases
                </h2>
                <p>
                    We Power SMS That Works!
                </p>
                <ul className='list-disc pl-6 mt-10 flex flex-col gap-2'>
                    <li><strong>Authentication:</strong> Secure login and 2FA via SMS</li>
                    <li><strong>Customer Alerts:</strong> Banking, delivery, and system updates</li>
                    <li><strong>Promotional Campaigns:</strong> Flash offers and segmented SMS marketing</li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  )
}

export default UseCases;
