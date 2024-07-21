package entity

import (
	"github.com/Autsada555/PJ480-React/backend/utils"
	"gorm.io/gorm"
)

func (u *Customer) BeforeCreate(tx *gorm.DB) (err error) {
	// hash password
	hashPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashPassword
	return
}

func (u *Employee) BeforeCreate(tx *gorm.DB) (err error) {
	// hash password
	hashPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashPassword
	return
}
