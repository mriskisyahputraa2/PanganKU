import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4 flex items-center space-x-2">
                    <ApplicationLogo className="h-8 w-auto" />
                    <span className="font-bold">Laravel Starter Kit</span>
                </div>
                <nav className="mt-4">
                    <Link
                        href={route('dashboard')}
                        className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route('dashboard.products.index')}
                        className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                        Products
                    </Link>
                    {/* Tambah menu lain di sini */}
                </nav>
                <div className="mt-auto p-4 text-sm">
                    <div>{auth?.user?.name}</div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="text-xl font-bold text-gray-900">
                            {header || 'Dashboard'}
                        </div>
                        <div>
                            {/* bisa tambahkan logout dsb */}
                        </div>
                    </div>
                </nav>

                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
    