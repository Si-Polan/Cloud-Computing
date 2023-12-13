Folder `public` pada proyek Node.js biasanya digunakan untuk menyimpan berkas statis seperti gambar, skrip JavaScript, dan file CSS yang akan diakses secara langsung oleh klien melalui peramban. Meskipun Anda dapat menggunakan folder ini untuk menyimpan file statis seperti gambar dan video, penggunaan yang lebih umum untuk file-file ini adalah sebagai aset yang digunakan oleh tampilan halaman HTML atau sebagai sumber daya yang dimuat melalui permintaan HTTP langsung oleh klien.

Untuk mengizinkan teman Anda mengunggah foto dan video pelanggaran, Anda harus membuat endpoint API yang bertanggung jawab untuk menerima file yang diunggah dan menyimpannya di server. Saat menyimpan file-file ini, Anda biasanya tidak menyimpannya di dalam folder `public`, karena itu dapat mengotori struktur proyek Anda dan memungkinkan akses langsung oleh publik.

Sebaliknya, Anda biasanya menyimpan file-file unggahan ini di suatu tempat di luar direktori proyek atau dalam direktori tertentu yang tidak diakses secara langsung oleh publik. Berikut adalah langkah-langkah umum yang dapat Anda ikuti:

1. **Menangani Unggahan pada Server:**
   - Implementasikan endpoint API yang dapat menangani unggahan file. Anda dapat menggunakan middleware seperti `multer` untuk menangani proses unggahan pada server. Multer memungkinkan Anda menentukan di mana file-file harus disimpan.

2. **Membuat Direktori untuk Menyimpan File Unggahan:**
   - Buat direktori khusus di luar direktori proyek atau dalam direktori proyek yang tidak dapat diakses secara langsung oleh publik. Pada direktori tersebut, Anda dapat menyimpan file-file unggahan.

3. **Konfigurasi Multer:**
   - Konfigurasikan Multer untuk menyimpan file-file unggahan pada direktori yang telah Anda buat.

   ```javascript
   const multer = require('multer');

   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       // Tentukan direktori penyimpanan file
       cb(null, '/path/to/upload/directory');
     },
     filename: function (req, file, cb) {
       // Tentukan nama file
       cb(null, Date.now() + '-' + file.originalname);
     }
   });

   const upload = multer({ storage: storage });
   ```

4. **Definisikan Endpoint API untuk Unggahan:**
   - Gunakan `upload.single` dari Multer untuk menangani unggahan satu file. Di dalam endpoint API ini, Anda dapat menyimpan informasi tentang file unggahan (seperti nama file atau path file) ke dalam basis data atau menyimpan referensi ke file tersebut.

   ```javascript
   const express = require('express');
   const router = express.Router();

   router.post('/upload-photo', upload.single('photo'), (req, res) => {
     // Lakukan sesuatu dengan file yang diunggah
     const photoPath = req.file.path;
     // Simpan path file ke basis data atau lakukan sesuatu yang diperlukan
     res.json({ message: 'File uploaded successfully', photoPath });
   });

   module.exports = router;
   ```

5. **Konfigurasi Basis Data:**
   - Jika Anda memilih untuk menyimpan informasi tentang file unggahan dalam basis data, pastikan untuk mengonfigurasi dan menggunakan basis data sesuai kebutuhan.

Dengan melakukan langkah-langkah di atas, Anda dapat membuat API endpoint untuk mengelola unggahan file. Pastikan juga untuk memberikan izin akses yang sesuai ke direktori penyimpanan file agar server dapat menyimpan file-file tersebut.