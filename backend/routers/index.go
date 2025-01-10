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

	route.POST("/logout/:id", controllers.Logout)
	route.POST("/login", controllers.Login)
	route.POST("/customer/create", controllers.CreateCustomer)
	route.GET("/customer/gender", controllers.GetAllGender)
	route.GET("/customer/usertype", controllers.GetAllUserType)
	route.DELETE("/customer/delete/:id", controllers.DeleteCustomer)
	route.GET("/customer/", controllers.GetCustomer)
	route.GET("/customer/:id", controllers.GetCustomerByID)
	// route.PATCH("/customer/edit/:id",controllers.UpdateCustomerByID)
	route.PATCH("/customer/edit/:id", controllers.UpdateCustomer)

	authRouter := route.Group("/")
	initRequiredAuthRouter(authRouter)

}

func initRequiredAuthRouter(route *gin.RouterGroup) {
	route.Use(middlewares.Authentication())
	// customer := middlewares.Authorization(100)
	requireAdmin := middlewares.RequireAdmin()
	requireCash := middlewares.RequireCash()
	// requireDelivery := middlewares.RequireDelivery()
	// User customer management
	route.GET("/customer", controllers.GetAllCustomer)

	//menu
	route.GET("/menus" , requireAdmin, controllers.GetMenu)
	route.GET("/menu/:id", controllers.GetMenuByDiseaseID)
	route.POST("/menu/create", controllers.CreateMenu)
	route.PATCH("/menu/update/:id", controllers.UpdateMenu)
	route.DELETE("/menu/delete/:id", controllers.DeleteMenu)

	//menu type
	route.GET("/menutypes", controllers.Menutypes)

	//order
	route.GET("/order", controllers.GetAllOrder)
	route.GET("/order/:id", controllers.GetOrderByID)
	route.POST("/order/create", controllers.CreateOrder)
	route.PATCH("/order/cancel/:id", controllers.CancelOrder)
	route.PATCH("/order/statuspayment/:id/:status_payment_type_id", requireCash, controllers.CheckPayment)
	route.PATCH("/order/:id/:status_order_type_id", controllers.ReceiveOrder)

	route.GET("/disease", controllers.GetDiseases)

	//status
	route.GET("/statuspayment", controllers.ListStatusPaymentTypes)
}
