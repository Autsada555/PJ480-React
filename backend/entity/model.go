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

type Customer struct {
	BaseModel
	FirstName       string    `gorm:"default:UserFirstName"`
	LastName        string    `gorm:"default:UserLastName"`
	Email           string    `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Password        string    `valid:"required~Password is required,minstringlength(8)~Password must be at least 8 characters"`
	Phone           string    `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	UserName 		string    `gorm:"default:UserName"`

	// RoleID uint `gorm:"default:101"`
	// Role   *Role

	GenderID uint
	Gender   *Gender

	AddressID uint
	Address   *Address

	Orders          []Order
	Payments        []Payment
	Deliverys       []Delivery
	Addresss       []Address
}

type Gender struct {
	BaseModel
	Name string `gorm:"unique"`

	Employees []Employee
	Customers     []Customer
}

type Address struct {
	BaseModel
	Address          string    `valid:"required~Address is required"`
	District 		string    `valid:"required~District is required"`
	Province      string    `valid:"required~Province is required"`
	Postcode      string    `valid:"required~Postcode is required"`
	
	Deliverys []Delivery
	Customers     []Customer

}

type MenuType struct {
	BaseModel
	Name string `gorm:"unique"`

	Menus []Menu
}

type DiseaseType struct {
	BaseModel
	Name        string `gorm:"unique"`

	Menus []Menu
}

type Delivery struct {
	BaseModel
	Name        string `gorm:"unique"`

	CustomerID uint
	Customer   *Customer

	AddressID uint
	Address   *Address
}

type Order struct {
	BaseModel
	Quantity    string `gorm:"unique"`
	Total string `gorm:"unique"`

	Checkpayments []Checkpayment

	CustomerID uint
	Customer   *Customer

	MenuID uint
	Menu   *Menu
}

type Payment struct {
	BaseModel
	Name        string `gorm:"unique"`

	Customers     []Customer
}

type StatusType struct {
	BaseModel
	Name string `gorm:"unique"`

	Checkpayments []Checkpayment
	Historys    []HistoryOrder
}

type EmployeeType struct {
	BaseModel
	Name        string `gorm:"unique"`

	Employees []Employee
}

type HistoryOrder struct {
	BaseModel
	Date  time.Time `valid:"required~Date is required,future~Date must be in the future"`

	Orders []Order
	StatusTypes    []StatusType
}

type Checkpayment struct {
	BaseModel
	Date  time.Time `valid:"required~Date is required,future~Date must be in the future"`
	SlipImage string    `gorm:"type:longtext"`

	Orders []Order
	StatusTypes    []StatusType
	Employees []Employee
}

type Employee struct {
	BaseModel
	FirstName       string    `gorm:"default:UserFirstName"`
	LastName        string    `gorm:"default:UserLastName"`
	Email           string    `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Password        string    `valid:"required~Password is required,minstringlength(8)~Password must be at least 8 characters"`
	Phone           string    `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	UserName 		string    `gorm:"default:UserName"`

	// RoleID uint `gorm:"default:101"`
	// Role   *Role

	GenderID uint
	Gender   *Gender

	EmployeeTypeID uint ` valid:"required~Position is required,refer=employeetypes~EmployeeType does not exist"`
	EmployeeType   *EmployeeType

	Checkpayments        []Checkpayment
}

type Menu struct {
	BaseModel
	Name    string `gorm:"unique"`
	Cost string `gorm:"unique"`
	Description string `gorm:"unique"`
	MenuImage string    `gorm:"type:longtext"`


	Checkpayments []Checkpayment

	CustomerID uint
	Customer   *Customer

	MenuID uint
	Menu   *Menu
}