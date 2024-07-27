package routers

import (
	"github.com/Autsada555/PJ480-React/backend/controllers"
	"github.com/Autsada555/PJ480-React/backend/middlewares"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	return gin.Default()
}

func InitRouter(route *gin.Engine) {

	route.Use(middlewares.CORS())

	route.POST("/logout/:role", controllers.Logout)
	route.POST("/login/:role", controllers.Login)

	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)
}

func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())

	// User account management
	route.GET("/customers", controllers.GetAllCustomer)
	route.GET("/customers/genders", controllers.GetAllGender)
	// route.GET("/employee/:id", controllers.GetEmployee)
	// route.GET("/customers/genders", controllers.GetAllGenders)

	//member
	route.GET("/menu", controllers.GetMenu)
	route.POST("/menu/create", controllers.CreateMenu)
	route.PATCH("/menu/edit/:id", controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id", controllers.DeleteMenu)
	// user := middlewares.Authorization(101)
	// user_admin := middlewares.Authorization(101, 100)
	// employee := middlewares.Authorization(200)

}
