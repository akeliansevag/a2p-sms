import React from 'react';

const Glance = () => {
  return (
    <section id="a2p-sms" className='max-lg:py-12 lg:py-24'>
        <div className='container max-w-[775px] text-center '>
            <h2 className='section-title !mb-6'>Monty Mobile at a Glance</h2>
            <p>A global A2P SMS provider powering business-critical communications From security to engagement, Monty helps businesses deliver the right message at the right time, instantly, reliably, and globally.</p>
        </div>
        <div className='container  mt-12 flex flex-col gap-5'>
            <div className='flex max-lg:flex-col gap-5'>
                <div className='glance-box lg:w-2/3'>
                    <h3>Two-Factor Authentication (2FA)</h3>
                    <div>
                        <img src='/two-factor-auth.webp' />
                    </div>
                </div>
                <div className='glance-box lg:w-1/3'>
                    <h3>One-Time Passwords (OTP)</h3>
                    <div>
                        <img src='/one-time-passwords.webp' />
                    </div>
                </div>
            </div>

            <div className='flex max-lg:flex-col gap-5'>
                <div className='glance-box lg:w-1/3'>
                    <h3>Account Notifications</h3>
                    <div>
                        <img src='/account-notifications.webp' />
                    </div>
                </div>
                <div className='glance-box !pb-0 lg:w-2/3'>
                    <h3>Transaction Alerts</h3>
                    <div>
                        <img className='lg:max-w-[420px]' src='/transaction-alerts.webp' />
                    </div>
                </div>
            </div>


            <div className='flex max-lg:flex-col gap-5'>
                <div className='glance-box lg:w-1/3'>
                    <h3>Appointment Reminders</h3>
                    <div>
                        <img src='/appointment-reminders.webp' />
                    </div>
                </div>
                <div className='glance-box lg:w-1/3'>
                    <h3>Promotional Campaigns</h3>
                    <div>
                        <img src='/promotional-campaigns.webp' />
                    </div>
                </div>
                <div className='glance-box lg:w-1/3'>
                    <h3>System or App Status Updates</h3>
                    <div>
                        <img src='/system-or-app-status-updates.webp' />
                    </div>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default Glance;
