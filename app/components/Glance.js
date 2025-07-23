import React from 'react';

const Glance = () => {
  return (
    <section className='max-lg:py-12 lg:py-24'>
        <div className='container max-w-[775px]'>
            <h2 className='section-title text-center !mb-6'>Monty Mobile at a Glance</h2>
            <p>A global A2P SMS provider powering business-critical communications From security to engagement, Monty helps businesses deliver the right message at the right time, instantly, reliably, and globally.</p>
        </div>
        <div className='container mt-5'>
            <div>
                <div className='glance-box'>
                    <h3>Two-Factor Authentication (2FA)</h3>
                    <div>
                        <img src='/two-factor-auth.webp' />
                    </div>
                </div>
                <div className='glance-box'>

                </div>
            </div>
            
        </div>
    </section>
  )
}

export default Glance;
