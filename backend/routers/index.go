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
	route.GET("/customer/:id", controllers.GetCustomer)
	route.PATCH("/customer/edit", controllers.UpdateCustomer)
	route.DELETE("/customer/delete/:id", controllers.DeleteCustomer)

	route.GET("/history/:id", controllers.GetAllHistory)

	route.POST("/payment/create", controllers.CreatePayment)

	route.POST("/delivery/create", controllers.CreateDelivery)
	route.GET("/address/:id", controllers.GetAddresss)

	route.GET("/address/:id", controllers.GetAddress)
	route.PATCH("/address/edit", controllers.UpdateAddress)


	//menu
	route.GET("/menu", controllers.GetAllMenu)
	route.GET("/menu/:id", controllers.GetMenuByID)
	route.POST("/menu/create", controllers.CreateMenu)
	route.PATCH("/menu/update/:id", controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id", controllers.DeleteMenu)

	//checkpayment
	route.GET("/checkpayment", controllers.GetAllMenu)
	route.PATCH("/checkpayment/update/:id", controllers.UpdateMenu)
	// user := middlewares.Authorization(101)
	// user_admin := middlewares.Authorization(101, 100)
	// employee := middlewares.Authorization(200)

	route.GET("/gender/:id", controllers.GetAllGender)
	route.GET("/emplyeetype/:id", controllers.GetAllEmployeeType)
	route.PATCH("/employee/edit/:id", controllers.UpdateEmployee)
	route.DELETE("/employee/delete/:id", controllers.DeleteEmployee)
	route.POST("/employee/create", controllers.CreateEmployee)


}
