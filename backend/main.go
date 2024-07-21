package main

import (
	// `github.com/gin-gonic/gin`
	`github.com/Autsada555/PJ480-React/backend/routers`
	"github.com/Autsada555/PJ480-React/backend/entity"
)

func main() {
	entity.SetupDatabase("DSDB")
	entity.SetupData(entity.DB())
	route := routers.SetupRouter()

	// init Routes
	routers.InitRouter(route)

	// Run the server
	route.Run()
}