import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
