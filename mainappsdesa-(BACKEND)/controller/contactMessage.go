package controller

import (
    "encoding/json"
    "net/http"
    "strconv"

    "godesaapps/service"
    "godesaapps/util"

    "github.com/julienschmidt/httprouter"
)

type ContactMessageController struct {
    Service service.ContactMessageService
}

func NewContactMessageController(service service.ContactMessageService) *ContactMessageController {
    return &ContactMessageController{
        Service: service,
    }
}

// POST: /api/contact/message
func (c *ContactMessageController) CreateMessage(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    var req service.ContactMessageRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    result, err := c.Service.CreateMessage(req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(result)
}

// GET: /api/contact/message
func (c *ContactMessageController) GetAllMessages(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    messages, err := c.Service.FindAll()
    if err != nil {
        http.Error(w, "Failed to fetch messages", http.StatusInternalServerError)
        return
    }
    util.WriteToResponseBody(w, messages)
}

// DELETE: /api/contact/message/:id
func (c *ContactMessageController) DeleteMessage(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    idParam := ps.ByName("id")
    id, err := strconv.Atoi(idParam)
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }

    err = c.Service.DeleteMessage(id)
    if err != nil {
        http.Error(w, "Failed to delete message", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Pesan berhasil dihapus",
    })
}
