import React, { useState } from 'react'
import { useData } from './DataContext'
import { Info, Save, CircleX, ShieldCheck } from 'lucide-react';

function Popup() {
    const { setIsPopupOpen, isPopupOpen, selectedTask, setSelectedTask,ok, setOk,setDocuments,handleReload } = useData()
    const [message, setMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (field) => {
        setSelectedTask(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


    const handleSave = async (e) => {
        e.preventDefault();
        const updatedTask = {...selectedTask};
        try {
            const response = await fetch(`http://localhost:3001/api/documents/${selectedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                setDocuments(prevDocuments => 
                    prevDocuments.map(doc => 
                        doc.id === selectedTask.id ? updatedTask : doc
                    )
                  );
                setOk(true)
                handleReload()
            } else {
                setOk(false)
                setMessage('Error lors de la mise à jour.')
            }
        } catch (error) {
            setMessage('Erreur de connexion au serveur.');
        }
    };

    return (
        <>
            {isPopupOpen && selectedTask && (
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-6 w-96 border border-gray-200">
                    <div className='flex md:justify-between'>
                        <div className='flex'>
                            <Info className='text-blue-500' style={{ transform: `translateY(5px)` }} />
                            <p className='text-2xl font-bold mb-4 mr-5'>Détails du dossier</p>
                        </div>
                        <CircleX size={25} className='text-red-500 hover:cursor-pointer'
                            style={{ transform: `translate(10px,-10px)` }}
                            onClick={() => setIsPopupOpen(false)} />
                    </div>
                    <div className='flex gap-2'>
                    <div>
                            <h3 className="text font-semibold mb-2">Document</h3>
                            <input
                                name='nom'
                                type="text"
                                value={selectedTask.nom}
                                onChange={handleInputChange}
                                className="w-full max-w-md  mb-2 px-4 py-1 text-gray-700 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Entrez votre texte..."
                            />
                        </div>
                        <div>
                            <h3 className="text font-semibold mb-2">Numero titre</h3>
                            <input
                                name='numero'
                                type="text"
                                value={selectedTask.numero}
                                onChange={handleInputChange}
                                className="w-full max-w-md  mb-2 px-4 py-1 text-gray-700 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Entrez votre texte..."
                            />
                        </div>
                        <div>
                            <h3 className="text font-semibold mb-2">Index</h3>
                            <input
                                type="text"
                                name='index_dossier'
                                value={selectedTask.index_dossier}
                                onChange={handleInputChange}
                                className="w-full max-w-md  mb-2 px-4 py-1 text-gray-700 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Entrez votre texte..."
                            />
                        </div>
                    </div>
                    <h3 className="text font-semibold mb-2">Déscription:</h3>
                    <textarea
                        type="text"
                        name='details'
                        value={selectedTask.details}
                        onChange={handleInputChange}
                        className="w-full resize-none max-w-md h-[200px] mb-2 px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Déscription détaillé"
                    />

                    <div className="flex flex-wrap gap-4 p-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedTask.etude}
                                onChange={() => handleCheckboxChange('etude')}
                                className="rounded text-blue-500"
                            />
                            <span>Etude</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedTask.dispatch_task}
                                onChange={() => handleCheckboxChange('dispatch_task')}
                                className="rounded text-blue-500"
                            />
                            <span>Dispach</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedTask.pre_visa}
                                onChange={() => handleCheckboxChange('pre_visa')}
                                className="rounded text-blue-500"
                            />
                            <span>Pré-visa</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedTask.saisie}
                                onChange={() => handleCheckboxChange('saisie')}
                                className="rounded text-blue-500"
                            />
                            <span>Saisie</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedTask.verification}
                                onChange={() => handleCheckboxChange('verification')}
                                className="rounded text-blue-500"
                            />
                            <span>Vérification/signature</span>
                        </label>
                    </div>
                    <div>
                        <h3 className="text font-semibold mb-2">Autre</h3>
                        <input
                            type="text"
                            name='autre'
                            value={selectedTask.autre}
                            onChange={handleInputChange}
                            className="w-full max-w-md  mb-2 px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Information complémentaire"
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        {
                            ok ?
                                <button
                                    onClick={handleSave}
                                    className="w-full flex px-4 py-2 bg-green-800 text-white rounded hover:bg-greeb-600 items-center justify-center"
                                >
                                    <ShieldCheck size={16} className='mr-2' />
                                    Modification réussi
                                </button> :
                                <button
                                    onClick={handleSave}
                                    className="w-full flex px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 items-center justify-center"
                                >
                                    <Save size={16} className='mr-2' />
                                    Sauvegarder
                                </button>
                        }
                    </div>
                    <p className='text-red-500'>{message}</p>
                </div>
            )}
        </>
    )
}

export default Popup