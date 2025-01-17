package entity

import (
	// "time"

	// "github.com/Autsada555/PJ480-React/backend/utils"
	"time"

	"gorm.io/gorm"
)

func SetupData(db *gorm.DB) {

	// gender data
	genders := []Gender{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "ชาย",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "หญิง",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "ไม่เปิดเผย",
		},
	}

	db.Create(&genders)

	// UserType
	usertypes := []UserType{
		{
			BaseModel: BaseModel{ID: 100},
			Name:      "customer",
		},
		{
			BaseModel: BaseModel{ID: 200},
			Name:      "admin",
		},
		{
			BaseModel: BaseModel{ID: 201},
			Name:      "cash",
		},
		{
			BaseModel: BaseModel{ID: 202},
			Name:      "delivery",
		},
	}
	db.Create(&usertypes)

	// employee
	users := []User{
		{
			BaseModel:  BaseModel{ID: 1},
			FirstName:  "Somchai",
			LastName:   "Somchai",
			Email:      "somchai@somchai.com",
			Password:   "somchai1234",
			UserTypeID: 100,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "Somchai",
			Address:    "555 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666661111",
		},
		{
			BaseModel:  BaseModel{ID: 2},
			FirstName:  "Peter",
			LastName:   "Peter",
			Email:      "peter@peter.com",
			Password:   "peter1234",
			UserTypeID: 100,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "Peter",
			Address:    "666 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666662222",
		},
		{
			BaseModel:  BaseModel{ID: 3},
			FirstName:  "Veter",
			LastName:   "Veter",
			Email:      "veter@veter.com",
			Password:   "veter1234",
			UserTypeID: 200,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "veter",
			Address:    "777 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666663333",
		},
		{
			BaseModel:  BaseModel{ID: 4},
			FirstName:  "Pinky",
			LastName:   "Pinky",
			Email:      "pinky@pinky.com",
			Password:   "pinky1234",
			UserTypeID: 201,
			GenderID:   2,
			Phone:      "0999999999",
			UserName:   "Pinky",
			Address:    "888 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666664444",
		},
		{
			BaseModel:  BaseModel{ID: 5},
			FirstName:  "Jezzy",
			LastName:   "Jezzy",
			Email:      "jezzy@jezzy.com",
			Password:   "jezzy1234",
			UserTypeID: 202,
			GenderID:   2,
			Phone:      "0999999999",
			UserName:   "Jezzy",
			Address:    "999 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666665555",
		},
	}
	db.Create(&users)

	// disease data
	disease := []Disease{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "อาหารเพื่อสุขภาพ",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "โรคเบาหวาน",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "โรคกระเพาะอาหาร",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "โรคไทรอยด์",
		},
		{
			BaseModel: BaseModel{ID: 5},
			Name:      "โรคไต",
		},
	}
	db.Create(&disease)

	// diseasetypes data
	menutypes := []MenuType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "อาหารคาว",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "ขนม&ของหวาน",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "ซุป",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "เครื่องดื่ม",
		},
	}
	db.Create(&menutypes)

	// statustypes data
	statusordertypes := []StatusOrderType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "รอการรับคำสั่งซื้อ",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "รับคำสั่งซื้อเรียบร้อย",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "ยกเลิกคำสั่งซื้อ",
		},
	}
	db.Create(&statusordertypes)

	statuspaymenttypes := []StatusPaymentType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "รอการเช็คชำระเงิน",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "ชำระเงินเรียบร้อย",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "ผิดพลาด",
		},
	}
	db.Create(&statuspaymenttypes)

	statusdeliverytypes := []StatusDeliveryType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "รอการรับคำสั่งซื้อ",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "กำลังเตรียมจัดส่ง",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "อยู่ระหว่างจัดส่ง",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "ส่งเรียบร้อย",
		},
	}
	db.Create(&statusdeliverytypes)

	menu := []Menu{
		{
			BaseModel:   BaseModel{ID: 1},
			Name:        "ข้าวหมูสับ",
			Cost:        45,
			Description: "อร่อย",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 1,
		},
		{
			BaseModel:   BaseModel{ID: 2},
			Name:        "เค้กกล้วยหอม",
			Cost:        30,
			Description: "หวานนิดๆ",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 3},
			Name:        "ซุปเห็ดทัปเฟิล",
			Cost:        40,
			Description: "อร่อย",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 3,
		}, {
			BaseModel:   BaseModel{ID: 4},
			Name:        "น้ำเปล่า",
			Cost:        10,
			Description: "ทำได้ทุกอย่าง",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 4,
		}, {
			BaseModel:   BaseModel{ID: 5},
			Name:        "กะเพราหมู",
			Cost:        50,
			Description: "delicius",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 6},
			Name:        "กะเพราไก่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 7},
			Name:        "สลัดอกไก่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 8},
			Name:        "สลัดไข่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   []string{"หมูชิ้น", "กะเพรา", "กะเทียม"},

			MenuImage: "/src/assets/kawkookkapi.webp",
			MenuTypeID: 1,
		},
	}
	db.Create(&menu)

	// เพิ่มความสัมพันธ์ระหว่างเมนูกับโรค
	menuDiseases := []MenuDisease{
		// อาหารเพื่อสุขภาพ
		{MenuID: 7, DiseaseID: 1}, // สลัดอกไก่
		{MenuID: 8, DiseaseID: 1}, // สลัดไข่
	
		// โรคเบาหวาน
		{MenuID: 2, DiseaseID: 2}, // เค้กกล้วยหอม (สำหรับกรณีที่เป็นสูตรน้ำตาลน้อย)
	
		// โรคกระเพาะอาหาร
		{MenuID: 3, DiseaseID: 3}, // ซุปเห็ดทัปเฟิล
	
		// โรคไทรอยด์
		{MenuID: 4, DiseaseID: 4}, // น้ำเปล่า
	
		// โรคไต
		{MenuID: 1, DiseaseID: 5}, // ข้าวหมูสับ (ถ้าปรุงรสเค็มน้อย)
		{MenuID: 6, DiseaseID: 5}, // กะเพราไก่ (ถ้าปรุงรสเค็มน้อย)
	}
	
	db.Create(&menuDiseases)
	

	orders := []Order{
		{
			BaseModel:    BaseModel{ID: 1},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID: 1,
			StatusPaymentTypeID: 1,
			StatusDeliveryTypeID: 1,
			UserID: 3,

		},
		{
			BaseModel:    BaseModel{ID: 2},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID: 1,
			StatusPaymentTypeID: 1,
			StatusDeliveryTypeID: 2,
			UserID: 3,

		},
		{
			BaseModel:    BaseModel{ID: 3},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID: 1,
			StatusPaymentTypeID: 1,
			StatusDeliveryTypeID: 3,
			UserID: 3,

		},
		{
			BaseModel:    BaseModel{ID: 4},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "sdjfklsdfjksdjfsd;f",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID: 1,
			StatusPaymentTypeID: 1,
			StatusDeliveryTypeID: 4,
			UserID: 3,

		},
	}
	db.Create(&orders)

}
