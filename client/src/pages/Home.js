import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Check, Ellipsis, Eye, Trash2, X } from 'lucide-react';
import Popup from '../components/Popup';
import { useData } from '../components/DataContext';
import Document from '../components/Document';

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false)
  const [confirmationId, setConfirmationId] = useState(null);

  const capitalize = (str) => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return ''
    }
  };

  const { setSelectedTask, setIsPopupOpen, setIsDocumentOpen, setSelectedDocument, setOk,
    documents, setDocuments, filteredDocuments, setActiveFilter, activeFilter, user } = useData()

  const documentsEnCours = documents.filter(doc => doc.depart === false).length;
  const documentsTermines = documents.filter(doc => doc.depart === true).length;

  const handleDetailsClick = (task) => {
    setOk(false)
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/documents');
        if (response.ok) {
          const d = await response.json();
          setDocuments(d.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [setDocuments]);

  useEffect(() => {
    if (user) {
      const role = user.role
      if (role === true) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    } else {
      return
    }

  }, [user])

  const getDocument = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/documents/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du document');
      }
      const d = await response.json();
      setSelectedDocument(d.data);
      setIsDocumentOpen(true);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDocumentClick = (id) => {
    setConfirmationId(id);
};

  const handleDeleteDocument = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      } else {
        setDocuments(documents.filter(item => item.id !== id));
        setConfirmationId(null);
      }

    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 pt-5">
      <Navbar />
      <div className='pt-20'>
        <p className='text-3xl font-bold mt-10 ml-40'>Dashboard</p>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-6'>
          <div className='bg-white shadow sm:rounded-lg'>
            <p className='text-2xl pl-10 pt-5 mt-5'>Filtre</p>
            <div className="flex justify-center items-center mt-5 gap-4 pb-6">
              <div className={`rounded-lg ${activeFilter === 'Tous' ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-300 to-blue-400'} 
              p-6 text-white shadow-lg w-60 hover:cursor-pointer`}
                onClick={() => { setActiveFilter('Tous') }}>
                <div className="text-sm font-medium opacity-80">Documents</div>
                <div className="text-2xl font-bold mt-1">Tous</div>
              </div>

              <div className={`rounded-lg ${activeFilter === 'En cours' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-purple-300 to-purple-400'}
              p-6 text-white shadow-lg w-60 hover:cursor-pointer`}
                onClick={() => { setActiveFilter('En cours') }}>
                <div className="text-sm font-medium opacity-80">Documents</div>
                <div className="text-2xl font-bold mt-1">En cours</div>
              </div>

              <div className={`rounded-lg ${activeFilter === 'Terminés' ? 'bg-gradient-to-br from-green-600 to-green-800' : 'bg-gradient-to-br from-green-300 to-green-400'}
               p-6 text-white shadow-lg w-60 hover:cursor-pointer`}
                onClick={() => { setActiveFilter('Terminés') }}>
                <div className="text-sm font-medium opacity-80">Documents</div>
                <div className="text-2xl font-bold mt-1">Terminés</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-5 items-center'>
          <p className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full border border-blue-300">
            Nombre total de dossier: {documents.length}
          </p>
          <p className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full border border-violet-300">
            Dossier en cours de traitement : {documentsEnCours}
          </p>
          <p className="px-4 py-2 bg-green-100 text-green-800 rounded-full border border-green-300">
            Dossier validé : {documentsTermines}
          </p>
        </div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className='bg-white shadow sm:rounded-lg pb-10'>
            <p className='text-2xl p-10'>Liste des documents</p>
            <div className="px-8">
              {
                error ? <p className="text-center p-4">{error}</p> :
                  loading ? <p className="text-center p-4">Loading...</p> :
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-center p-3">Dossiers</th>
                          <th className="text-center p-3">Etude</th>
                          <th className="text-center p-3">Dispach</th>
                          <th className="text-center p-3">Pré-visa</th>
                          <th className="text-center p-3">Saisie</th>
                          <th className="text-center p-3">Vérif/signature</th>
                          <th className="text-center p-3">Départ</th>
                          <th className={visible ? "text-center p-3" : "hidden"}>MAJ</th>
                          <th className="text-center p-3">Rendu</th>
                          <th className="text-center p-3">Supprimer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.length > 0 ? filteredDocuments.map((doc, index) => (
                          <tr key={index} className="border-b">
                            <td className="text-center p-3">{capitalize(doc.nom)}</td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.etude ? (
                                  <Check className="text-green-500" size={20} />
                                ) : (
                                  <X className="text-red-500" size={20} />
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.etude_date ? new Date(doc.etude_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.dispatch_task ? (
                                  <Check className="text-green-500" size={20} />
                                ) : (
                                  <X className="text-red-500" size={20} />
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.dispatch_task_date ? new Date(doc.dispatch_task_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.pre_visa ? (
                                  <Check className="text-green-500" size={20} />
                                ) : (
                                  <X className="text-red-500" size={20} />
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.pre_visa_date ? new Date(doc.pre_visa_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.saisie ? (
                                  <Check className="text-green-500" size={20} />
                                ) : (
                                  <X className="text-red-500" size={20} />
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.saisie_date ? new Date(doc.saisie_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.verification ? (
                                  <Check className="text-green-500" size={20} />
                                ) : (
                                  <X className="text-red-500" size={20} />
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.verification_date ? new Date(doc.verification_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className="p-3">
                              <div className='flex justify-center mb-2'>
                                {doc.depart ? (
                                  <p className='text-white bg-green-600 px-4 py-1'>Prêt</p>
                                ) : (
                                  <p className='text-white bg-red-600 px-4 py-1'>En attente</p>
                                )}
                              </div>
                              <p className='text-center text-sm italic text-blue-600'>
                                {
                                  doc.depart_date ? new Date(doc.depart_date).toLocaleDateString('fr-FR') : '-'
                                }
                              </p>
                            </td>
                            <td className={visible ? "p-3 text-blue-500 hover:underline" : "hidden"}>
                              <div className='flex justify-center mb-2'>
                                <Ellipsis size={20} className='cursor-pointer'
                                  onClick={() => handleDetailsClick(doc)} />
                              </div>
                            </td>
                            <td className="p-3 text-blue-500 hover:underline">
                              <div className='flex justify-center'>
                                <Eye size={20} className='cursor-pointer'
                                  onClick={() => getDocument(doc.id)} />
                              </div>
                            </td>
                            <td className="p-3 italic">
                              <div className="flex justify-center">
                                {confirmationId !== doc.id ? (
                                  <button
                                    onClick={() => handleDocumentClick(doc.id)}
                                    className="text-gray-600 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 size={20} />
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2 animate-fadeIn">
                                    <button
                                      onClick={() => {
                                        handleDeleteDocument(doc.id)
                                        setConfirmationId(null)
                                      }}
                                      className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                                    >
                                      Confirmer
                                    </button>
                                    <button
                                      onClick={() => setConfirmationId(null)}
                                      className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                    >
                                      Annuler
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )) : <p className='py-4'>Aucun élement à afficher</p>}
                      </tbody>
                    </table>
              }

            </div>
          </div>
        </div>
      </div>
      <Popup />
      <Document />
    </div>
  );
};

export default Home;