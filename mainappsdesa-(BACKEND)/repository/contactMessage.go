package repository

import (
    "database/sql"
    "godesaapps/model"
)

type ContactMessageRepository interface {
    Create(message model.ContactMessage) (model.ContactMessage, error)
    FindAll() ([]model.ContactMessage, error)
    DeleteByID(id int) error // Tambahkan method untuk DELETE
}

type contactMessageRepositoryImpl struct {
    DB *sql.DB
}

func NewContactMessageRepository(db *sql.DB) ContactMessageRepository {
    return &contactMessageRepositoryImpl{DB: db}
}

// CREATE contact message
func (repo *contactMessageRepositoryImpl) Create(message model.ContactMessage) (model.ContactMessage, error) {
    query := "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)"
    result, err := repo.DB.Exec(query, message.Name, message.Email, message.Message)
    if err != nil {
        return model.ContactMessage{}, err
    }

    id, err := result.LastInsertId()
    if err != nil {
        return model.ContactMessage{}, err
    }

    message.ID = int(id)
    return message, nil
}

// GET all contact messages
func (repo *contactMessageRepositoryImpl) FindAll() ([]model.ContactMessage, error) {
    query := "SELECT id, name, email, message FROM contact_messages"
    rows, err := repo.DB.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var messages []model.ContactMessage
    for rows.Next() {
        var msg model.ContactMessage
        err := rows.Scan(&msg.ID, &msg.Name, &msg.Email, &msg.Message)
        if err != nil {
            return nil, err
        }
        messages = append(messages, msg)
    }

    return messages, nil
}

// DELETE contact message by ID
func (repo *contactMessageRepositoryImpl) DeleteByID(id int) error {
    query := "DELETE FROM contact_messages WHERE id = ?"
    _, err := repo.DB.Exec(query, id)
    return err
}
