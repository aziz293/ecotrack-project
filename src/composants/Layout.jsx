// import Sidebar from './Sidebar';

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Sidebar />
//       <div className="mt-10 pt-16 md:pt-6 md:ml-64 p-6">{children}</div>
//     </>
//   );
// };

// export default Layout;


import React from 'react';
import Sidebar from '../composants/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="pt-[72px] md:pt-6 md:ml-64 p-6 w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
