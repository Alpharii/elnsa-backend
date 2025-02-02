# Backend Notes - NestJS & PrismaORM

## Notes
Sudah menggunakan seeders di backend untuk mengisi data awal dengan menjalankan perintah
```
npm run seed
```

## Overview
Backend telah dibuat menggunakan **NestJS** sebagai framework utama dan **PrismaORM** sebagai ORM untuk mengelola database. Fungsionalitas CRUDS untuk tabel **accounts, persons, hobbies, favorite_characters** telah diimplementasikan dengan baik.

## Implementasi
### 1. **Authentication (Belum Sempurna)**
- Saat ini masih menggunakan metode autentikasi berbasis **token JWT** yang dikirim melalui header.
- **Rencana awal:** Implementasi **HTTP-only cookie** untuk meningkatkan keamanan autentikasi, tetapi tidak cukup waktu.

### 2. **Endpoints CRUDS**
- **Accounts**: Registrasi pertama kali otomatis membuat akun admin.
- **Persons**: Menyediakan CRUD untuk daftar orang.
- **Hobbies**: Mendukung input array dalam sekali submit.
- **Favorite Characters**: Bisa menerima array of objects dalam sekali submit.

### 3. **Keamanan API (Belum Optimal)**
- **Validasi input** menggunakan class-validator tetapi masih perlu ditingkatkan.
- **CORS** dikonfigurasi untuk membatasi akses tetapi belum diuji secara menyeluruh.

## Kendala & Rencana Perbaikan
1. **Belum sempat menerapkan HTTP-only cookie untuk autentikasi yang lebih aman.**
2. **Validasi & sanitasi data masih bisa diperbaiki** agar lebih aman terhadap input yang tidak valid atau berbahaya.
3. **UI dan UX API response perlu diperbaiki** agar lebih standar dan mudah diintegrasikan dengan frontend.
4. **Error handling belum optimal**, masih ada beberapa edge case yang perlu ditangani lebih baik.

## Kesimpulan
- **Backend telah berjalan dengan baik** dan fungsionalitas CRUDS utama sudah berhasil.
- **Keamanan masih bisa ditingkatkan** terutama dalam autentikasi dan validasi data.
- **Jika ada waktu lebih**, implementasi HTTP-only cookie dan validasi lebih ketat akan menjadi prioritas.

---
💡 **Rekomendasi Perbaikan Ke Depan:**
1. **Implementasi autentikasi dengan HTTP-only cookie**.
2. **Tingkatkan validasi dan sanitasi input** untuk mencegah eksploitasi.
3. **Optimasi error handling dan logging** agar debugging lebih mudah.
4. **Menggunakan dokumentasi API dengan Swagger** agar memudahkan frontend dalam mengakses API


