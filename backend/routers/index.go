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

	route.POST("/logout", controllers.Logout)
	route.POST("/login", controllers.Login)
	route.POST("/customer/create", controllers.CreateCustomer)


	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)

}

func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())
	customer := middlewares.Authorization(100)
	// User customer management
	route.GET("/customer", controllers.GetAllCustomer)
	route.GET("/customer/:id", controllers.GetCustomer)
	route.PATCH("/customer/edit",customer, controllers.UpdateCustomer)
	route.DELETE("/customer/delete/:id",customer, controllers.DeleteCustomer)
	route.GET("/customer/gender", controllers.GetAllGender)
	route.GET("/customer/usertype", controllers.GetAllUserType)

	//history
	route.GET("/history/:id", controllers.GetAllHistory)



	//payment
	route.POST("/payment/create", controllers.CreatePayment)
	route.GET("/payment/deliverytype", controllers.GetDeliveryType)
	route.GET("/payment/paymenttype", controllers.GetPaymentType)

	//menu
	route.GET("/menu", controllers.GetAllMenu)
	route.POST("/menu/create",customer, controllers.CreateMenu)
	route.PATCH("/menu/update/:id",customer, controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id",customer, controllers.DeleteMenu)

	//order
	route.POST("/order/create", controllers.CreateOrder)
	route.DELETE("/order/delete/:id", controllers.DeleteOrder)

}
