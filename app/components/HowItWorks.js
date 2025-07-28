import React from 'react';

const HowItWorks = () => {
  const items = [
    {
       title: 'Connect',
       description: 'Simple integration via API or SMPP',
       icon: '/api2.webp' 
    },
    {
       title: 'Send at Scale',
       description: 'Send millions of messages securely, reliably, and fast',
       icon: '/send-at-scale.webp' 
    },
    {
       title: 'Monitor & Optimize',
       description: 'Access dashboards, delivery reports, and campaign insights',
       icon: '/monitor-and-optimize2.webp' 
    },

  ];
  return (
    <section className='max-lg:py-12 lg:py-24'>
      <div className='container'>
        <h2 className='section-title text-center'>How It Works</h2>
        <div className='mt-10 flex justify-between max-lg:flex-col max-lg:gap-10 lg:gap-16'>
            {
                items.map((item,ind)=>{
                    return (
                        <div key={ind} className='work-box lg:w-1/3'>
                            <div className='flex flex-col gap-4'>
                                <div className='text-black w-max mx-auto text-base text-center px-5 py-1 bg-[#E4E4E4] rounded-full border'>STEP {ind+1}</div>
                                <h3 className='text-3xl'>{item.title}</h3>
                                <h4>{item.description}</h4>
                            </div>
                            
                            <div className='red-background'>
                                <img className='mx-auto mt-5' src={item.icon} />
                            </div>
                        </div>
                    )
                })
            }
            
            
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
