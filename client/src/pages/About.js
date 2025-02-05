import React from 'react'
import Navbar from '../components/Navbar';
import { useData } from '../components/DataContext';

function About() {
  const {user} = useData()
  return (
    <>

      <Navbar />
      <div className='full-h className="bg-gray-100 pt-20'>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Informations du profil
              </h2>
              {
                user ?  
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nom d'utilisateur</p>
                    <p className="mt-1 text-sm text-gray-900">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1 text-sm text-gray-900">{user.role === false ? "Utilisateur" : "Administrateur"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Membre depuis</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div> : 'Chargement...' 
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About