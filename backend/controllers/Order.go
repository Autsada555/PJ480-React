package controllers

import (
	// "fmt"
	"net/http"
	"time"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	// "gorm.io/gorm/clause"
)

type Order struct {
	Quantity     int       `json:"Quantity"`
	TotalAmount  int       `json:"TotalAmount"`
	DateDelivery time.Time `json:"DateDelivery"`
	Eslip        string    `json:"Eslip"`
	Delivery     string    `json:"Delivery"`
	Menu         []struct {
		Menu struct {
			ID          int      `json:"ID"`
			Name        string   `json:"Name"`
			Cost        int      `json:"Cost"`
			Description string   `json:"Description"`
			Component   []string `json:"Component"`
			MenuImage   string   `json:"MenuImage"`
			DiseaseType []struct {
				ID   int    `json:"ID"`
				Name string `json:"Name"`
			} `json:"DiseaseType"`
			MenuTypeID int `json:"MenuTypeID"`
			MenuType   struct {
				ID   int    `json:"ID"`
				Name string `json:"Name"`
			} `json:"MenuType"`
		} `json:"Menu"`
		Quantity int    `json:"Quantity"`
		Details  string `json:"details"`
	} `json:"Menu"`
	StatusTypeID int `json:"StatusTypeID"`
	UserID       int `json:"UserID"`
}

func CreateOrder(c *gin.Context) {
	var preload Order

	if err := c.ShouldBindJSON(&preload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(preload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var menus []entity.Menu
	var menuname []string
	for _, menu := range preload.Menu {
		menuname = append(menuname, menu.Menu.Name)
	}

	if err := entity.DB().Where("name IN ?", menuname).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order := entity.Order{
		Quantity:     preload.Quantity,
		TotalAmount:  preload.TotalAmount,
		DateDelivery: preload.DateDelivery,
		Eslip:        preload.Eslip,
		Delivery:     preload.Delivery,
		Menu:         menus,
		UserID:       uint(preload.UserID),
		StatusTypeID: uint(preload.StatusTypeID),
	}
	if err := entity.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": preload})

	// c.JSON(http.StatusCreated, gin.H{"data": "Create Order  Successfully"})
}

func CancelOrder(c *gin.Context) {
	var order entity.Order

	id := c.Param("id")
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ShouldBindJSON"})
		return
	}

	if _, err := govalidator.ValidateStruct(order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "govalidator"})
		return
	}

	if err := entity.DB().Table("users").Where("id = ?", id).Save(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"map"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Update Order Successfully"})
}

func GetAllOrder(c *gin.Context) {
	var customers []entity.Order

	if err := entity.DB().
		Preload("Menu").Preload("StatusType").Preload("User").
		Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customers})
}

func GetOrderByID(c *gin.Context) {
	var order []entity.Order
	orderID := c.Param("id")

	if err := entity.DB().
		Preload("Menu").Preload("StatusType").Preload("User").
		Where("user_id = ?", orderID).
		Find(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}
