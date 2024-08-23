import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

export default function Documentation() {
  return (
    <DefaultLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Documentation de l&apos;API Pharmacie</h1>
        <p className="mb-4">
          Bienvenue dans la documentation de l&apos;API Pharmacie. Cette API permet aux développeurs d&apos;accéder aux données des pharmacies et de gérer divers aspects liés aux stocks de médicaments.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Endpoints de l&apos;API</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.1 Récupérer toutes les pharmacies</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>GET /api/pharmacies</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Récupère la liste de toutes les pharmacies disponibles dans la base de données.
          </p>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
[
  {
    "id": "string",
    "name": "string",
    "address": "string",
    "description": "string",
    "imageUrl": "string"
  }
]
            `}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.2 Récupérer les détails d&apos;une pharmacie</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>GET /api/pharmacies/{'<pharmacyId>'}</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Récupère les détails d&apos;une pharmacie spécifique en fonction de l&apos;ID fourni.
          </p>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "id": "string",
  "name": "string",
  "address": "string",
  "description": "string",
  "imageUrl": "string"
}
            `}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.3 Récupérer le stock d&apos;une pharmacie</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>GET /api/pharmacies/{'<pharmacyId>'}/stock</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Récupère la liste des médicaments en stock pour une pharmacie spécifique.
          </p>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
[
  {
    "id": "string",
    "drug": {
      "code": "string",
      "category": "string",
      "name": "string"
    },
    "quantityInStock": "number"
  }
]
            `}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.4 Ajouter un nouveau médicament au stock</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>POST /api/pharmacies/{'<pharmacyId>'}/stock</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Ajoute un nouveau médicament au stock pour une pharmacie spécifique.
          </p>
          <p className="mb-2"><strong>Body de la requête:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "drug": {
    "code": "string",
    "category": "string",
    "name": "string"
  },
  "quantityInStock": "number"
}
            `}
          </pre>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "id": "string",
  "drug": {
    "code": "string",
    "category": "string",
    "name": "string"
  },
  "quantityInStock": "number"
}
            `}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.5 Mettre à jour les informations d&apos;un médicament</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>PUT /api/pharmacies/{'<pharmacyId>'}/stock/{'<stockId>'}</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Met à jour les informations d&apos;un médicament dans le stock pour une pharmacie spécifique.
          </p>
          <p className="mb-2"><strong>Body de la requête:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "quantityInStock": "number"
}
            `}
          </pre>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "id": "string",
  "drug": {
    "code": "string",
    "category": "string",
    "name": "string"
  },
  "quantityInStock": "number"
}
            `}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1.6 Supprimer un médicament du stock</h3>
          <p className="mb-2">
            <strong>URL:</strong> <code>DELETE /api/pharmacies/{'<pharmacyId>'}/stock/{'<stockId>'}</code>
          </p>
          <p className="mb-4">
            <strong>Description:</strong> Supprime un médicament du stock pour une pharmacie spécifique.
          </p>
          <p className="mb-2"><strong>Réponse:</strong></p>
          <pre className="bg-gray-100 p-4 rounded">
            {`
{
  "message": "Médicament supprimé avec succès"
}
            `}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mb-4">2. Gestion des erreurs</h2>
        <p className="mb-4">
          Les erreurs sont renvoyées avec des codes de statut HTTP appropriés et un message d&apos;erreur détaillé. Assurez-vous de gérer les erreurs dans vos requêtes API.
        </p>
        <pre className="bg-gray-100 p-4 rounded">
          {`
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
          `}
        </pre>

        <h2 className="text-2xl font-semibold mb-4">3. Authentification</h2>
        <p className="mb-4">
          Certains endpoints nécessitent une authentification. Assurez-vous d&apos;inclure un token d&apos;authentification valide dans les en-têtes de vos requêtes.
        </p>
        <pre className="bg-gray-100 p-4 rounded">
          {`
Authorization: Bearer <your-token>
          `}
        </pre>
      </div>
    </DefaultLayout>
  )
}
