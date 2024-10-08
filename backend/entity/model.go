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

type Gender struct {
	BaseModel
	Name string `gorm:"unique"`
}

type MenuType struct {
	BaseModel
	Name string `gorm:"unique"`
}

type DiseaseType struct {
	BaseModel
	Name  string  `gorm:"unique"`
	// Menus []*Menu `gorm:"many2many:menu_disease_types;"`
}

type StatusType struct {
	BaseModel
	Name string `gorm:"unique"`
}

type UserType struct {
	BaseModel
	Name string `gorm:"unique"`
}

type User struct {
	BaseModel

	FirstName string `gorm:"default:UserFirstName"`
	LastName  string `gorm:"default:UserLastName"`
	Email     string `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Password  string `valid:"required~Password is required,minstringlength(8)~Password must be at least 8 characters"`
	Phone     string `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	UserName  string `gorm:"default:UserName"`
	Address   string `valid:"required~Address is required,minstringlength(2)~Address must be at least 2 characters"`
	District  string `valid:"required~District is required,minstringlength(2)~District must be at least 2 characters"`
	Province  string `valid:"required~Province is required,minstringlength(2)~Province must be at least 2 characters"`
	Postcode  string `valid:"required~Postcode is required,stringlength(5|5)~Postcode must be at 5 characters"`

	GenderID uint
	Gender   *Gender `gorm:"foreignKey:GenderID"`

	UserTypeID uint
	UserType   *UserType `gorm:"foreignKey:UserTypeID"`

	Payments []Payment `gorm:"foreignKey:UserID"` //ส่ง FK ไปที่ payment
}

type Payment struct {
	BaseModel
	Time time.Time  `gorm:"unique"`

	UserID uint
	User   *User `gorm:"foreignKey:UserID"`

	PaymentTypeID uint
	PaymentType   *PaymentType `gorm:"foreignKey:PaymentTypeID"`

	DeliveryTypeID uint
	DeliveryType   *DeliveryType `gorm:"foreignKey:DeliveryTypeID"`
}

type PaymentType struct {
	BaseModel
	Name string `gorm:"unique"`
}

type DeliveryType struct {
	BaseModel
	Name string `gorm:"unique"`
}

type Order struct {
	BaseModel
	Quantity int     `gorm:"unique"`
	Total    float32 `gorm:"unique"`

	UserID uint
	User   *User `gorm:"foreignKey:UserID"`

	MenuID uint
	Menu   *Menu `gorm:"foreignKey:MenuID"`
}

type HistoryOrder struct {
	BaseModel
	Date time.Time `valid:"required~Date is required,future~Date must be in the future"`

	OrderID uint
	Order   *Order `gorm:"foreignKey:OrderID"`

	StatusTypeID uint
	StatusType   *StatusType `gorm:"foreignKey:StatusTypeID"`
}

type Checkpayment struct {
	BaseModel
	DateE     time.Time `valid:"required~Date is required,future~Date must be in the future"`
	SlipImage string    `gorm:"type:longtext"`

	OrderID uint
	Order   *Order `gorm:"foreignKey:OrderID"`

	StatusTypeID uint
	StatusType   *StatusType `gorm:"foreignKey:StatusTypeID"`

	UserID uint
	User   *User `gorm:"foreignKey:UserID"`
}

type Menu struct {
	BaseModel
	Name        string
	Cost        float32
	Description string
	Component   map[string]interface{} `gorm:"serializer:json"`
	MenuImage   string                 `gorm:"type:longtext"`

	// DiseaseTypeID uint
	DiseaseType []DiseaseType `gorm:"many2many:menu_disease_types"`

	MenuTypeID uint
	MenuType   *MenuType `gorm:"foreignKey:MenuTypeID"`
}
