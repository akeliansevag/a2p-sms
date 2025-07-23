import React from 'react';

const Banner = () => {
  return (
    <section className='relative flex items-center'>
        <div className='container max-lg:flex-col items-center flex justify-between max-lg:gap-10 lg:gap-20'>
            <div className='w-full'>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-6xl font-semibold text-balance'>Deliver Messages at Scale with Monty’s A2P SMS</h1>
                    <p className='text-balance'>Power mission-critical communications with direct operator access, high-speed delivery, and full global coverage.</p>
                    <a className='a2p-button mt-10' href='#'>
                        <span>Contact Us</span>
                        <svg className='translate-y-[0.5px]' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4697 0.46967C10.7626 0.176777 11.2374 0.176777 11.5303 0.46967L17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L11.5303 13.5303C11.2374 13.8232 10.7626 13.8232 10.4697 13.5303C10.1768 13.2374 10.1768 12.7626 10.4697 12.4697L15.1893 7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H15.1893L10.4697 1.53033C10.1768 1.23744 10.1768 0.762563 10.4697 0.46967Z" fill="white"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div className='w-full flex justify-end lg:translate-y-10'>
                <object type="image/svg+xml" data="/messages.svg">
                    Your browser does not support SVG
                </object>
            </div>
        </div>
    </section>
  )
}

export default Banner;
