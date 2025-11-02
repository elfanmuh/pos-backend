# 🧾 POS API — Backend Express.js

Sistem **Point of Sale (POS)** sederhana berbasis **Express.js**.  
Proyek ini dirancang untuk mengelola data **produk**, **kategori**, **pesanan**, dan **pembayaran** dengan arsitektur RESTful API yang mudah dikembangkan.

---

## 🚀 Teknologi yang Digunakan

| Teknologi | Deskripsi |
|------------|------------|
| **Node.js** | Runtime JavaScript untuk backend |
| **Express.js** | Framework utama untuk pembuatan REST API |
| **Prisma ORM** | Manajemen database modern dan mudah digunakan |
| **MySQL** | Database utama untuk menyimpan data POS |
| **Cors** | Mengizinkan komunikasi lintas origin |
| **Body Parser** | Middleware untuk membaca data request |
| **Dotenv** | Menyimpan variabel konfigurasi environment |
| **JWT** | Untuk Menyimpan Token Authentikasi User |
| **Middleware** | Authentikasi JWT untuk keamanan |

---

## 📁 Struktur Folder

project/
│
├── prisma/ # Schema dan migrasi database
├── routes/ # Routing API (produk, kategori, order, dll)
├── controllers/ # Logika CRUD untuk setiap entity
├── middlewares/ # Middleware (validasi, error handling, auth)
├── utils/ # Helper dan konfigurasi tambahan
├── .env # Konfigurasi environment (tidak diunggah)
├── package.json
└── server.js # Entry point utama aplikasi


---

## ⚙️ Instalasi dan Menjalankan Server

1. **Clone repository**
   ```bash
   git clone https://github.com/username/pos-backend.git
   cd pos-backend

2. **npm install**
3. **DATABASE_URL="mysql://user:password@localhost:3306/pos_db"
        PORT=5000/300**
4. **npx prisma migrate dev**
5. **npm run api**

## Daftar Endpoint

1. **Product**

| Method | Endpoint         | Deskripsi                    |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/items`     | Ambil semua produk           |
| GET    | `/api/items/:id` | Ambil produk berdasarkan ID  |
| POST   | `/api/items`     | Tambah produk baru           |
| PUT    | `/api/items/:id` | Update produk berdasarkan ID |
| DELETE | `/api/items/:id` | Hapus produk berdasarkan ID  |
 
2. **Categorires Product**

| Method | Endpoint              | Deskripsi            |
| ------ | --------------------- | -------------------- |
| GET    | `/api/categories`     | Ambil semua kategori |
| POST   | `/api/categories`     | Tambah kategori baru |
| PUT    | `/api/categories/:id` | Update kategori      |
| DELETE | `/api/categories/:id` | Hapus kategori       |

3. **Orders**

| Method | Endpoint          | Deskripsi                    |
| ------ | ----------------- | ---------------------------- |
| GET    | `/api/orders`     | Ambil semua pesanan          |
| GET    | `/api/orders/:id` | Ambil pesanan berdasarkan ID |
| POST   | `/api/orders`     | Tambah pesanan baru          |
| DELETE | `/api/orders/:id` | Hapus pesanan                |

4. **Payment**

| Method | Endpoint            | Deskripsi                        |
| ------ | ------------------- | -------------------------------- |
| GET    | `/api/payments`     | Ambil semua riwayat pembbayaran  |
| GET    | `/api/payments/:id` | Ambil pembayaran berdasarkan ID  |
| POST   | `/api/payments`     | Tambah pembayaran baru           |
| DELETE | `/api/payments/:id` | Hapus pembayaran                 |

## 👨‍💻 Pengembang

**M. Elfan**  
Backend Developer | Express.js | Prisma | MySQL  
📧 Email: [elfanmuh@gmail.com](mailto:elfanmuh@gmail.com)  
🌐 GitHub: [github.com/elfanmuh](https://github.com/elfanmuh)

**Proyek Ini Masih Dalam Tahap Pengembangan**
