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
			BaseModel:        BaseModel{ID: 1},
			FirstName:        "Somchai",
			LastName:         "Somchai",
			Email:            "somchai@somchai.com",
			Password:         "somchai1234",
			UserTypeID:       100,
			GenderID:         1,
			Phone:            "0988888888",
			UserName:         "Somchai",
			Address:          "555 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666661111",
		},
		{
			BaseModel:        BaseModel{ID: 2},
			FirstName:        "Peter",
			LastName:         "Peter",
			Email:            "peter@peter.com",
			Password:         "peter1234",
			UserTypeID:       100,
			GenderID:         1,
			Phone:            "0988888888",
			UserName:         "Peter",
			Address:          "666 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666662222",
		},
		{
			BaseModel:        BaseModel{ID: 3},
			FirstName:        "Veter",
			LastName:         "Veter",
			Email:            "veter@veter.com",
			Password:         "veter1234",
			UserTypeID:       200,
			GenderID:         1,
			Phone:            "0988888888",
			UserName:         "veter",
			Address:          "777 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666663333",
		},
		{
			BaseModel:        BaseModel{ID: 4},
			FirstName:        "Pinky",
			LastName:         "Pinky",
			Email:            "pinky@pinky.com",
			Password:         "pinky1234",
			UserTypeID:       201,
			GenderID:         2,
			Phone:            "0999999999",
			UserName:         "Pinky",
			Address:          "888 Suranari Meaung Nakhon Ratcasima 30000",
			CreditCardNumber: "6666664444",
		},
		{
			BaseModel:        BaseModel{ID: 5},
			FirstName:        "Jezzy",
			LastName:         "Jezzy",
			Email:            "jezzy@jezzy.com",
			Password:         "jezzy1234",
			UserTypeID:       202,
			GenderID:         2,
			Phone:            "0999999999",
			UserName:         "Jezzy",
			Address:          "999 Suranari Meaung Nakhon Ratcasima 30000",
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
			Name:        "แครอทอบน้ำผึ้ง",
			Cost:        30,
			Description: "หั่นแครอทเป็นแท่ง อบด้วยน้ำผึ้งเล็กน้อย",
			Component:   []string{"แครอท", "น้ำผึ้ง"},

			MenuImage:  "/src/assets/foods/diabetes/dessert/แครอทอบน้ำผึ้ง.jpg",
			MenuTypeID: 2,
		},
		{
			BaseModel:   BaseModel{ID: 2},
			Name:        "เจลลี่ผลไม้สด",
			Cost:        30,
			Description: "ใช้น้ำผลไม้ธรรมชาติ เช่น แอปเปิล หรือเบอร์รี ทำเจลลี่โดยไม่เติมน้ำตาล",
			Component:   []string{"แอปเปิล", "เบอร์รี", "ผงเจลลี่"},

			MenuImage:  "/src/assets/foods/diabetes/dessert/เจลลี่ผลไม้สด.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 3},
			Name:        "พุดดิ้งชาเขียว",
			Cost:        30,
			Description: "ใช้ผงชาเขียว นมไขมันต่ำ และสารให้ความหวานแทนน้ำตาล",
			Component:   []string{"ผงชาเขียว", "นมไขมันต่ำ", "สารให้ความหวาน"},

			MenuImage:  "/src/assets/foods/diabetes/dessert/พุดดิ้งชาเขียว.jpeg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 4},
			Name:        "โยเกิร์ตไขมันต่ำใส่ผลไม้",
			Cost:        30,
			Description: "ใช้โยเกิร์ตธรรมชาติไม่มีน้ำตาล เติมผลไม้สด",
			Component:   []string{"โยเกิร์ต", "ผลไม้สด"},

			MenuImage:  "/src/assets/foods/diabetes/dessert/โยเกิร์ตไขมันต่ำใส่ผลไม้.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 5},
			Name:        "ชาขิงอุ่น",
			Cost:        30,
			Description: "ชงขิงสดในน้ำร้อน ดื่มแบบไม่เติมน้ำตาล",
			Component:   []string{"ขิงสด"},

			MenuImage:  "/src/assets/foods/diabetes/drink/ชาขิงอุ่น.webp",
			MenuTypeID: 4,
		}, {
			BaseModel:   BaseModel{ID: 6},
			Name:        "นมถั่วเหลืองสูตรไม่หวาน",
			Cost:        30,
			Description: "ดื่มนมถั่วเหลืองธรรมชาติปราศจากน้ำตาล",
			Component:   []string{"ถั่วเหลือง"},
			MenuImage:   "/src/assets/foods/diabetes/drink/นมถั่วเหลืองสูตรไม่หวาน.jpg",
			MenuTypeID:  4,
		}, {
			BaseModel:   BaseModel{ID: 7},
			Name:        "น้ำแตงกวาผสมมะนาว",
			Cost:        30,
			Description: "แตงกวาคั้นน้ำสด เติมน้ำมะนาวเล็กน้อย",
			Component:   []string{"แตงกวา", "มะนาว"},

			MenuImage:  "/src/assets/foods/diabetes/drink/น้ำแตงกวาผสมมะนาว.jpg",
			MenuTypeID: 4,
		}, {
			BaseModel:   BaseModel{ID: 8},
			Name:        "แกงส้มผักรวม",
			Cost:        50,
			Description: "ใช้ฟักทอง, แครอท, และถั่วฝักยาวในน้ำแกงส้มที่ปรุงรสด้วยเครื่องแกงแบบไม่หวาน",
			Component:   []string{"ฟักทอง", "แครอท", "ถั่วฝักยาว"},

			MenuImage:  "/src/assets/foods/diabetes/savory/แกงส้มผักรวม.jpg",
			MenuTypeID: 1,
		},
		{
			BaseModel:   BaseModel{ID: 9},
			Name:        "ข้าวกล้องผัดอกไก่",
			Cost:        50,
			Description: "ใช้ข้าวกล้องผัดกับอกไก่หั่นชิ้นเล็ก ใส่ผักหลากสี เช่น แครอทและบรอกโคลี ปรุงรสด้วยซีอิ๊วโลว์โซเดียม",
			Component:   []string{"ข้าว", "อกไก่", "แครอท", "บรอกโคลี", "ซีอิ๊วโลว์โซเดียม"},

			MenuImage:  "/src/assets/foods/diabetes/savory/ข้าวกล้องผัดอกไก่.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 10},
			Name:        "ปลานึ่งมะนาว",
			Cost:        70,
			Description: "ใช้ปลากะพง ปรุงรสด้วยน้ำมะนาว กระเทียม และพริก",
			Component:   []string{"ปลากะพง", "มะนาว ", "กะเทียม", "พริก"},

			MenuImage:  "/src/assets/foods/diabetes/savory/ปลานึ่งมะนาว.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 11},
			Name:        "ผัดผักรวมใส่เต้าหู้",
			Cost:        50,
			Description: "ใช้เต้าหู้ขาวผัดกับผัก เช่น บรอกโคลี, แครอท และเห็ดหอม ปรุงรสอ่อน ๆ",
			Component:   []string{"เต้าหู้ขาว", "บรอกโคลี", "แครอท", "เห็ดหอม"},

			MenuImage:  "/src/assets/foods/diabetes/savory/ผัดผักรวมใส่เต้าหู้.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 12},
			Name:        "ลาบอกไก่",
			Cost:        50,
			Description: "ใช้อกไก่สับคลุกเคล้ากับข้าวคั่ว หอมแดง และน้ำมะนาว ไม่ใส่น้ำตาล",
			Component:   []string{"อกไก่", "ข้าวคั่ว", "หอมแดง", "น้ำมะนาว"},

			MenuImage:  "/src/assets/foods/diabetes/savory/ลาบอกไก่.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 13},
			Name:        "ซุปไก่ใส่เห็ดและแครอท",
			Cost:        50,
			Description: "ใช้ไก่ฉีกต้มกับเห็ดและแครอท ปรุงรสด้วยเกลือเล็กน้อย",
			Component:   []string{"เห็ด", "แครอท", "เกลือ"},
			MenuImage:   "/src/assets/foods/diabetes/soup/ซุปไก่ใส่เห็ดและแครอท.jpg",
			MenuTypeID:  3,
		}, {
			BaseModel:   BaseModel{ID: 14},
			Name:        "ซุปข้าวโพดหวาน",
			Cost:        50,
			Description: "ใช้ข้าวโพดหวานบดละเอียดต้มกับน้ำซุปไขมันต่ำ",
			Component:   []string{"ข้าวโพดหวาน"},

			MenuImage:  "/src/assets/foods/diabetes/soup/ซุปข้าวโพดหวาน.jpg",
			MenuTypeID: 3,
		}, {
			BaseModel:   BaseModel{ID: 15},
			Name:        "ซุปผักโขมใส่เต้าหู้",
			Cost:        50,
			Description: "ใช้ผักโขมและเต้าหู้ในน้ำซุปไก่ ปรุงรสอ่อน",
			Component:   []string{"ผักโขม", "เต้าหู้"},

			MenuImage:  "/src/assets/foods/diabetes/soup/ซุปผักโขมใส่เต้าหู้.jpg",
			MenuTypeID: 3,
		},
		{
			BaseModel:   BaseModel{ID: 16},
			Name:        "ซุปมะเขือเทศสด",
			Cost:        50,
			Description: "ใช้มะเขือเทศสดต้มและบด ปรุงรสด้วยเครื่องเทศและพริกไทย",
			Component:   []string{"มะเขือเทศสด"},

			MenuImage:  "/src/assets/foods/diabetes/soup/ซุปมะเขือเทศสด.jpg",
			MenuTypeID: 3,
		}, {
			BaseModel:   BaseModel{ID: 17},
			Name:        "กล้วยน้ำว้า",
			Cost:        30,
			Description: "กล้วยน้ำว้าสุก",
			Component:   []string{"กล้วยน้ำว้าสุก"},

			MenuImage:  "/src/assets/foods/gastric/dessert/กล้วยน้ำว้าหอมมะลิ.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 18},
			Name:        "พุดดิ้งเต้าหู้",
			Cost:        30,
			Description: "เต้าหู้ขาวบดละเอียด ทำเป็นพุดดิ้งใส่เจลาติน",
			Component:   []string{"เต้าหู้ขาว", "เจลาติน"},

			MenuImage:  "/src/assets/foods/gastric/dessert/พุดดิ้งเต้าหู้.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 19},
			Name:        "ฟักทองนึ่ง",
			Cost:        30,
			Description: "ฟักทองนึ่งหั่นชิ้นเล็ก รับประทานกับมะพร้าวขูด",
			Component:   []string{"ฟักทอง", "มะพร้าวขูด"},

			MenuImage:  "/src/assets/foods/gastric/dessert/ฟักทองนึ่ง.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 20},
			Name:        "วุ้นมะพร้าวอ่อน",
			Cost:        30,
			Description: "ใช้น้ำมะพร้าวอ่อนและวุ้นเจลาตินธรรมชาติ ไม่มีน้ำตาล",
			Component:   []string{"น้ำมะพร้าวอ่อน", "เจลาติน"},

			MenuImage:  "/src/assets/foods/gastric/dessert/วุ้นมะพร้าวอ่อน.jpg",
			MenuTypeID: 2,
		}, {
			BaseModel:   BaseModel{ID: 21},
			Name:        "น้ำมะพร้าวอ่อน",
			Cost:        20,
			Description: "น้ำมะพร้าวธรรมชาติ ดื่มเพื่อเพิ่มความสดชื่น",
			Component:   []string{"น้ำมะพร้าว"},

			MenuImage:  "/src/assets/foods/gastric/drink/น้ำมะพร้าวอ่อน.jpg",
			MenuTypeID: 4,
		}, {
			BaseModel:   BaseModel{ID: 22},
			Name:        "น้ำวุ้นว่านหางจระเข้",
			Cost:        30,
			Description: "น้ำว่านหางจระเข้ผสมน้ำเปล่า ช่วยเคลือบกระเพาะ",
			Component:   []string{"ว่านหางจระเข้"},

			MenuImage:  "/src/assets/foods/gastric/drink/น้ำวุ้นว่านหางจระเข้.jpg",
			MenuTypeID: 4,
		}, {
			BaseModel:   BaseModel{ID: 23},
			Name:        "ข้าวต้มปลา",
			Cost:        50,
			Description: "ใช้ปลานึ่ง เช่น ปลานิลหรือปลาทับทิม ใส่ในข้าวต้มขาว ปรุงรสอ่อน ๆ ด้วยเกลือเล็กน้อย",
			Component:   []string{"ปลานิล", "ปลาทับทิม ", "ข้าว", "เกลือ"},
			MenuImage:   "/src/assets/foods/gastric/savory/ข้าวต้มปลา.jpg",
			MenuTypeID:  1,
		}, {
			BaseModel:   BaseModel{ID: 24},
			Name:        "ไข่ตุ๋นเนื้อนุ่ม",
			Cost:        50,
			Description: "ตุ๋นไข่กับน้ำซุปไก่หรือปลา เติมเต้าหู้ขาวและผักใบเขียวเล็กน้อย",
			Component:   []string{"ไข่", "น้ำซุปไก่", "เต้าหู้ขาว", "ผักใบเขียว"},

			MenuImage:  "/src/assets/foods/gastric/savory/ไข่ตุ๋นเนื้อนุ่ม.png",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 25},
			Name:        "โจ๊กไก่",
			Cost:        50,
			Description: "ใช้อกไก่ฉีกใส่ในโจ๊กข้าวขาว ปรุงรสด้วยซีอิ๊วโลว์โซเดียม",
			Component:   []string{"อกไก่", "ข้าว", "ซีอิ๊วโลว์โซเดียม"},

			MenuImage:  "/src/assets/foods/gastric/savory/โจ๊กไก่.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 26},
			Name:        "ผัดฟักทองใส่ไข่",
			Cost:        50,
			Description: "ใช้ฟักทองหั่นชิ้นเล็ก ผัดกับไข่โดยใช้น้ำมันมะกอกในปริมาณน้อย",
			Component:   []string{"ฟักทอง", "ไข่", "น้ำมันมะกอก"},

			MenuImage:  "/src/assets/foods/gastric/savory/ผัดฟักทองใส่ไข่.jpg",
			MenuTypeID: 1,
		}, {
			BaseModel:   BaseModel{ID: 27},
			Name:        "ซุปข้าวโพด",
			Cost:        50,
			Description: "ข้าวโพดต้มบดละเอียดในน้ำซุป เติมเกลือเล็กน้อย",
			Component:   []string{"ข้าวโพด", "เกลือ"},

			MenuImage:  "/src/assets/foods/gastric/soup/ซุปข้าวโพด.jpg",
			MenuTypeID: 3,
		},
	}
	db.Create(&menu)

	// เพิ่มความสัมพันธ์ระหว่างเมนูกับโรค
	menuDiseases := []MenuDisease{
		{MenuID: 1, DiseaseID: 1},
		{MenuID: 2, DiseaseID: 1},
		{MenuID: 3, DiseaseID: 1},
		{MenuID: 4, DiseaseID: 1},
		{MenuID: 5, DiseaseID: 1}, 
		{MenuID: 6, DiseaseID: 1}, 
		{MenuID: 7, DiseaseID: 1}, 
		{MenuID: 8, DiseaseID: 1}, 
		{MenuID: 9, DiseaseID: 1}, 
		{MenuID: 10, DiseaseID: 1}, 
		{MenuID: 11, DiseaseID: 1}, 
		{MenuID: 12, DiseaseID: 1}, 
		{MenuID: 13, DiseaseID: 1}, 
		{MenuID: 14, DiseaseID: 1}, 
		{MenuID: 15, DiseaseID: 1}, 
		{MenuID: 16, DiseaseID: 1}, 
		{MenuID: 17, DiseaseID: 1}, 
		{MenuID: 18, DiseaseID: 1}, 
		{MenuID: 19, DiseaseID: 1}, 
		{MenuID: 20, DiseaseID: 1}, 
		{MenuID: 21, DiseaseID: 1}, 
		{MenuID: 22, DiseaseID: 1}, 
		{MenuID: 23, DiseaseID: 1}, 
		{MenuID: 24, DiseaseID: 1}, 
		{MenuID: 25, DiseaseID: 1}, 
		{MenuID: 26, DiseaseID: 1}, 
		{MenuID: 27, DiseaseID: 1}, 

		{MenuID: 1, DiseaseID: 2},
		{MenuID: 2, DiseaseID: 2},
		{MenuID: 3, DiseaseID: 2},
		{MenuID: 4, DiseaseID: 2},
		{MenuID: 5, DiseaseID: 2}, 
		{MenuID: 6, DiseaseID: 2}, 
		{MenuID: 7, DiseaseID: 2}, 
		{MenuID: 8, DiseaseID: 2}, 
		{MenuID: 9, DiseaseID: 2}, 
		{MenuID: 10, DiseaseID: 2}, 
		{MenuID: 11, DiseaseID: 2}, 
		{MenuID: 12, DiseaseID: 2}, 
		{MenuID: 13, DiseaseID: 2}, 
		{MenuID: 14, DiseaseID: 2}, 
		{MenuID: 15, DiseaseID: 2}, 
		{MenuID: 16, DiseaseID: 2},

		{MenuID: 17, DiseaseID: 3}, 
		{MenuID: 18, DiseaseID: 3}, 
		{MenuID: 19, DiseaseID: 3}, 
		{MenuID: 20, DiseaseID: 3}, 
		{MenuID: 21, DiseaseID: 3}, 
		{MenuID: 22, DiseaseID: 3}, 
		{MenuID: 23, DiseaseID: 3}, 
		{MenuID: 24, DiseaseID: 3}, 
		{MenuID: 25, DiseaseID: 3}, 
		{MenuID: 26, DiseaseID: 3}, 
		{MenuID: 27, DiseaseID: 3}, 


		{MenuID: 4, DiseaseID: 4},

		{MenuID: 1, DiseaseID: 5},
		{MenuID: 6, DiseaseID: 5},
	}

	db.Create(&menuDiseases)

	orders := []Order{
		{
			BaseModel:    BaseModel{ID: 1},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "/src/assets/slip.png",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID:    1,
			StatusPaymentTypeID:  1,
			StatusDeliveryTypeID: 1,
			UserID:               3,
		},
		{
			BaseModel:    BaseModel{ID: 2},
			Quantity:     2,
			TotalAmount:  200,
			DateDelivery: <-time.After(5),
			Eslip:        "/src/assets/slip.png",
			Delivery:     "รับสินค้าที่หน้าร้าน",
			Menu: []Menu{
				menu[1], menu[2],
			},
			StatusOrderTypeID:    1,
			StatusPaymentTypeID:  1,
			StatusDeliveryTypeID: 2,
			UserID:               3,
		},
	}
	db.Create(&orders)

}
