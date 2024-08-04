package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/Autsada555/PJ480-React/backend/utils"
	"github.com/gin-gonic/gin"
)

var role_data = map[string]struct {
	TokenName string
	Hour      int
}{
	"customer": {
		TokenName: "utk",
		Hour:      24 * 7,
	},

	"admin": {
		TokenName: "etk",
		Hour:      24,
	},
	"cash": {
		TokenName: "etk",
		Hour:      24,
	},
	"delivery": {
		TokenName: "etk",
		Hour:      24,
	},
}

type LoginPayload struct {
	EmailOrUsername string `binding:"required"`
	Password        string `binding:"required"`
}
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

func Logout(c *gin.Context) {
	role := c.Param("role")
	if role != "customer" && role != "admin" && role != "cash" && role != "deliver" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	data := role_data[role]
	c.SetCookie(data.TokenName, "", -1, "/", utils.GetConfig().ORIGIN, false, true)
	c.JSON(http.StatusOK, gin.H{"data": "you have been logged out"})
}

func Login(c *gin.Context) {
	var temp struct {
		Password string
	}
	var payload LoginPayload
	var errBindJSON = c.ShouldBindJSON(&payload)
	if errBindJSON != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}
	
	base_query := entity.DB().Table("users").Where("email = ? or user_name = ? ", payload.EmailOrUsername, payload.EmailOrUsername)

	// เลือกเฉพาะ email และ password จากตารางมาตรวจสอบ
	if err := entity.DB().Table("users").Where("email = ? or user_name = ? ", payload.EmailOrUsername, payload.EmailOrUsername).Select("password").First(&temp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบว่า password ตรงกันหรือไม่
	if err := utils.VerifyPassword(payload.Password, temp.Password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password not match"})
		return
	}

	var value entity.User
	if err := base_query.InnerJoins("UserType").InnerJoins("Gender").Omit("password").First(&value).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := role_data[value.UserType.Name]
	generateJWT,errJWT := utils.GenerateJWT(data.TokenName, c, payload.EmailOrUsername	, data.Hour); 
	if errJWT != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "token could not be created"})
		return
	}
	tokenResponse := LoginResponse{
		Token: generateJWT,
		ID:   value.UserTypeID,
	}
	if err := utils.SetActiveJWT(c, data.TokenName, data.Hour); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "token could not be created"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":tokenResponse})
}
