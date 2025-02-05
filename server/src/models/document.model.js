const pool = require('../config/database');

class Document {
    static async create(documentData) {
        const {
            nom, numero, date_arrivee, affn, index_dossier, arr,
            details, autre, etude, dispatch_task, pre_visa, saisie,
            verification
        } = documentData;
    
        // Vérifie si toutes les étapes sont complétées
        const departStatus = etude && dispatch_task && pre_visa && saisie && verification;
    
        const query = `
            INSERT INTO documents (
                nom, numero, date_arrivee, affn, index_dossier, arr,
                details, autre, etude, dispatch_task, pre_visa, saisie,
                verification, depart
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *
        `;
    
        const values = [
            nom, numero, date_arrivee, affn, index_dossier, arr,
            details, autre, etude, dispatch_task, pre_visa, saisie,
            verification, departStatus
        ];
    
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM documents WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, documentData) {
        const {
            nom, numero, date_arrivee, affn, index_dossier, arr,
            details, autre, etude, dispatch_task, pre_visa, saisie,
            verification,etude_date,dispatch_task_date, pre_visa_date,saisie_date,
             verification_date,depart_date
        } = documentData;
    
        // Vérifie si toutes les étapes sont complétées
        const departStatus = etude && dispatch_task && pre_visa && saisie && verification;
    
        const query = `
            UPDATE documents 
            SET nom = $1,
                numero = $2,
                date_arrivee = $3,
                affn = $4,
                index_dossier = $5,
                arr = $6,
                details = $7,
                autre = $8,
                etude = $9,
                dispatch_task = $10,
                pre_visa = $11,
                saisie = $12,
                verification = $13,
                depart = $14,
                etude_date = $15,
                dispatch_task_date = $16,
                pre_visa_date = $17,
                saisie_date = $18,
                verification_date = $19,
                depart_date = $20,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $21
            RETURNING *
        `;
    
        const values = [
            nom, numero, date_arrivee, affn, index_dossier, arr,
            details, autre, etude, dispatch_task, pre_visa, saisie,
            verification, departStatus, etude_date, dispatch_task_date,
            pre_visa_date, saisie_date, verification_date, depart_date, id
        ];
    
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Document;