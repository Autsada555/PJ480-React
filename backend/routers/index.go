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
	route.POST("/login", controllers.Login)
	route.POST("/customer/create", controllers.CreateCustomer)


	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)

}

func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())
	customer := middlewares.Authorization(100,200,201,202)
	// User customer management
	route.GET("/customer",customer, controllers.GetAllCustomer)
	route.GET("/customer/:id",customer, controllers.GetCustomer)
	route.PATCH("/customer/edit",customer, controllers.UpdateCustomer)
	route.DELETE("/customer/delete/:id",customer, controllers.DeleteCustomer)
	route.GET("/customer/gender",customer, controllers.GetAllGender)
	route.GET("/customer/usertype",customer, controllers.GetAllUserType)

	//history
	route.GET("/history/:id", controllers.GetAllHistory)

	//checkpayment
	route.POST("/payment/create", controllers.CreatePayment)

	//delivery
	route.POST("/delivery/create", controllers.CreateDelivery)
	
	//menu
	route.GET("/menu",customer, controllers.GetAllMenu)
	route.POST("/menu/create",customer, controllers.CreateMenu)
	route.PATCH("/menu/update/:id",customer, controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id",customer, controllers.DeleteMenu)

	//order
	route.POST("/order/create", controllers.CreateOrder)
	route.DELETE("/order/delete/:id", controllers.DeleteOrder)

}
