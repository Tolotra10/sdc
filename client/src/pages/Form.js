import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Check } from 'lucide-react';

function Form() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showPopup = () => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1500);
    };

    const [formData, setFormData] = useState({
        nom: '',
        numero: '',
        date_arrivee: '',
        affn: '',
        index_dossier: '',
        arr: '',
        details: '',
        autre: '',
        etude: false,
        dispatch_task: false,
        pre_visa: false,
        saisie: false,
        verification: false,
        depart: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:3001/api', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    // Ajoutez ici votre token d'authentification si nécessaire
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.data.success) {
                showPopup()
                setFormData({
                    nom: '',
                    numero: '',
                    date_arrivee: '',
                    affn: '',
                    index_dossier: '',
                    arr: '',
                    details: '',
                    autre: '',
                    etude: false,
                    dispatch_task: false,
                    pre_visa: false,
                    saisie: false,
                    verification: false,
                    depart: false
                })
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='full-h pt-20'>
                <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                    <h3 className='text-2xl font-semibold py-5 text-center'>Ajouter un dossier</h3>

                    {/* Affichage des erreurs */}
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="min-h-screen p-6">
                        <form onSubmit={handleSubmit}
                            className="max-w-4xl mx-auto p-6 space-y-6 rounded-lg shadow-lg border border-cornflower-200">
                            {/* Première rangée */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Numéro</label>
                                    <input
                                        type="number"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Deuxième rangée */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Date d'arrivée</label>
                                    <input
                                        type="date"
                                        name="date_arrivee"
                                        value={formData.date_arrivee}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">AFFN</label>
                                    <input
                                        type="text"
                                        name="affn"
                                        value={formData.affn}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Troisième rangée */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Index dossier</label>
                                    <input
                                        type="text"
                                        name="index_dossier"
                                        value={formData.index_dossier}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">ARR</label>
                                    <input
                                        type="text"
                                        name="arr"
                                        value={formData.arr}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Détails et Autre */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Détails</label>
                                    <input
                                        type="text"
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cornflower-900">Autre</label>
                                    <input
                                        type="text"
                                        name="autre"
                                        value={formData.autre}
                                        onChange={handleChange}
                                        className="mt-1 h-12 block w-full rounded-md border-cornflower-300 shadow-sm focus:border-cornflower-500 focus:ring-cornflower-500 bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Cases à cocher */}
                            <div className="flex flex-wrap gap-6 pt-4 border-t border-cornflower-200">
                                {[
                                    { name: 'etude', label: 'Étude' },
                                    { name: 'dispatch_task', label: 'Dispatch' },
                                    { name: 'pre_visa', label: 'Pré-visa' },
                                    { name: 'saisie', label: 'Saisie' },
                                    { name: 'verification', label: 'Vérification' }
                                ].map((checkbox) => (
                                    <label key={checkbox.name} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name={checkbox.name}
                                            checked={formData[checkbox.name]}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-cornflower-600 border-cornflower-300 rounded focus:ring-cornflower-500"
                                        />
                                        <span className="text-sm text-cornflower-900">{checkbox.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full md:w-auto px-6 py-3 bg-cornflower-600 text-white rounded-md 
                                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cornflower-700'} 
                                    focus:outline-none focus:ring-2 focus:ring-cornflower-500 focus:ring-offset-2`}
                                >
                                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={() => { setIsVisible(false) }}>
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
                        <p className="text-gray-600 mb-6">
                            Document ajouté avec succès
                        </p>

                        <div className="flex justify-end space-x-3">
                            <Check size={30} className="text-green-500" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Form;