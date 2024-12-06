package entity

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID uint `gorm:"primarykey"`

	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Gender struct { //
	BaseModel
	Name string `gorm:"unique"`
}

type MenuType struct { //
	BaseModel
	Name string `gorm:"unique"`
}

type DiseaseType struct { //
	BaseModel
	Name string `gorm:"unique"`
}

type StatusType struct { //
	BaseModel
	Name string `gorm:"unique"`
}

type UserType struct { //
	BaseModel
	Name string `gorm:"unique"`
}

type User struct { //
	BaseModel

	FirstName string `gorm:"default:ชื่อ"`
	LastName  string `gorm:"default:นามสกุล"`
	Email     string `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Password  string `valid:"required~Password is required,minstringlength(8)~Password must be at least 8 characters"`
	Phone     string `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	UserName  string `valid:"required~UserName is required,minstringlength(5)~UserName must be at 5 characters" gorm:"unique"`
	Address   string `gorm:"default:ที่อยู่"`

	GenderID uint
	Gender   *Gender `gorm:"foreignKey:GenderID"`

	UserTypeID uint
	UserType   *UserType `gorm:"foreignKey:UserTypeID"`
}

type Order struct { //
	BaseModel
	Quantity     int     `gorm:"unique"`
	TotalAmount  float32 `gorm:"unique"`
	DateDelivery time.Time
	Eslip	string `gorm:"type:longtext"`
	Delivery   string 

	Menu []Menu `gorm:"many2many:order_menu"`

	UserID uint
	User   *User `gorm:"foreignKey:UserID"`

	StatusTypeID uint
	StatusType   *StatusType `gorm:"foreignKey:StatusTypeID"`
}

type Menu struct {
	BaseModel
	Name        string
	Cost        float32
	Description string
	Component   []string `gorm:"serializer:json"`
	MenuImage   string   `gorm:"type:longtext"`

	DiseaseType []DiseaseType `gorm:"many2many:menu_disease_types"`

	MenuTypeID uint
	MenuType   *MenuType `gorm:"foreignKey:MenuTypeID"`
}
