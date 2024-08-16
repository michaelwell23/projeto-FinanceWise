package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bem-vindo ao servidor Go!")
	})
	port := ":8080"

	log.Printf("Servidor rodando na porta %s...", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
