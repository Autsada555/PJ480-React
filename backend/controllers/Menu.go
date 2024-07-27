package controllers

import (
	"net/http"
	// "time"

	// "strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	// "gorm.io/gorm/clause"
)

func GetAllMenu(c *gin.Context) {
	var menu []entity.Menu
	if err := entity.DB().Raw(`SELECT * From menus`).Scan(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}

func GetMenuByID(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("DiseaseType").Preload("MenuType").Raw("SELECT * FROM menus WHERE id = ?", id).Find(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}

func CreateMenu(c *gin.Context) {
	var menu entity.Menu

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Menu successfully"})
}

func UpdateMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Table("menus").Where("id = ?", id).Updates(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your menu successfully"})
}

func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "delete menu success"})
}