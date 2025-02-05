import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search, UserRoundCog, House } from 'lucide-react';
import { useData } from './DataContext';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, setSearchTerm, searchTerm, setUser, isLoading } = useData()

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3001/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsModalOpen(false)
            setUser(null)
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Erreur lors de la déconnexion:', err);
        }
    };

    const capitalize = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return ''
        }
    };

    return (
        <>

            <div className='fixed left-0 right-0 top-0'>
                <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
                <nav className="bg-white shadow">
                    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20">
                            <div className='flex'>
                                <div className="flex items-center mr-12">
                                    <Menu size={25}
                                        onClick={() => setIsOpen(!isOpen)}
                                        className='hover:cursor-pointer' />
                                </div>
                                <div className="flex items-center mr-12">
                                    <House size={25}
                                        onClick={() => navigate('/')}
                                        className='hover:cursor-pointer' />
                                </div>
                                <div className="flex justify-center items-center">
                                    <form
                                        className="flex w-[400px] max-w-md border border-gray-300 rounded-full overflow-hidden shadow-sm"
                                    >
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Rechercher..."
                                            className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 hover:bg-gray-300 transition"
                                        >
                                            <Search size={25} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {
                                    isLoading ? <p className='px-4 py-1 border border-blue-500 rounded-full text-blue-500'>
                                        Bonjour...
                                    </p> :
                                        <p className='px-4 py-1 border border-blue-500 rounded-full text-blue-500'>
                                            Bonjour {capitalize(user?.username)}
                                        </p>
                                }
                                <UserRoundCog size={25}
                                    className='hover:cursor-pointer'
                                    onClick={() => { setIsModalOpen(true) }} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={() => { setIsModalOpen(false) }}>
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
                        <p className="text-gray-600 mb-6">
                            Voulez vous vraiment vous déconnectez ?
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Non
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Oui
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar