import React from 'react';

const KeyFeatures = () => {
  const items = [
    {
        icon: '/reach.svg',
        title: 'Reach',
        description: 'Worldwide coverage with intelligent routing',
    },
    {
        icon: '/reliability.svg',
        title: 'Reliability',
        description: 'Failover routing and throughput assurance',
    },
    {
        icon: '/documentation.svg',
        title: 'Documentation',
        description: 'Developer-friendly API documentation',
    },
    {
        icon: '/analytics.svg',
        title: 'Analytics',
        description: 'Real-time dashboards and reporting',
    },
    {
        icon: '/compatibility.svg',
        title: 'Compatibility',
        description: 'Protocol support: SMPP, HTTP, REST',
    }
  ];
  return (
    <section id="features" className='max-lg:py-12 lg:py-24'>
      <div className='container'>
        <h2 className='section-title text-center'>Key Features</h2>
        <div className='flex flex-wrap justify-center gap-10 lg:gap-24'>
            {
                items.map((item,indx)=>{
                    return (
                        <div key={indx} className='items-center flex flex-col justify-center gap-3'>
                            <div className='red-box-border mb-3'>
                                <img src={item.icon} />
                            </div>
                            <h3 className='text-3xl'>{item.title}</h3>
                            <h4 className='text-balance text-center'>{item.description}</h4>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures;
