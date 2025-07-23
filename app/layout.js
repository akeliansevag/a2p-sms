import "./globals.css";

export const metadata = {
  title: "A2P SMS",
  description: "Deliver Messages at Scale with Monty's A2P SMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-outfit text-white bg-black">
        <img className="fixed grayscale-100 -z-10 top-0 left-0 w-full h-full object-cover" src="/stars.webp" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
          <svg className="max-lg:w-screen max-lg:h-auto" width="1015" height="438" viewBox="0 0 1015 438" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_3_51)">
            <circle cx="507.5" cy="-69.5" r="257.5" fill="#EB224D" fillOpacity="0.4"/>
            </g>
            <defs>
            <filter id="filter0_f_3_51" x="0" y="-577" width="1015" height="1015" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_3_51"/>
            </filter>
            </defs>
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
