# SWE_Process
ส่วนตัว prototype(ต้องทำส่วน MySQL ก่อน)
1. ทำการ clone project นี้ลงเครื่องของท่าน
2. ทำการ cd เข้ามาที่ \2024-ITDS262-1-Sasuke\phase-2\Prototype\Mendix
3. เปิด terminal แล้วพิมพ์ npm install
4. ทำการ run ด้วยคำสั่ง npm run dev
5. เปิด browser แล้วเข้าไปที่ localhost:port(คือเลข PORT ที่อยู่ใน .env ไฟล์)

ส่วนตัว MySQL
1. เปิดไฟล์ TRAIN_DB.sql ใน MySQL
2. run all ทั้งไฟล์ TRAIN_DB
3. ทำการสร้าง user ใน Server -> User and Privileges (ต้องสามารถทำ SELECT INSERT UPDATE DELETE ได้)
4. ทำการแก้ไข username และ password ใน .env ไฟล์ให้ตรงกับที่สร้างมา
