import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import ConfirmationModal from '../components/Dialog';

function UserList() {
    const [users, setUsers] = useState([])
    const [userRoles, setUserRoles] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);

    const capitalize = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return ''
        }
    };

    // Composant Toggle isolé
    const Toggle = ({ isOn, onToggle }) => (
        <motion.button
            className="w-16 h-8 flex items-center rounded-full p-1 cursor-pointer"
            onClick={onToggle}
            animate={{
                backgroundColor: isOn ? '#10B981' : '#D1D5DB'
            }}
        >
            <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md"
                animate={{
                    x: isOn ? 32 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            />
        </motion.button>
    );

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/auth/all');
                if (response.ok) {
                    const u = await response.json();
                    setUsers(u.data)
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchUsers();

    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/all');
            const data = await response.json();

            if (data.success) {
                setUsers(data.data);
                // Mise à jour du state des rôles en même temps
                const rolesMap = data.data.reduce((acc, user) => ({
                    ...acc,
                    [user.username]: user.role
                }), {});
                setUserRoles(rolesMap);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // const handleToggle = async (user) => {
    //     // Optimistic update
    //     setUserRoles(prev => ({
    //         ...prev,
    //         [user.username]: !prev[user.username]
    //     }));

    //     try {
    //         const response = await fetch(`http://localhost:3001/api/auth/all/${user.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}` // Si vous utilisez des tokens
    //             },
    //             body: JSON.stringify({
    //                 role: !user.role
    //             })
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             // Rollback en cas d'erreur
    //             fetchUsers();
    //             throw new Error(data.message || 'Une erreur est survenue');
    //         }

    //     } catch (error) {
    //         console.error('Erreur lors de la mise à jour:', error);
    //         // Ici vous pourriez ajouter une notification d'erreur
    //         // toast.error(error.message);
    //     }
    // };

    const handleToggleClick = (user) => {
        setPendingUser(user);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (pendingUser) {
            try {
                const response = await fetch(`http://localhost:3001/api/auth/all/${pendingUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role: !pendingUser.role
                    })
                });

                const data = await response.json();

                if (data.success) {
                    fetchUsers(); // Rafraîchir la liste
                } else {
                    console.error('Erreur lors de la mise à jour:', data.message);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour:', error);
            }
        }
        setIsModalOpen(false);
        setPendingUser(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPendingUser(null);
    };
    return (
        <>
            <Navbar />
            <div className='full-h className="bg-gray-100 pt-20'>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className='p-10'>
                            <p className='text-lg font-medium text-gray-900 mb-5'>Liste des utilisateurs</p>
                            <table className='min-w-full'>
                                <thead>
                                    <tr className="border-b">
                                        <td className="text-center w-1/4 px-4 py-2 font-semibold">Utilisateurs</td>
                                        <td className="text-center w-1/4 px-4 py-2 font-semibold">Role</td>
                                        <td className="text-center w-1/4 px-4 py-2 font-semibold">Basculer</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => (
                                            <tr key={index}>
                                                <td className="text-center p-3">{capitalize(user.username)}</td>
                                                <td className="text-center p-3">
                                                    {userRoles[user.username] === false ? "Utilisateur" : "Administrateur"}
                                                </td>
                                                <td className="p-3 flex justify-center items-center">
                                                    <Toggle
                                                        isOn={userRoles[user.username]}
                                                        onToggle={() => handleToggleClick(user)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <ConfirmationModal
                                isOpen={isModalOpen}
                                onClose={handleCancel}
                                onConfirm={handleConfirm}
                                username={pendingUser?.username}
                                newRole={pendingUser ? !pendingUser.role : false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList