package model

type ContactMessage struct {
    ID      int    `json:"id"`
    Name    string `json:"name"`
    Email   string `json:"email"`
    Message string `json:"message"`
}

// type ContactMessage struct {
//     ID      int    `json:"id"`
//     Name    string `json:"name"`
//     Email   string `json:"email"`
//     Message string `json:"message"`
// }


