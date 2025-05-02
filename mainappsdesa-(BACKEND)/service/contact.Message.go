package service

import (
    "godesaapps/model"
    "godesaapps/repository"
)

type ContactMessageRequest struct {
    Name    string `json:"name"`
    Email   string `json:"email"`
    Message string `json:"message"`
}

type ContactMessageService interface {
    CreateMessage(req ContactMessageRequest) (model.ContactMessage, error)
    FindAll() ([]model.ContactMessage, error)
    DeleteMessage(id int) error // Tambahkan method DELETE
}

type contactMessageServiceImpl struct {
    Repo repository.ContactMessageRepository
}

func NewContactMessageService(repo repository.ContactMessageRepository) ContactMessageService {
    return &contactMessageServiceImpl{Repo: repo}
}

// CREATE contact message
func (s *contactMessageServiceImpl) CreateMessage(req ContactMessageRequest) (model.ContactMessage, error) {
    message := model.ContactMessage{
        Name:    req.Name,
        Email:   req.Email,
        Message: req.Message,
    }

    return s.Repo.Create(message)
}

// GET all contact messages
func (s *contactMessageServiceImpl) FindAll() ([]model.ContactMessage, error) {
    return s.Repo.FindAll()
}

// DELETE contact message by ID
func (s *contactMessageServiceImpl) DeleteMessage(id int) error {
    return s.Repo.DeleteByID(id)
}
