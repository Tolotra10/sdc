import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {

  const [documents, setDocuments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isDocumentOpen, setIsDocumentOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState({})
  const [ok, setOk] = useState(false)
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isLoading, setIsLoading] = useState(true);

  const filteredDocuments = documents
    .filter(doc => {
        // Filtre par statut
        switch (activeFilter) {
            case 'En cours':
                return doc.depart === false;
            case 'Terminés':
                return doc.depart === true;
            default:
                return true;
        }
    })
    .filter(doc => 
        // Filtre par recherche
        doc.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token'); // Récupérez le token du localStorage
        if (!token) {
          setIsLoading(false);
          return;
        }
  
        try {
          const response = await fetch('http://localhost:3001/api/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Incluez le token dans les en-têtes
            },
          });
  
          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Mettez à jour l'état de l'utilisateur
            localStorage.setItem('user', JSON.stringify(userData)); // Mettez à jour le localStorage
          } else {
            const errorData = await response.json();
            console.error(errorData.error || 'Une erreur est survenue');
            localStorage.removeItem('user'); // Effacez les données en cache en cas d'erreur
          }
        } catch (error) {
          console.error('Erreur de connexion au serveur', error);
          localStorage.removeItem('user'); // Effacez les données en cache en cas d'erreur
        } finally {
          setIsLoading(false); // Arrêtez le chargement une fois que la requête est terminée
        }
      };
  
      checkAuth();
    }, []);
    
    const handleReload = () =>{
        setIsPopupOpen(false);
        window.location.reload(); 
    }

  return (
    <DataContext.Provider value={{ 
      isPopupOpen,setIsPopupOpen,selectedTask,setSelectedTask,isDocumentOpen,setIsDocumentOpen,
      selectedDocument,setSelectedDocument,ok,setOk,documents,setDocuments,user, setUser,searchTerm,setSearchTerm,
      filteredDocuments,setActiveFilter,activeFilter, handleReload, isLoading,setIsLoading
         }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);