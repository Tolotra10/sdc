import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, FileText, Trash2 } from 'lucide-react';
import { useData } from './DataContext';
import { usePDF } from 'react-to-pdf'

const Document = () => {

    const [isSuppr, setIsSuppr] = useState(false);
    const { setIsDocumentOpen, isDocumentOpen, selectedDocument, setDocuments, filteredDocuments } = useData()
    const date = new Date(selectedDocument.date_arrivee)
    const dateArr = new Date(selectedDocument.depart_date)
    const jour_depart = date.getDate();
    const jour_arrivee = dateArr.getDate();
    const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const mois_depart = mois[date.getMonth()]; 
    const mois_arrivee = mois[dateArr.getMonth()]; 
    const annee_arrivee = dateArr.getFullYear();
    const annee_depart = date.getFullYear();
    const date_depart = `${jour_arrivee} ${mois_arrivee} ${annee_arrivee}`;
    const date_arrivee = `${jour_depart} ${mois_depart} ${annee_depart}`;

    const handleDeleteDocument = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/documents/${selectedDocument.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                await Promise.all([
                    setIsDocumentOpen(false),
                    setDocuments(filteredDocuments.filter(item => item.id !== selectedDocument.id))
                ]);
            } else {
                throw new Error('Erreur lors de la suppression');
            }

        } catch (error) {
            console.error('Erreur:', error);
            // Gérer l'erreur (afficher un message à l'utilisateur)
        }
    };
    const handleCancel = () => {
        setIsSuppr(false);
    };

    const { toPDF, targetRef } = usePDF({ filename: selectedDocument?.nom || '_page.pdf' });

    return (
        <AnimatePresence>
            {isDocumentOpen && selectedDocument && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsDocumentOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                        ref={targetRef}
                        className="fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
                        w-[900px] h-[90vh] bg-white rounded-xl shadow-xl z-50 flex flex-col "
                    >

                        <div className='overflow-y-scroll bg-gray-50 rounded-lg shadow-sm'>
                            <div className="p-6 border-b border-gray-200 bg-white">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Dossier n° {selectedDocument.numero}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto p-6 bg-white">
                                <p className='text-lg mb-4 text-gray-700'><span className='font-semibold text-gray-900'>Index du Dossier: </span>{selectedDocument.index_dossier}</p>
                                <p className='text-lg mb-4 text-gray-700'><span className='font-semibold text-gray-900'>Nom du Dossier: </span>{selectedDocument.nom}</p>
                                <p className='text-lg mb-4 text-gray-700'><span className='font-semibold text-gray-900'>Date d'arrivée: </span>{date_arrivee}</p>
                                <p className='text-lg mb-4 text-gray-700'><span className='font-semibold text-gray-900'>AFFN: </span>{selectedDocument.affn}</p>
                                <p className='text-lg mb-4 text-gray-700'><span className='font-semibold text-gray-900'>ARR: </span>{selectedDocument.arr}</p>

                                <p className='text-lg font-semibold text-gray-900 mt-6 mb-2'>Description :</p>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {selectedDocument.details}
                                </p>

                                <p className='text-lg font-semibold text-gray-900 mt-6 mb-2'>Informations complémentaires :</p>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {selectedDocument.autre}
                                </p>

                                <p className='text-lg font-semibold text-gray-900 mt-6 mb-4'>Etat du document :</p>
                                <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-100">
                                        <tr className="border-b border-gray-200">
                                            <th></th>
                                            <th className="text-center p-3 text-sm font-semibold text-gray-700">Etude</th>
                                            <th className="text-center p-3 text-sm font-semibold text-gray-700">Dispach</th>
                                            <th className="text-center p-3 text-sm font-semibold text-gray-700">Pré-visa</th>
                                            <th className="text-center p-3 text-sm font-semibold text-gray-700">Saisie</th>
                                            <th className="text-center p-3 text-sm font-semibold text-gray-700">Vérif/signature</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className='p-3'>
                                                <p className='mb-5 font-semibold'>Etat</p>
                                                <p className='font-semibold'>Date de modification</p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex justify-center mb-5'>
                                                    {selectedDocument.etude ? (
                                                        <Check size={20} className="text-green-500" />
                                                    ) : (
                                                        <X size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <p className='text-center'>
                                                    {selectedDocument.etude_date ? new Date(selectedDocument.etude_date).toLocaleDateString('fr-FR') : 'non modifié'}
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex justify-center mb-5'>
                                                    {selectedDocument.dispatch_task ? (
                                                        <Check size={20} className="text-green-500" />
                                                    ) : (
                                                        <X size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <p className='text-center'>
                                                    {selectedDocument.dispatch_task_date ? new Date(selectedDocument.dispatch_task_date).toLocaleDateString('fr-FR') : 'non modifié'}
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex justify-center mb-5'>
                                                    {selectedDocument.pre_visa ? (
                                                        <Check size={20} className="text-green-500" />
                                                    ) : (
                                                        <X size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <p className='text-center'>
                                                    {selectedDocument.pre_visa_date ? new Date(selectedDocument.pre_visa_date).toLocaleDateString('fr-FR') : 'non modifié'}
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex justify-center mb-5'>
                                                    {selectedDocument.saisie ? (
                                                        <Check size={20} className="text-green-500" />
                                                    ) : (
                                                        <X size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <p className='text-center'>
                                                    {selectedDocument.saisie_date ? new Date(selectedDocument.saisie_date).toLocaleDateString('fr-FR') : 'non modifié'}
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex justify-center mb-5'>
                                                    {selectedDocument.verification ? (
                                                        <Check size={20} className="text-green-500" />
                                                    ) : (
                                                        <X size={20} className="text-red-500" />
                                                    )}
                                                </div>
                                                <p className='text-center'>
                                                    {selectedDocument.verification_date ? new Date(selectedDocument.verification_date).toLocaleDateString('fr-FR') : 'non modifié'}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className={`text-lg font-semibold mt-6 ${selectedDocument.depart ? 'text-green-600' : 'text-blue-600'}`}>
                                    {selectedDocument.depart === true ?
                                        'Départ validé le ' + date_depart :
                                        'Document en cours de traitement...'}
                                </p>
                            </div>
                        </div>

                        <div className='absolute right-[-220px] top-[50px]'>

                            <button
                                onClick={() => setIsDocumentOpen(false)}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors ml-2"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                            <div className='flex mt-10'>
                                <button className='flex text-white px-6 py-3 bg-green-600 hover:bg-green-500 rounded-full'
                                    onClick={() => toPDF()}>
                                    <FileText /> &nbsp; PDF
                                </button>
                            </div>
                            <div className='flex mt-10'>
                                <button className='flex text-white px-6 py-3 bg-red-400 hover:bg-red-300 rounded-full'
                                    onClick={() => { setIsSuppr(true) }}>
                                    <Trash2 /> &nbsp; Supprimer le dossier
                                </button>
                            </div>

                            {
                                isSuppr ?
                                    <div className='flex mt-5 gap-5'>
                                        <button className='flex text-white px-6 py-2 bg-green-400 hover:bg-green-300 rounded-full'
                                            onClick={handleDeleteDocument}>
                                            oui
                                        </button>
                                        <button className='flex text-white px-6 py-2 bg-gray-400 hover:bg-gray-300 rounded-full'
                                            onClick={handleCancel}>
                                            non
                                        </button>
                                    </div>
                                    : ''
                            }
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Document;