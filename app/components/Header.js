import React from 'react';

const Header = () => {
  return (
    <header>
        <div className='container flex justify-between items-center gap-5'>
            <a href="#home">
                <svg width="47" height="28" viewBox="0 0 47 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8747 21.3771C12.8747 24.9179 10.1078 27.7944 6.68372 27.7944C3.25968 27.7944 0.5 24.9252 0.5 21.3771C0.5 17.8289 3.26698 14.9597 6.69102 14.9597C10.1151 14.9597 12.882 17.8362 12.882 21.3771" fill="#EB224D"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20.1171 4.00138C19.4965 1.89147 18.4598 0.248808 14.9701 0.197703C11.6774 0.146597 8.4067 3.1837 8.94696 7.52764C9.51642 12.1125 12.9478 11.3167 15.7585 13.2295C19.3286 15.6607 16.7952 19.4351 17.591 23.5454C18.8979 30.2621 29.9439 28.6633 29.5058 21.3333C29.5058 21.4647 29.5131 21.2092 29.5058 21.3333C29.5058 19.2088 28.1771 17.4055 26.3081 16.6901C26.2643 16.6682 23.198 15.1861 22.7964 14.9452C20.212 13.3755 20.3945 9.72516 20.3434 6.57124C20.3434 6.57124 20.4456 5.1549 20.1098 4.00868" fill="#EB224D"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M37.0986 4.00138C36.478 1.89147 35.4413 0.248808 31.9516 0.197703C28.6589 0.146597 25.3882 3.1837 25.9285 7.52764C26.4979 12.1125 29.9293 11.3167 32.74 13.2295C36.3101 15.6607 33.7767 19.4351 34.5725 23.5454C35.8793 30.2621 46.9254 28.6633 46.4873 21.3333C46.4873 21.4647 46.4946 21.2092 46.4873 21.3333C46.4873 19.2088 45.1586 17.4055 43.2896 16.6901C43.2458 16.6682 40.1795 15.1861 39.7779 14.9452C37.1935 13.3755 37.376 9.72516 37.3249 6.57124C37.3249 6.57124 37.4271 5.1549 37.0913 4.00868" fill="#EB224D"/>
                </svg>
            </a>
            <div className='max-lg:hidden'>
               <div className="menu">
                    <ul>
                        <li><a href="#a2p-sms">A2P SMS</a></li>
                        <li><a href="#why-mymonty">Why Monty</a></li>
                        <li><a href="#use-cases">Use Cases</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#coverage">Coverage</a></li>
                        <li><a href="#faqs">FAQs</a></li>
                    </ul>
               </div>
            </div>
            <div className='max-lg:hidden'>
                <a className='rounded-full border border-primary px-5 py-2 hover:bg-primary text-nowrap hover:!text-white' href='#contact-us'>Contact us</a>
            </div>
        </div>
        
    </header>
  )
}

export default Header;
