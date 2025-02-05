import React from 'react';
import { X, Home, User, HelpCircle, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setIsOpen, isOpen }) => {

    const navigate = useNavigate()

    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black"
                        />

                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-bold">Menu</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <nav className="space-y-2">
                                    <p
                                        onClick={()=>navigate('/')}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <Home size={20} />
                                        <span>Accueil</span>
                                    </p>
                                    <p
                                        onClick={()=>navigate('/about')}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <User size={20} />
                                        <span>Profil</span>
                                    </p>
                                    <p
                                        onClick={()=>navigate('/userList')}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <User size={20} />
                                        <span>Liste des utilisateurs</span>
                                    </p>
                                    <p
                                        onClick={()=>navigate('/form')}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <File size={20} />
                                        <span>Ajout dossier</span>
                                    </p>
                                    <p
                                        onClick={()=>navigate('/help')}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors hover:cursor-pointer"
                                    >
                                        <HelpCircle size={20} />
                                        <span>Aide</span>
                                    </p>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;