import React from 'react';
import Navbar from '../components/Navbar';

const Help = () => {
    return (
        <>
            <Navbar />
            <div className=' pt-20'>
                <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Aide et Support</h1>

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Foire Aux Questions (FAQ)</h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Réponses aux questions les plus fréquentes.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Comment ajouter un dossier ?</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            Pour ajouter un dossier, allez dans la section "Ajout dossier" et remplissez le formulaire. Suivez les étapes pour téléverser votre fichier.
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Comment supprimer un dossier ?</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            Pour supprimer un dossier, sélectionnez le dossier dans la liste et cliquez sur l'icône de corbeille. Confirmez la suppression.
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Comment modifier un dossier ?</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            Pour modifier un dossier, vous devez être admin de l'application.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Contactez-nous</h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Besoin d'aide supplémentaire ? Contactez notre équipe de support.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">support@gestiondocuments.com</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">+33 1 23 45 67 89</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Horaires d'ouverture</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Lundi - Vendredi, 9h - 18h</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;