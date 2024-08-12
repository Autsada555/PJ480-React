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

	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)

}

func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())
	customer := middlewares.Authorization(100)
	// User customer management
	route.GET("/customer/:id", controllers.GetCustomer)
	route.PATCH("/customer/edit", controllers.UpdateCustomer)
	route.DELETE("/customer/delete/:id", controllers.DeleteCustomer)

	//history
	route.GET("/history/:id", controllers.GetAllHistory)

	//checkpayment
	route.POST("/payment/create", controllers.CreatePayment)

	//delivery
	route.POST("/delivery/create", controllers.CreateDelivery)
	// route.GET("/address/:id", controllers.GetAddresss)

	//address
	route.GET("/address/:id", controllers.GetAddress)
	route.PATCH("/address/edit", controllers.UpdateAddress)

	//menu
	route.GET("/menu",customer, controllers.GetAllMenu)
	route.GET("/menu/:id", controllers.GetMenuByID)
	route.POST("/menu/create", controllers.CreateMenu)
	route.PATCH("/menu/update/:id", controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id", controllers.DeleteMenu)

	//checkpayment
	route.GET("/checkpayment", controllers.GetAllMenu)
	route.PATCH("/checkpayment/update/:id", controllers.UpdateMenu)

	//employee
	// route.GET("/gender/:id", controllers.GetAllGender)
	// route.GET("/emplyeetype/:id", controllers.GetAllEmployeeType)
	// route.PATCH("/employee/edit/:id", controllers.UpdateEmployee)
	// route.DELETE("/employee/delete/:id", controllers.DeleteEmployee)
	// route.POST("/employee/create", controllers.CreateEmployee)

	//order
	route.POST("/order/create", controllers.CreateOrder)
	route.DELETE("/order/delete/:id", controllers.DeleteOrder)

}
