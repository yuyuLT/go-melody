package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"
)

func main() {
	r := gin.Default()
	m := melody.New()

	r.Static("/js", "src/js/")
	r.Static("/css", "src/css/")

	r.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "src/index.html")
	})

	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		m.Broadcast(msg)
	})

	r.Run(":3150")
}
