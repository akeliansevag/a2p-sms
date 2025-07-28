import React from 'react';

const GlobalReach = () => {
  return (
    <section>
      <div className='container text-black'>
        <div className='gray-box lg:items-center flex max-lg:flex-col max-lg:gap-10 lg:gap-24 p-16'>
            <div className='w-full'>
                <h2 className='section-title !mb-0'>
                    Global Reach. <br />
                    Local Support.
                </h2>
                <p>
                   Monty partners with telecom operators worldwide to ensure the best routes, minimal latency, and full delivery transparency.
                </p>
                <a className='a2p-button mt-10 text-white' href='#'>
                    <span>Contact Us</span>
                    <svg className='translate-y-[0.5px]' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.4697 0.46967C10.7626 0.176777 11.2374 0.176777 11.5303 0.46967L17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L11.5303 13.5303C11.2374 13.8232 10.7626 13.8232 10.4697 13.5303C10.1768 13.2374 10.1768 12.7626 10.4697 12.4697L15.1893 7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H15.1893L10.4697 1.53033C10.1768 1.23744 10.1768 0.762563 10.4697 0.46967Z" fill="white"/>
                    </svg>
                </a>
            </div>
            <div className="w-full">
                <img src='/80operator.webp' />
            </div>
            
        </div>
      </div>
    </section>
  )
}

export default GlobalReach;
