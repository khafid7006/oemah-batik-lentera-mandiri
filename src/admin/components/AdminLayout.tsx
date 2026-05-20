import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="bg-batik-cream min-h-screen">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Topbar title={title} />
        <main className="p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
