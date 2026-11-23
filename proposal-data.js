window.proposalSections = [
  {
    "id": "1",
    "title": "LATAR BELAKANG",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Pengenalan ekspresi wajah mengelompokkan pola visual citra wajah ke kategori ekspresi. Bidang ini mendukung interaksi manusia–komputer dan sistem multimedia. Prediksi model menggambarkan pola pada citra, dengan interpretasi terbatas pada label dataset."
      },
      {
        "kind": "text",
        "text": "FER2013 memuat 35.887 citra wajah grayscale berukuran 48 × 48 piksel dalam tujuh kelas: angry, disgust, fear, happy, neutral, sad, dan surprise (Goodfellow dkk, 2013). Resolusi rendah, variasi pose dan pencahayaan, ambiguitas label, serta kemiripan antarkelas menyulitkan klasifikasi. Distribusinya juga timpang; happy berjumlah 8.989 citra, sedangkan disgust hanya 547 citra. Rasio sekitar 16,4:1 membuat accuracy berisiko menyamarkan recall yang rendah pada kelas minoritas."
      },
      {
        "kind": "text",
        "text": "Studi FER2013 melaporkan hasil yang beragam: accuracy 73,28% dengan VGGNet (Khaireddin dan Chen, 2021) dan 68,62% dengan modifikasi MobileNetV2 (Zhu dkk, 2024). Perbedaan arsitektur, pembagian data, dan pelatihan membatasi perbandingan langsung angka tersebut."
      },
      {
        "kind": "text",
        "text": "MobileNetV2 digunakan sebagai backbone karena depthwise separable convolution, inverted residual, dan linear bottleneck mengurangi kebutuhan parameter serta operasi dibandingkan konvolusi standar dengan ukuran kanal yang sebanding (Sandler dkk, 2018). Bobot ImageNet menyediakan fitur visual umum seperti tepi, tekstur, dan bentuk. Transfer learning kemudian menyesuaikan fitur tingkat tinggi dan kepala klasifikasi terhadap tujuh kelas FER2013."
      },
      {
        "kind": "text",
        "text": "Penelitian ini menguji augmentasi ringan dan tiga fungsi loss. Categorical cross-entropy (CE) menjadi acuan, class-weighted cross-entropy (WCE) mengoreksi frekuensi kelas, sedangkan class-weighted focal loss menambahkan pemfokusan kontribusi sampel sulit. Pemisahan ketiga strategi memungkinkan analisis pembobotan dan pemfokusan secara terkontrol (Lin dkk, 2017)."
      },
      {
        "kind": "text",
        "text": "Studi augmentasi MobileNetV2–FER2013 oleh Marbun dkk (2025) dan studi strategi loss Mini_XCEPTION–FER2013 oleh He dkk (2026) memakai protokol berbeda. Perbedaan tersebut menyisakan kebutuhan evaluasi augmentasi dan loss dalam satu rancangan yang memungkinkan pengujian interaksi."
      },
      {
        "kind": "text",
        "text": "Rancangan faktorial 2 × 3 digunakan dengan MobileNetV2 tanpa augmentasi dan CE sebagai baseline. Optimasi dibatasi pada pemilihan di antara enam konfigurasi melalui rata-rata macro-F1 PublicTest dari lima seed. Konfigurasi terpilih kemudian dibandingkan dengan baseline pada PrivateTest; rincian protokol disajikan pada Bagian 7."
      }
    ]
  },
  {
    "id": "2",
    "title": "RUMUSAN MASALAH",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Rumusan masalah penelitian ini adalah sebagai berikut."
      },
      {
        "kind": "text",
        "text": "Berapa selisih macro-F1 dan recall tiap kelas antartingkat augmentasi serta antarstrategi loss pada MobileNetV2–FER2013?"
      },
      {
        "kind": "text",
        "text": "Pada strategi loss mana efek augmentasi terhadap macro-F1 terbesar dan terkecil, dan berapa selisih efek antarloss yang membentuk pola interaksinya?"
      },
      {
        "kind": "text",
        "text": "Konfigurasi mana yang terpilih berdasarkan rata-rata macro-F1 PublicTest dari lima seed, dan berapa selisih macro-F1 terhadap baseline pada PrivateTest?"
      }
    ]
  },
  {
    "id": "3",
    "title": "TUJUAN PENELITIAN",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Mengestimasi pengaruh augmentasi ringan dan strategi loss terhadap macro-F1 serta recall tiap kelas."
      },
      {
        "kind": "text",
        "text": "Menganalisis interaksi augmentasi dan strategi loss terhadap macro-F1."
      },
      {
        "kind": "text",
        "text": "Memilih konfigurasi berdasarkan rata-rata macro-F1 PublicTest dari lima seed dan mengukur perubahan macro-F1 terhadap baseline pada PrivateTest."
      }
    ]
  },
  {
    "id": "4",
    "title": "BATASAN MASALAH",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Dataset yang dipakai hanya FER2013 dengan keanggotaan Usage resmi Training, PublicTest, dan PrivateTest tanpa pembagian ulang acak. Audit exact duplicate dicatat sebagai pengecekan kualitas data dan tidak mengganti split resmi pada evaluasi primer. Mempertahankan split resmi tidak menghilangkan duplikat lintas subset; kesimpulan evaluasi primer dibatasi pada protokol benchmark ini."
      },
      {
        "kind": "text",
        "text": "Tugas yang diteliti adalah klasifikasi citra tunggal ke tujuh label FER2013, bukan deteksi wajah pada video, pelacakan emosi temporal, atau inferensi keadaan psikologis."
      },
      {
        "kind": "text",
        "text": "Backbone ditetapkan MobileNetV2 alpha 1,0 dengan bobot awal ImageNet dan ukuran input 96 × 96 × 3."
      },
      {
        "kind": "text",
        "text": "Optimasi dibatasi pada dua tingkat augmentasi dan tiga fungsi loss: categorical cross-entropy sebagai baseline, class-weighted cross-entropy sebagai pembanding, dan class-weighted focal loss sebagai metode yang diusulkan. Optimizer, learning rate, batch size, arsitektur kepala klasifikasi, pembagian data, callback, dan prosedur fine-tuning dikendalikan sama."
      },
      {
        "kind": "text",
        "text": "Augmentasi hanya diterapkan secara daring pada data latih dan tidak diterapkan pada data validasi maupun data uji."
      },
      {
        "kind": "text",
        "text": "Metrik utama adalah macro-F1. Metrik sekunder adalah accuracy, weighted F1, precision, recall, F1-score per kelas, confusion matrix ternormalisasi, serta kestabilan hasil antarseed."
      },
      {
        "kind": "text",
        "text": "Audit kualitas data mencakup exact duplicate dan citra low-information. Near-duplicate tidak difilter karena memerlukan definisi kemiripan serta validasi manual tambahan."
      }
    ]
  },
  {
    "id": "5",
    "title": "MANFAAT PENELITIAN",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Menyediakan bukti empiris mengenai pengaruh augmentasi, pembobotan kelas, dan pemfokusan sampel sulit pada MobileNetV2–FER2013."
      },
      {
        "kind": "text",
        "text": "Memberikan dasar penilaian interaksi augmentasi dan loss pada klasifikasi citra tidak seimbang."
      },
      {
        "kind": "text",
        "text": "Menyediakan protokol dan artefak eksperimen yang dapat diperiksa ulang oleh peneliti klasifikasi citra."
      }
    ]
  },
  {
    "id": "6",
    "title": "TINJAUAN PUSTAKA",
    "level": 1,
    "blocks": []
  },
  {
    "id": "6.1",
    "title": "Tinjauan Empiris",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tinjauan empiris difokuskan pada penelitian yang menggunakan FER2013, MobileNetV2, augmentasi data, atau fungsi loss untuk ketidakseimbangan kelas. Penelitian yang hanya membahas FER secara umum digunakan sebagai konteks, sedangkan posisi penelitian ditentukan terutama oleh pekerjaan yang paling dekat pada tahun 2024–2026."
      },
      {
        "kind": "text",
        "text": "Tabel 6.1 Ringkasan Penelitian Terdahulu"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Penelitian",
            "Fokus",
            "Hasil Utama",
            "Keterbatasan",
            "Posisi Penelitian"
          ],
          [
            "Goodfellow dkk (2013)",
            "Membangun benchmark FER2013, 35.887 citra 48 × 48 dan tujuh kelas.",
            "Menetapkan dataset dan split Usage resmi.",
            "Bukan studi transfer learning atau fungsi loss.",
            "Menjadi sumber karakteristik dan pembagian data."
          ],
          [
            "Nalle dkk (2022)",
            "MobileNetV2 dan dropout untuk klasifikasi tiga motif tenun Rote Ndao.",
            "Accuracy terbaik 93% dengan 5-fold cross-validation.",
            "Dataset kecil dan relatif seimbang; bukan FER atau analisis loss.",
            "Rujukan JELIKU Udayana untuk penerapan MobileNetV2 pada klasifikasi citra."
          ],
          [
            "Khaireddin dan Chen (2021)",
            "VGGNet pada FER2013 dengan optimasi pelatihan.",
            "Accuracy 73,28% tanpa data tambahan.",
            "Backbone besar; fokus bukan ketidakseimbangan kelas.",
            "Menunjukkan FER2013 masih menantang dan protokol pelatihan penting."
          ],
          [
            "Zhu dkk (2024)",
            "Improved MobileNetV2 dengan reverse fusion, SELU, dan SE-Net.",
            "Accuracy FER2013 68,62%; parameter turun 83,8%.",
            "Banyak perubahan arsitektur sekaligus.",
            "Penelitian ini mempertahankan backbone agar faktor loss dan augmentasi dapat diisolasi."
          ],
          [
            "Vidiadivani dan Suhartana (2024)",
            "Transfer learning EfficientNetB0 untuk klasifikasi 12 jenis sampah.",
            "Menggunakan 12.412 citra dan subset validasi serta uji terpisah.",
            "Arsitektur dan domain berbeda; tidak menguji interaksi faktor.",
            "Rujukan Informatika Udayana untuk alur transfer learning klasifikasi citra."
          ],
          [
            "Yuniari dkk (2024)",
            "InceptionV3 dan MobileNetV2 untuk tujuh kelas topeng Bali.",
            "MobileNetV2 mencapai accuracy 74,28% dan InceptionV3 88,57%.",
            "Split 50:50 dan domain berbeda; bukan studi imbalance atau loss.",
            "Rujukan JELIKU Udayana tentang arsitektur ringan dan evaluasi per kelas."
          ],
          [
            "Mandave dan Patil (2025)",
            "Perbandingan MobileNetV2 dan EfficientNet-B0 pada FER2013.",
            "MobileNetV2: accuracy 71,8%; macro-F1 0,689.",
            "Tidak menguji interaksi; angka macro-F1 tabel dan kesimpulan tidak konsisten.",
            "Memberi baseline MobileNetV2 dan contoh evaluasi statistik."
          ],
          [
            "Radytia dan Darusalam (2026)",
            "MobileNetV2 dua tahap untuk smart learning environment.",
            "Accuracy 0,39; macro-F1 0,34.",
            "Fokus aplikasi temporal dan kalibrasi; hasil sulit dibandingkan karena protokol berbeda.",
            "Menegaskan perlunya split dan konfigurasi yang eksplisit."
          ],
          [
            "Marbun dkk (2025)",
            "Tanpa, augmentasi ringan, dan augmentasi kompleks pada MobileNetV2–FER2013.",
            "Validation accuracy terbaik 22,7% pada augmentasi ringan.",
            "Detail protokol perlu diperiksa pada teks penuh; abstrak tidak menguji interaksi loss dan augmentasi.",
            "Menjadi dasar pemilihan augmentasi ringan, tetapi bukan jawaban atas interaksi."
          ],
          [
            "He dkk (2026)",
            "CE, WCE, focal, class-balanced focal, dan GSWCE pada Mini_XCEPTION–FER2013.",
            "Validation set FER2013. Macro-F1: CE 58,1%; WCE 63,8%; focal 61,3%; class-balanced focal 64,7%.",
            "Backbone dan tujuan penerapan berbeda; augmentasi bukan faktor faktorial.",
            "Mendasari pemisahan pembobotan kelas dan pemfokusan sampel sulit."
          ]
        ]
      }
    ]
  },
  {
    "id": "6.1.1",
    "title": "Benchmark dan Karakteristik FER2013",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Goodfellow dkk (2013) menjadi acuan benchmark dan pembagian Usage FER2013. Rincian karakteristik serta distribusi kelas disajikan pada Bagian 6.3."
      },
      {
        "kind": "text",
        "text": "FER2013 juga memiliki keterbatasan anotasi. Barsoum dkk (2016) melakukan pelabelan ulang citra FER2013 oleh beberapa anotator dan menghasilkan FERPlus, yang menunjukkan bahwa satu citra dapat menerima distribusi persepsi ekspresi yang berbeda. Penelitian ini tetap memakai label asli FER2013 untuk menjaga keterbandingan benchmark, tetapi tidak menginterpretasikan label sebagai keadaan psikologis yang pasti. Ambiguitas label dianggap sebagai ancaman validitas dan salah satu alasan mengapa hasil per kelas serta confusion matrix harus dianalisis, bukan hanya accuracy."
      }
    ]
  },
  {
    "id": "6.1.2",
    "title": "Studi MobileNetV2 pada FER2013",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Zhu dkk (2024) mengubah beberapa komponen MobileNetV2 sekaligus melalui reverse fusion, SELU, dan squeeze-and-excitation. Hasil 68,62% pada FER2013 menunjukkan bahwa modifikasi arsitektur dapat diuji, tetapi desain tersebut tidak dapat memisahkan kontribusi setiap komponen tanpa ablation yang sepadan. Penelitian ini mengambil keputusan berbeda: struktur backbone dipertahankan agar perubahan kinerja dapat dikaitkan dengan augmentasi dan strategi loss, bukan dengan perubahan arsitektur."
      },
      {
        "kind": "text",
        "text": "Mandave dan Patil (2025) melaporkan accuracy 71,8% dan macro-F1 0,689 untuk MobileNetV2 pada Tabel 1. Namun, bagian kesimpulan menyebut macro-F1 0,82 untuk model tersebut. Studi ini juga memakai pembagian data latih 80:20 untuk validasi dan pembobotan kelas, sehingga hasilnya tidak menjadi target langsung bagi baseline A0B0. Inkonsistensi angka membatasi pemanfaatannya sebagai pembanding kuantitatif. Radytia dan Darusalam (2026) membahas MobileNetV2 dua tahap pada konteks pembelajaran; perbedaan konfigurasi dan protokol juga perlu diperhatikan sebelum membandingkan kinerja."
      }
    ]
  },
  {
    "id": "6.1.3",
    "title": "Studi Augmentasi pada MobileNetV2–FER2013",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Dalam abstraknya, Marbun dkk (2025) membandingkan tanpa augmentasi, augmentasi ringan, dan augmentasi kompleks pada MobileNetV2–FER2013. Validation accuracy yang dilaporkan berturut-turut adalah 10,8%, 22,7%, dan 8,3%. Temuan tersebut mendukung perlunya mengevaluasi kebijakan augmentasi, tetapi tidak menetapkan bahwa semua transformasi ringan pasti lebih baik atau bahwa rentang pada penelitian ini sudah optimal. Angka tersebut tidak digunakan sebagai target kinerja karena kesetaraan protokol belum dipastikan."
      },
      {
        "kind": "text",
        "text": "Studi tersebut belum menguji konsistensi efek augmentasi ketika fungsi loss berubah. Augmentasi mengubah distribusi masukan, sedangkan loss mengatur kontribusi gradien setiap sampel. Kedua mekanisme bertemu saat pembaruan bobot, sehingga efek augmentasi mungkin bergantung pada loss. Kemungkinan itu diuji sebagai interaksi dan tidak diasumsikan pasti terjadi."
      }
    ]
  },
  {
    "id": "6.1.4",
    "title": "Studi Fungsi Loss untuk Ketidakseimbangan FER2013",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "He dkk (2026) membandingkan CE, WCE, focal loss, class-balanced focal loss, dan GSWCE pada FER2013 dengan backbone Mini_XCEPTION. Pada validation set FER2013, macro-F1 yang dilaporkan adalah 58,1% untuk CE, 63,8% untuk WCE, 61,3% untuk focal loss, dan 64,7% untuk class-balanced focal loss. Temuan tersebut merupakan bukti empiris bahwa koreksi ketidakseimbangan dapat mengubah macro-F1, tetapi tidak menjamin urutan yang sama pada MobileNetV2 karena representasi fitur, preprocessing, dan protokol pelatihan berbeda."
      },
      {
        "kind": "text",
        "text": "Hasil He dkk (2026) memperlihatkan bahwa pembobotan kelas dan pemfokusan sampel memberi pengaruh berbeda. Pengujian pada MobileNetV2 diperlukan karena perbedaan backbone dan protokol membatasi penerapan langsung urutan kinerja tersebut."
      }
    ]
  },
  {
    "id": "6.1.5",
    "title": "Keterkaitan dengan Penelitian Citra di Udayana",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Nalle dkk (2022) menerapkan MobileNetV2, dropout, dan 5-fold cross-validation untuk klasifikasi motif tenun Rote Ndao dan memperoleh accuracy terbaik 93%. Vidiadivani dan Suhartana (2024) menerapkan transfer learning EfficientNetB0 pada klasifikasi 12 jenis sampah. Kedua artikel JELIKU tersebut menunjukkan bahwa transfer learning dan evaluasi klasifikasi citra relevan dengan ekosistem penelitian Informatika Universitas Udayana. Namun, datasetnya tidak memiliki karakter distribusi dan ambiguitas label yang sama dengan FER2013."
      },
      {
        "kind": "text",
        "text": "Yuniari dkk (2024), yang juga diterbitkan JELIKU, membandingkan InceptionV3 dan MobileNetV2 pada tujuh kelas topeng Bali dan memperoleh accuracy MobileNetV2 74,28%. Studi tersebut berguna sebagai rujukan lokal mengenai penggunaan global average pooling, dropout, dan evaluasi per kelas. Penelitian ini tidak menjadikannya baseline utama karena domain, split 50:50, dan tujuan eksperimennya berbeda. Pencantuman penelitian lokal berfungsi menunjukkan kesinambungan bidang, bukan menggantikan kebutuhan baseline yang sebanding."
      }
    ]
  },
  {
    "id": "6.2",
    "title": "Posisi dan Celah Penelitian",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "MobileNetV2, FER2013, augmentasi, dan focal loss telah digunakan pada penelitian terdahulu. Berdasarkan literatur yang ditinjau, belum ditemukan satu protokol MobileNetV2 yang secara terkontrol mengukur pengaruh augmentasi, membandingkan CE, WCE, dan class-weighted focal loss, lalu menguji interaksi augmentasi × loss. Rancangan faktorial memungkinkan perubahan kinerja dikaitkan dengan faktor tertentu, tidak dengan satu paket modifikasi yang diterapkan sekaligus."
      },
      {
        "kind": "text",
        "text": "Kontribusi penelitian terletak pada bukti empiris dan prosedur pengujiannya: kontrol konfigurasi, evaluasi per kelas, lima seed berpasangan, dan analisis interaksi. Luaran yang dituju berupa kesimpulan tentang pengaruh kedua faktor pada protokol yang diuji, bukan arsitektur atau fungsi loss baru."
      }
    ]
  },
  {
    "id": "6.3",
    "title": "Citra Digital dan FER2013",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Citra digital direpresentasikan sebagai matriks nilai piksel (Gonzalez dan Woods, 2018). Setiap citra FER2013 memiliki satu kanal grayscale berukuran 48 × 48. Label 0–6 dipetakan berturut-turut ke angry, disgust, fear, happy, sad, surprise, dan neutral sesuai distribusi dataset. Karena citra beresolusi rendah, resizing tidak menciptakan detail baru; tahap tersebut hanya menyesuaikan dimensi tensor agar dapat diproses backbone."
      },
      {
        "kind": "text",
        "text": "Tabel 6.2 Distribusi Kelas pada Split Resmi FER2013"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Label",
            "Kelas",
            "Training",
            "PublicTest",
            "PrivateTest",
            "Total"
          ],
          [
            "0",
            "Angry",
            "3.995",
            "467",
            "491",
            "4.953"
          ],
          [
            "1",
            "Disgust",
            "436",
            "56",
            "55",
            "547"
          ],
          [
            "2",
            "Fear",
            "4.097",
            "496",
            "528",
            "5.121"
          ],
          [
            "3",
            "Happy",
            "7.215",
            "895",
            "879",
            "8.989"
          ],
          [
            "4",
            "Sad",
            "4.830",
            "653",
            "594",
            "6.077"
          ],
          [
            "5",
            "Surprise",
            "3.171",
            "415",
            "416",
            "4.002"
          ],
          [
            "6",
            "Neutral",
            "4.965",
            "607",
            "626",
            "6.198"
          ],
          [
            "",
            "Total",
            "28.709",
            "3.589",
            "3.589",
            "35.887"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Ketidakseimbangan paling jelas terlihat antara happy dan disgust. Pada subset Training, happy memiliki 7.215 citra sedangkan disgust hanya 436 citra, sehingga rasio keduanya sekitar 16,5:1. Tanpa pembobotan, setiap citra tetap dihitung oleh CE, tetapi kelas happy menghasilkan lebih banyak kontribusi gradien total karena frekuensinya lebih besar. Dampak ketidakseimbangan terhadap CNN dapat bergantung pada tingkat ketimpangan, jumlah data, dan kompleksitas masalah (Buda dkk, 2018). Kondisi FER2013 tersebut menjadi alasan pemilihan macro-F1, recall per kelas, WCE, dan class-weighted focal loss."
      }
    ]
  },
  {
    "id": "6.4",
    "title": "Convolutional Neural Network",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "CNN mempelajari filter spasial untuk membentuk feature map dari pola lokal. Lapisan awal cenderung merespons tepi dan tekstur, sedangkan lapisan lebih dalam menggabungkan pola tersebut menjadi representasi yang lebih abstrak. Pada FER, pola yang relevan antara lain bentuk alis, bukaan mata, kontur mulut, dan hubungan spasial antarbagiannya. Bobot filter diperbarui melalui backpropagation berdasarkan gradien fungsi loss."
      }
    ]
  },
  {
    "id": "6.5",
    "title": "Transfer Learning",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Transfer learning menggunakan parameter hasil pelatihan pada tugas sumber sebagai titik awal tugas target. Pada penelitian ini, tugas sumber adalah klasifikasi 1.000 kelas ImageNet dan tugas target adalah klasifikasi tujuh ekspresi FER2013. Hubungan kelas sumber dan target tidak harus sama. Transfer dimungkinkan karena fitur visual umum pada lapisan awal, seperti tepi, sudut, tekstur, dan bentuk, tetap berguna pada banyak domain citra."
      },
      {
        "kind": "text",
        "text": "Dasar pelatihan dua tahap adalah mempelajari kepala klasifikasi terlebih dahulu, lalu menyesuaikan fitur tingkat tinggi dengan learning rate lebih kecil. Pengaturan lapisan, optimizer, dan checkpoint ditetapkan pada Bagian 7.6."
      }
    ]
  },
  {
    "id": "6.6",
    "title": "MobileNetV2",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "MobileNetV2 adalah CNN ringan yang menggunakan blok bottleneck residual terbalik. Istilah terbalik muncul karena blok dimulai dari kanal sempit, diperluas dengan konvolusi 1 × 1, diproses secara spasial dengan depthwise convolution 3 × 3, lalu diproyeksikan kembali ke kanal sempit. Pada ResNet konvensional, bagian tengah residual sering lebih sempit; pada MobileNetV2 bagian tengah justru diperluas."
      },
      {
        "kind": "text",
        "text": "Depthwise separable convolution memisahkan operasi spasial dan pencampuran kanal. Depthwise convolution menerapkan satu filter pada setiap kanal secara independen. Pointwise convolution 1 × 1 kemudian menggabungkan informasi antarkanal. Untuk kernel K × K, kanal masukan M, kanal keluaran N, dan feature map D × D, konvolusi standar membutuhkan kira-kira D²K²MN operasi, sedangkan depthwise separable convolution membutuhkan D²(K²M + MN). Penghematan komputasi tersebut adalah arti efisien pada MobileNetV2: jumlah operasi dan parameter berkurang untuk kapasitas representasi yang tetap memadai, bukan jaminan bahwa accuracy selalu lebih tinggi."
      },
      {
        "kind": "text",
        "text": "Blok MobileNetV2 memiliki tiga langkah. Expansion convolution 1 × 1 memperbesar jumlah kanal dengan faktor t dan menggunakan ReLU6. Depthwise convolution 3 × 3 mengekstraksi pola spasial per kanal. Linear projection 1 × 1 menurunkan kembali jumlah kanal tanpa aktivasi nonlinear. Linear bottleneck dipakai karena aktivasi nonlinear pada ruang berdimensi rendah dapat membuang informasi. Shortcut ditambahkan jika stride = 1 dan jumlah kanal masukan sama dengan keluaran, sehingga gradien dan informasi dapat mengalir lebih stabil."
      },
      {
        "kind": "text",
        "text": "Tabel 6.3 Aliran Tensor pada MobileNetV2 untuk Input 96 × 96 × 3"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Tahap",
            "Ukuran Keluaran",
            "Fungsi"
          ],
          [
            "Input",
            "96 × 96 × 3",
            "Citra grayscale direplikasi menjadi tiga kanal dan dinormalisasi."
          ],
          [
            "Conv 3 × 3, s=2",
            "48 × 48 × 32",
            "Ekstraksi fitur awal."
          ],
          [
            "Bottleneck t1, c16, n1, s1",
            "48 × 48 × 16",
            "Proyeksi kanal awal."
          ],
          [
            "Bottleneck t6, c24, n2, s2",
            "24 × 24 × 24",
            "Downsampling dan ekstraksi fitur."
          ],
          [
            "Bottleneck t6, c32, n3, s2",
            "12 × 12 × 32",
            "Fitur menengah."
          ],
          [
            "Bottleneck t6, c64, n4, s2",
            "6 × 6 × 64",
            "Fitur semantik lebih dalam."
          ],
          [
            "Bottleneck t6, c96, n3, s1",
            "6 × 6 × 96",
            "Menambah kanal tanpa downsampling."
          ],
          [
            "Bottleneck t6, c160, n3, s2",
            "3 × 3 × 160",
            "Fitur tingkat tinggi."
          ],
          [
            "Bottleneck t6, c320, n1, s1",
            "3 × 3 × 320",
            "Proyeksi akhir bottleneck."
          ],
          [
            "Conv 1 × 1",
            "3 × 3 × 1280",
            "Menggabungkan fitur tingkat tinggi."
          ],
          [
            "Global average pooling",
            "1280",
            "Merata-ratakan setiap feature map."
          ],
          [
            "Dropout 0,20",
            "1280",
            "Regularisasi kepala klasifikasi saat pelatihan."
          ],
          [
            "Dense 7 + softmax",
            "7 probabilitas",
            "Menghasilkan distribusi probabilitas tujuh kelas."
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Softmax mengubah tujuh logit z menjadi probabilitas yang berjumlah satu. Kelas keluaran dipilih dari indeks dengan probabilitas terbesar. Selama pelatihan, probabilitas kelas benar digunakan oleh fungsi loss untuk menghitung kesalahan; gradien kesalahan kemudian mengubah bobot kepala klasifikasi dan lapisan backbone yang dibuka."
      },
      {
        "kind": "table",
        "rows": [
          [
            "p(c|x) = exp(z_c) / Σⱼ exp(z_j)",
            "(6.1)"
          ]
        ]
      }
    ]
  },
  {
    "id": "6.6.1",
    "title": "Arti dan Pengukuran Efisiensi MobileNetV2",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Istilah efisien pada MobileNetV2 harus dibatasi pada efisiensi sumber daya, bukan dianggap sinonim dengan accuracy tinggi. Depthwise separable convolution mengurangi parameter dan operasi perkalian-penjumlahan dibandingkan konvolusi standar dengan ukuran kanal yang sebanding. Pada konfigurasi Keras alpha 1,0 dan include_top=False, backbone memiliki sekitar 2.257.984 parameter. Kepala Dense tujuh kelas menambahkan 8.967 parameter sehingga total rancangan sekitar 2.266.951 parameter; jumlah pasti diverifikasi dari model.summary pada implementasi."
      },
      {
        "kind": "text",
        "text": "Tabel 6.4 Definisi Operasional Efisiensi Model"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Indikator",
            "Cara Ukur",
            "Makna dan Batasan"
          ],
          [
            "Jumlah parameter",
            "model.count_params()",
            "Kapasitas penyimpanan parameter; bukan waktu nyata secara langsung."
          ],
          [
            "Parameter trainable",
            "Dihitung pada tahap head dan fine-tuning",
            "Menunjukkan banyak bobot yang diperbarui pada tiap tahap."
          ],
          [
            "Ukuran berkas model",
            "MB setelah model disimpan",
            "Dipengaruhi format dan presisi bobot."
          ],
          [
            "Operasi komputasi",
            "FLOPs/MAdds dari profiler",
            "Perkiraan beban aritmetika untuk satu forward pass."
          ],
          [
            "Latensi inferensi",
            "Median dan p95 ms/citra, batch 1",
            "Harus diukur pada perangkat, versi software, dan prosedur warm-up yang sama."
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Seluruh skenario memakai arsitektur yang sama sehingga jumlah parameter dan biaya inferensi secara teoretis tidak berubah akibat augmentasi atau fungsi loss; keduanya hanya aktif saat training. Karena itu, penelitian tidak mengklaim satu skenario loss lebih efisien saat inferensi. Profiling dilaporkan satu kali sebagai karakteristik implementasi MobileNetV2 dan sebagai jawaban faktual atas alasan pemilihan backbone ringan."
      }
    ]
  },
  {
    "id": "6.7",
    "title": "Augmentasi Data",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Augmentasi data adalah transformasi terhadap citra latih untuk membentuk variasi masukan yang tetap mempertahankan label (Shorten dan Khoshgoftaar, 2019). Pada implementasi ini transformasi diterapkan secara acak dan daring tanpa membuat salinan permanen. Tujuannya bukan menambah informasi semantik baru, melainkan mengurangi ketergantungan model pada posisi, skala, atau kontras tertentu. Pada wajah, horizontal flip umumnya tetap mempertahankan ekspresi, sedangkan rotasi besar, vertical flip, atau distorsi ekstrem dapat mengubah geometri wajah dan tidak digunakan."
      },
      {
        "kind": "text",
        "text": "Kebijakan augmentasi ringan dibatasi pada transformasi geometris dan kontras yang ditetapkan sebelum eksperimen. Seluruh skenario A1 memakai parameter yang sama pada Tabel 7.4 agar pengujian berfokus pada keberadaan augmentasi."
      }
    ]
  },
  {
    "id": "6.8",
    "title": "Categorical Cross-Entropy",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Categorical cross-entropy menghitung log negatif probabilitas kelas benar. Fungsi ini tidak memperlakukan semua prediksi sebagai sama: ketika pₜ kecil, loss dan gradien menjadi lebih besar. Keterbatasannya pada data tidak seimbang berasal dari agregasi seluruh sampel. Kelas mayoritas muncul lebih sering sehingga kontribusi totalnya dapat mendominasi proses pembelajaran bobot meskipun loss dihitung dengan benar pada setiap sampel."
      },
      {
        "kind": "table",
        "rows": [
          [
            "L_CE = -(1/N) Σᵢ Σ_c yᵢ,c log(pᵢ,c)",
            "(6.2)"
          ]
        ]
      }
    ]
  },
  {
    "id": "6.9",
    "title": "Class-Weighted Cross-Entropy",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Class-weighted cross-entropy mengalikan loss setiap sampel dengan bobot α_c berdasarkan frekuensi kelas. Penelitian menggunakan inverse-frequency weight α_c = N/(C·n_c), dengan N jumlah data latih, C = 7, dan n_c jumlah data latih pada kelas c. Bobot dihitung hanya dari subset Training. WCE mengisolasi kontribusi koreksi frekuensi kelas tanpa modulating factor untuk sampel mudah dan sulit."
      },
      {
        "kind": "table",
        "rows": [
          [
            "L_WCE = -(1/N) Σᵢ Σ_c α_c yᵢ,c log(pᵢ,c)",
            "(6.3)"
          ]
        ]
      }
    ]
  },
  {
    "id": "6.10",
    "title": "Class-Weighted Focal Loss",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Untuk probabilitas kelas benar pₜ, categorical cross-entropy satu sampel adalah -log(pₜ). Focal loss mengalikannya dengan modulating factor (1-pₜ)^γ, sehingga FL = -(1-pₜ)^γ log(pₜ) (Lin dkk, 2017). Ketika pₜ mendekati satu, faktor tersebut mendekati nol dan kontribusi sampel mudah berkurang. Ketika pₜ rendah, nilainya mendekati satu sehingga loss sampel sulit relatif dipertahankan. Dengan γ = 0, focal loss kembali sama dengan CE."
      },
      {
        "kind": "table",
        "rows": [
          [
            "L_CWFL,i = -α_yᵢ (1-pₜ,ᵢ)² log(pₜ,ᵢ)",
            "(6.4)"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Lin dkk (2017) mengembangkan focal loss untuk ketimpangan foreground–background pada deteksi objek dan melaporkan γ = 2 sebagai konfigurasi terbaik dalam eksperimen mereka. Penelitian ini menetapkan γ = 2 sebelum evaluasi sebagai nilai rujukan, bukan sebagai jaminan bahwa nilai tersebut optimal untuk FER2013. Untuk klasifikasi tujuh kelas, bobot α_c = N/(C·n_c) diterapkan sebagai adaptasi multiclass berbasis inverse frequency. Vektor α_c yang sama digunakan pada WCE dan class-weighted focal loss agar perbandingan keduanya memisahkan pengaruh modulating factor."
      },
      {
        "kind": "text",
        "text": "Tabel 6.5 Ilustrasi Numerik CE, WCE, dan Class-Weighted Focal Loss"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Kondisi",
            "p_t",
            "CE",
            "WCE (α=4)",
            "CWFL (α=4; γ=2)"
          ],
          [
            "Mudah",
            "0,90",
            "0,105",
            "0,421",
            "0,004"
          ],
          [
            "Sedang",
            "0,50",
            "0,693",
            "2,773",
            "0,693"
          ],
          [
            "Sulit",
            "0,10",
            "2,303",
            "9,210",
            "7,460"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Tabel 6.6 menggunakan bobot kelas hipotesis α = 4 untuk memperlihatkan mekanisme, bukan bobot aktual FER2013. Pada pₜ = 0,90, WCE tetap mengalikan CE dengan empat, sedangkan faktor (1-0,90)² menekan nilai class-weighted focal loss. Pada pₜ = 0,10, faktor tersebut bernilai 0,81 sehingga banyak loss tetap dipertahankan. Bobot kelas mengatur kontribusi menurut frekuensi kelas; modulating factor mengaturnya menurut keyakinan model terhadap kelas benar."
      },
      {
        "kind": "text",
        "text": "Besar loss memengaruhi besar dan arah gradien yang dihitung melalui backpropagation. Sampel dengan kontribusi loss lebih besar cenderung memberi dorongan pembelajaran bobot yang lebih kuat, tetapi hasil akhir tetap bergantung pada representasi fitur, optimizer, learning rate, dan interaksi seluruh sampel dalam batch. Oleh karena itu, formula focal loss tidak menjadi bukti bahwa performa pasti meningkat; peningkatan harus dibuktikan melalui eksperimen terkontrol."
      }
    ]
  },
  {
    "id": "6.11",
    "title": "Metrik Evaluasi",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Macro-F1 dipilih sebagai metrik utama karena menghitung F1-score setiap kelas lalu merata-ratakannya tanpa mempertimbangkan ukuran kelas. Setiap kelas memperoleh kontribusi yang sama, sehingga kegagalan pada disgust tidak tertutup oleh banyaknya sampel happy. Accuracy tetap dilaporkan untuk keterbandingan dengan literatur, sedangkan weighted F1 menjelaskan performa sesuai proporsi kelas."
      },
      {
        "kind": "table",
        "rows": [
          [
            "Precision_c = TP_c / (TP_c + FP_c)",
            "(6.5)"
          ],
          [
            "Recall_c = TP_c / (TP_c + FN_c)",
            "(6.6)"
          ],
          [
            "F1_c = 2P_cR_c/(P_c + R_c)",
            "(6.7)"
          ],
          [
            "Macro-F1 = (1/C) Σ_c F1_c",
            "(6.8)"
          ]
        ]
      }
    ]
  },
  {
    "id": "6.12",
    "title": "Backpropagation, Optimizer Adam, dan Learning Rate",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Satu langkah pelatihan terdiri atas forward pass, perhitungan loss, backpropagation, dan pembaruan bobot. Pada forward pass, batch citra melewati MobileNetV2 dan softmax untuk menghasilkan probabilitas. Fungsi loss membandingkan probabilitas tersebut dengan label. Backpropagation menggunakan aturan rantai untuk menghitung turunan loss terhadap setiap parameter trainable. Optimizer kemudian memakai gradien tersebut untuk menentukan perubahan bobot."
      },
      {
        "kind": "text",
        "text": "Adam menyimpan estimasi momen pertama dan kedua gradien sehingga besar pembaruan menyesuaikan riwayat gradien setiap parameter (Kingma dan Ba, 2015). Learning rate mengendalikan skala langkah. Nilai 1 × 10⁻³ dipakai ketika hanya kepala baru yang dilatih, sedangkan 1 × 10⁻⁵ dipakai saat fine-tuning agar bobot pretrained tidak berubah secara drastis. Setelah status trainable diubah, model harus dikompilasi ulang supaya framework membangun daftar parameter dan optimizer state yang sesuai."
      },
      {
        "kind": "text",
        "text": "Batch size 32 berarti satu pembaruan dilakukan setelah akumulasi loss dari 32 citra. Satu epoch berarti seluruh data Training telah diproses satu kali secara efektif. Early stopping bukan pengganti jumlah epoch, tetapi aturan penghentian ketika validation macro-F1 tidak membaik selama patience yang ditentukan. ReduceLROnPlateau menurunkan learning rate ketika validation loss stagnan agar pembaruan mendekati minimum dengan langkah lebih kecil."
      }
    ]
  },
  {
    "id": "6.13",
    "title": "Variasi Random Seed dan Reproduksibilitas",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Pelatihan jaringan saraf bersifat stokastik karena inisialisasi kepala klasifikasi, urutan batch, dropout, dan augmentasi acak. Satu run dapat menghasilkan angka yang kebetulan tinggi atau rendah. Lima random seed digunakan untuk mengestimasi variasi tersebut. Seed yang sama dipasangkan pada enam skenario agar perbandingan tidak dicampur dengan urutan acak yang sepenuhnya berbeda."
      },
      {
        "kind": "text",
        "text": "Seed tidak menjamin bitwise determinism pada seluruh perangkat GPU. Reproduksibilitas juga membutuhkan versi framework, jenis GPU, konfigurasi deterministic operations, sumber data, dan seluruh hyperparameter. Karena itu, hasil dilaporkan sebagai rata-rata ± simpangan baku dan setiap run disimpan, bukan hanya memilih run terbaik."
      }
    ]
  },
  {
    "id": "7",
    "title": "METODOLOGI PENELITIAN",
    "level": 1,
    "blocks": []
  },
  {
    "id": "7.1",
    "title": "Jenis dan Desain Penelitian",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Penelitian ini merupakan eksperimen kuantitatif komparatif dengan rancangan faktorial 2 × 3. Faktor A adalah augmentasi data dengan tingkat A0 tanpa augmentasi dan A1 augmentasi ringan. Faktor B adalah strategi fungsi loss dengan tingkat B0 categorical cross-entropy, B1 class-weighted cross-entropy, dan B2 class-weighted focal loss. Enam kombinasi dijalankan pada lima random seed yang sama sehingga terdapat 30 proses pelatihan utama."
      },
      {
        "kind": "text",
        "text": "Rancangan faktorial dipilih karena perbandingan baseline dengan satu paket perubahan tidak dapat menentukan komponen yang menyebabkan selisih kinerja. Dengan 2 × 3, pengaruh utama augmentasi, pengaruh utama strategi loss, dan efek interaksi keduanya dapat dipisahkan. Random seed dianggap sebagai blok untuk mengurangi pengaruh variasi inisialisasi kepala klasifikasi, urutan batch, dan augmentasi acak."
      },
      {
        "kind": "image",
        "src": "assets/image2.png"
      },
      {
        "kind": "text",
        "text": "Gambar 7.1 Alur Eksperimen Penelitian"
      }
    ]
  },
  {
    "id": "7.1.1",
    "title": "Hipotesis Operasional",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Hipotesis dinyatakan tanpa arah karena literatur belum cukup untuk menjamin konfigurasi mana yang lebih tinggi pada protokol MobileNetV2 penelitian ini. Hipotesis statistik yang diuji adalah:"
      },
      {
        "kind": "text",
        "text": "H0A: tidak terdapat perbedaan rata-rata macro-F1 antara tanpa augmentasi dan augmentasi ringan setelah strategi loss dan seed dikendalikan. H1A: terdapat perbedaan rata-rata macro-F1 antara kedua tingkat augmentasi."
      },
      {
        "kind": "text",
        "text": "H0B: tidak terdapat perbedaan rata-rata macro-F1 antara CE, WCE, dan class-weighted focal loss setelah augmentasi dan seed dikendalikan. H1B: sedikitnya satu strategi loss memiliki rata-rata macro-F1 yang berbeda."
      },
      {
        "kind": "text",
        "text": "H0AB: tidak terdapat interaksi augmentasi × loss terhadap macro-F1. H1AB: pengaruh augmentasi terhadap macro-F1 bergantung pada strategi loss yang dipakai."
      },
      {
        "kind": "text",
        "text": "Penolakan H0AB belum berarti class-weighted focal loss adalah konfigurasi terbaik. Interaksi hanya menyatakan bahwa selisih antara A0 dan A1 tidak seragam pada semua loss. Arah dan besar interaksi harus dibaca dari estimated marginal means, selisih rata-rata, confidence interval, dan interaction plot."
      }
    ]
  },
  {
    "id": "7.2",
    "title": "Variabel Penelitian",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tabel 7.1 Variabel Penelitian"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Jenis",
            "Variabel",
            "Definisi Operasional"
          ],
          [
            "Bebas A",
            "Augmentasi data",
            "A0: tidak; A1: ringan sesuai Tabel 7.4"
          ],
          [
            "Bebas B",
            "Strategi fungsi loss",
            "B0: CE; B1: WCE; B2: class-weighted focal loss"
          ],
          [
            "Terikat utama",
            "Macro-F1",
            "Rata-rata F1 tujuh kelas pada PrivateTest resmi"
          ],
          [
            "Terikat sekunder",
            "Accuracy, weighted F1, metrik per kelas",
            "PrivateTest resmi dan analisis audit duplicate sebagai sensitivitas"
          ],
          [
            "Kontrol",
            "Model dan pelatihan",
            "Split, input, bobot ImageNet, head, optimizer, LR, batch, epoch maksimum, callback, seed berpasangan"
          ]
        ]
      }
    ]
  },
  {
    "id": "7.3",
    "title": "Data dan Pembagian Dataset",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Data diperoleh dari mirror FER2013 berbentuk berkas JPEG per kelas. Keanggotaan Usage direkonstruksi dari folder train dan prefix nama Training_, PublicTest_, serta PrivateTest_. Sebanyak 28.709 citra Training digunakan untuk pembelajaran bobot. PublicTest resmi digunakan untuk validasi, pemilihan checkpoint setiap run, dan pemilihan konfigurasi berdasarkan rata-rata macro-F1 dari lima seed. PrivateTest resmi digunakan sebagai data uji primer setelah pilihan konfigurasi dikunci. Split bawaan dataset dipertahankan tanpa pembagian ulang acak."
      },
      {
        "kind": "text",
        "text": "Tabel 7.2 Pembagian Data FER2013 Mengikuti Split Resmi"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Subset",
            "Jumlah",
            "Peran"
          ],
          [
            "Training resmi",
            "28.709",
            "Pelatihan dan perhitungan bobot kelas"
          ],
          [
            "PublicTest resmi",
            "3.589",
            "Validasi, early stopping, pemilihan checkpoint, dan pemilihan konfigurasi"
          ],
          [
            "PrivateTest resmi",
            "3.589",
            "Evaluasi primer seluruh skenario setelah pilihan konfigurasi dikunci"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Audit pendahuluan memverifikasi jumlah per kelas, ukuran 48 × 48, mode grayscale, keterbacaan file, citra low-information, dan exact duplicate berdasarkan SHA-256. Seluruh 35.887 berkas dapat dibaca. Ditemukan 1.516 grup exact duplicate yang mencakup 3.369 berkas; 557 grup melintasi split, 57 grup melintasi kelas, 12 citra seluruhnya hitam, dan 13 citra low-information. Duplikat antara data latih dan evaluasi dapat membuat memorisasi tampak sebagai generalisasi (Barz dan Denzler, 2020). Manifest beserta checksum disimpan, sedangkan berkas asli tetap utuh."
      },
      {
        "kind": "text",
        "text": "Audit exact duplicate mendokumentasikan duplikat lintas subset. Evaluasi primer tetap memakai split resmi, dengan keterbatasan overlap sebagaimana dinyatakan pada Batasan Masalah. Evaluasi sensitivitas yang mengecualikan kelompok duplikat hanya dijalankan setelah persetujuan pembimbing dan dilaporkan terpisah."
      },
      {
        "kind": "text",
        "text": "Manifest audit mencatat path relatif, label, Usage, ukuran citra, mode kanal, keterbacaan, status citra all-black atau low-information, serta SHA-256. Identitas mirror, tanggal unduhan, versi kode, dan jenis hash dilaporkan bersama distribusi data. Definisi hash dan ambang low-information harus dicocokkan dengan skrip audit sebelum angka pendahuluan digunakan dalam laporan akhir. Berkas asli tetap disimpan."
      },
      {
        "kind": "text",
        "text": "Tabel 7.3 Perkiraan Bobot Kelas dari Subset Training"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Kelas",
            "n_c Training",
            "α_c = N/(C·n_c)"
          ],
          [
            "Angry",
            "3.995",
            "1,027"
          ],
          [
            "Disgust",
            "436",
            "9,407"
          ],
          [
            "Fear",
            "4.097",
            "1,001"
          ],
          [
            "Happy",
            "7.215",
            "0,568"
          ],
          [
            "Sad",
            "4.830",
            "0,849"
          ],
          [
            "Surprise",
            "3.171",
            "1,293"
          ],
          [
            "Neutral",
            "4.965",
            "0,826"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Nilai pada Tabel 7.3 dihitung dari jumlah resmi dan digunakan sebagai perkiraan rancangan. Implementasi wajib menghitung ulang bobot dari label Training yang benar-benar dimuat dan memverifikasi hasilnya. Bobot disgust paling besar karena frekuensinya paling kecil. Vektor bobot yang sama digunakan pada WCE dan class-weighted focal loss agar perbedaan kedua loss terutama berasal dari focal factor, bukan dari skema class weighting yang berbeda."
      }
    ]
  },
  {
    "id": "7.4",
    "title": "Tahapan Preprocessing",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Preprocessing dijalankan dalam urutan tetap agar tidak terjadi perbedaan tersembunyi antarskenario:"
      },
      {
        "kind": "text",
        "text": "Membaca berkas JPEG grayscale 48 × 48 dari folder kelas. Label dipetakan dari nama folder dan Usage dipetakan dari lokasi folder serta prefix Training_, PublicTest_, atau PrivateTest_. Urutan kelas dikunci sebagai angry, disgust, fear, happy, sad, surprise, neutral."
      },
      {
        "kind": "text",
        "text": "Memilih record melalui manifest dengan mempertahankan keanggotaan Training, PublicTest, dan PrivateTest resmi. Audit exact duplicate hanya diberi penanda dan tidak mengubah split primer; berkas asli tidak dihapus atau dipindahkan."
      },
      {
        "kind": "text",
        "text": "Mengubah ukuran citra dari 48 × 48 menjadi 96 × 96 menggunakan interpolasi bilinear, kemudian mengubah tipe tensor menjadi float32. Ukuran 96 dipilih karena didukung MobileNetV2, mengurangi pembesaran berlebihan dibanding 224, dan menjaga kebutuhan komputasi penelitian tetap realistis."
      },
      {
        "kind": "text",
        "text": "Mereplikasi kanal grayscale menjadi tiga kanal identik sehingga tensor menjadi 96 × 96 × 3 dan kompatibel dengan bobot ImageNet. Pada tahap ini nilai piksel tetap berada pada skala [0,255]."
      },
      {
        "kind": "text",
        "text": "Menerapkan augmentasi daring hanya pada record Training skenario A1. Transformasi menerima tensor pada skala [0,255]. Skenario A0 melewati tahap ini, sedangkan PublicTest dan PrivateTest resmi tidak pernah diaugmentasi."
      },
      {
        "kind": "text",
        "text": "Menerapkan keras.applications.mobilenet_v2.preprocess_input tepat satu kali setelah augmentasi. Fungsi tersebut memetakan nilai piksel dari [0,255] ke [-1,1]; pembagian dengan 255 atau rescaling lain tidak dilakukan."
      },
      {
        "kind": "text",
        "text": "Membentuk mini-batch berukuran 32. Record Training diacak dengan seed dan reshuffle_each_iteration=True, sedangkan urutan PublicTest dan PrivateTest tetap pada saat evaluasi."
      },
      {
        "kind": "text",
        "text": "Urutan operasionalnya adalah decode → resize → float32 → replikasi kanal → augmentasi A1 bila aktif → preprocess_input → batch. Urutan tersebut sama pada seluruh skenario kecuali keberadaan tahap augmentasi. Sampel keluaran setiap tahap diperiksa untuk memverifikasi shape, rentang nilai, label, dan ketiadaan normalisasi ganda."
      },
      {
        "kind": "text",
        "text": "Tabel 7.4 Kebijakan Augmentasi Ringan"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Transformasi",
            "Rentang",
            "Parameter",
            "Alasan"
          ],
          [
            "RandomFlip",
            "horizontal",
            "p = 0,5",
            "Ekspresi dipertahankan setelah pencerminan kiri-kanan."
          ],
          [
            "RandomRotation",
            "±10°",
            "factor ≈ 0,028",
            "Mewakili kemiringan kepala ringan."
          ],
          [
            "RandomTranslation",
            "±10%",
            "height/width = 0,10",
            "Mewakili pergeseran crop ringan."
          ],
          [
            "RandomZoom",
            "±10%",
            "factor = 0,10",
            "Mewakili perbedaan jarak/crop."
          ],
          [
            "RandomContrast",
            "±10%",
            "factor = 0,10",
            "Mewakili variasi kontras terbatas."
          ]
        ]
      }
    ]
  },
  {
    "id": "7.5",
    "title": "Rancangan Arsitektur dan Alur Inferensi",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Model dibangun dengan MobileNetV2(weights='imagenet', include_top=False, input_shape=(96,96,3), alpha=1.0). Kepala klasifikasi terdiri atas GlobalAveragePooling2D, Dropout 0,20, dan Dense 7 dengan aktivasi softmax. Tidak digunakan Dense tersembunyi tambahan agar rancangan kepala sederhana dan identik pada semua skenario."
      },
      {
        "kind": "text",
        "text": "Satu citra 48 × 48 dibaca dan diperiksa."
      },
      {
        "kind": "text",
        "text": "Citra diperbesar menjadi 96 × 96, direplikasi ke tiga kanal, dan dinormalisasi ke [-1,1]."
      },
      {
        "kind": "text",
        "text": "Konvolusi awal dan blok bottleneck MobileNetV2 mengubah piksel menjadi feature map bertingkat. Ukuran spasial mengecil, sedangkan jumlah kanal meningkat seperti Tabel 6.3."
      },
      {
        "kind": "text",
        "text": "Global average pooling merata-ratakan nilai spasial pada masing-masing dari 1.280 feature map menjadi vektor 1.280 nilai."
      },
      {
        "kind": "text",
        "text": "Dropout dinonaktifkan pada inferensi. Dense menghasilkan tujuh logit, kemudian softmax menghasilkan tujuh probabilitas."
      },
      {
        "kind": "text",
        "text": "Indeks probabilitas terbesar dipetakan ke label FER2013. Seluruh probabilitas tetap disimpan untuk analisis confidence dan confusion matrix."
      }
    ]
  },
  {
    "id": "7.6",
    "title": "Prosedur Transfer Learning dan Fine-Tuning",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tabel 7.5 Tahap Pelatihan Model"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Tahap",
            "Status Lapisan",
            "Optimizer",
            "Durasi",
            "Tujuan"
          ],
          [
            "Tahap 1: pelatihan head",
            "Seluruh backbone dibekukan",
            "Adam; LR 1×10⁻³",
            "Maks. 10 epoch",
            "Menyesuaikan classifier baru tanpa mengubah fitur awal."
          ],
          [
            "Tahap 2: fine-tuning",
            "30 lapisan akhir dibuka; BatchNorm tetap beku",
            "Adam; LR 1×10⁻⁵",
            "Maks. 30 epoch",
            "Menyesuaikan fitur tingkat tinggi dengan perubahan kecil."
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Batch size ditetapkan 32. EarlyStopping memantau validation macro-F1 pada PublicTest resmi dengan mode max, patience 5, dan restore_best_weights=True. ReduceLROnPlateau memantau validation loss pada subset yang sama dengan factor 0,2, patience 3, dan minimum learning rate 1×10⁻⁷. Model checkpoint terbaik dipilih hanya berdasarkan PublicTest resmi. Nilai tersebut merupakan rancangan awal yang harus dijalankan identik pada seluruh skenario; perubahan karena keterbatasan perangkat harus ditetapkan sebelum eksperimen utama dan dicatat."
      },
      {
        "kind": "text",
        "text": "Pada tahap pertama, backbone.trainable disetel False sebelum model dikompilasi. Pada tahap kedua, backbone.trainable disetel True. Seluruh lapisan backbone kemudian dibekukan kembali; hanya 30 lapisan terakhir yang dibuka, sedangkan setiap BatchNormalization di antara lapisan tersebut tetap trainable=False. Model dikompilasi ulang dengan optimizer Adam baru dan learning rate 1 × 10⁻⁵. Kompilasi ulang diperlukan agar daftar bobot yang diperbarui sesuai dengan status trainable terbaru."
      },
      {
        "kind": "text",
        "text": "Untuk CE, loss dihitung dari one-hot label dan probabilitas softmax. Untuk WCE, setiap nilai CE sampel dikalikan α kelas labelnya sebelum dirata-ratakan dalam batch. Untuk class-weighted focal loss, CE sampel dikalikan α kelas dan (1-p_t)², lalu dirata-ratakan dengan aturan yang sama. Implementasi diuji menggunakan batch sintetis kecil agar tiga loss menghasilkan nilai yang sama dengan perhitungan manual pada kasus yang sudah ditentukan."
      }
    ]
  },
  {
    "id": "7.7",
    "title": "Skenario Eksperimen",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tabel 7.6 Matriks Eksperimen Faktorial 2 × 3"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Kode",
            "Augmentasi",
            "Loss",
            "Interpretasi"
          ],
          [
            "A0B0",
            "Tidak",
            "CE",
            "Kontrol dasar tanpa pembobotan kelas"
          ],
          [
            "A1B0",
            "Ringan",
            "CE",
            "Augmentasi ringan dengan CE"
          ],
          [
            "A0B1",
            "Tidak",
            "WCE",
            "WCE tanpa augmentasi"
          ],
          [
            "A1B1",
            "Ringan",
            "WCE",
            "Augmentasi ringan dengan WCE"
          ],
          [
            "A0B2",
            "Tidak",
            "Class-weighted focal",
            "Class-weighted focal tanpa augmentasi"
          ],
          [
            "A1B2",
            "Ringan",
            "Class-weighted focal",
            "Augmentasi ringan dengan class-weighted focal"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Setiap skenario dijalankan dengan seed 11, 22, 33, 44, dan 55. Pada seed yang sama, inisialisasi kepala, urutan pengacakan, dan augmentasi acak dibuat konsisten sejauh didukung framework. Setiap run membangun model baru dari bobot ImageNet yang sama sehingga tidak ada skenario yang mewarisi hasil pelatihan skenario lain. PublicTest resmi digunakan untuk validasi pada semua run dan pemilihan konfigurasi. PrivateTest resmi hanya dibuka setelah protokol dan pilihan konfigurasi dikunci berdasarkan hasil validasi."
      }
    ]
  },
  {
    "id": "7.7.1",
    "title": "Algoritma Pelaksanaan Eksperimen",
    "level": 3,
    "blocks": [
      {
        "kind": "text",
        "text": "Muat manifest FER2013 dan satu sampel JPEG; validasi relative path, kelas, label, Usage/prefix, ukuran 48 x 48, mode grayscale, dan checksum."
      },
      {
        "kind": "text",
        "text": "Bangun manifest Training, PublicTest, dan PrivateTest berdasarkan folder/prefix Usage; pertahankan pembagian resmi tanpa memindahkan file asli."
      },
      {
        "kind": "text",
        "text": "Hitung distribusi kelas dan vektor α_c hanya dari Training; simpan hasil audit."
      },
      {
        "kind": "text",
        "text": "Bangun fungsi preprocessing deterministik untuk resize, replikasi kanal, dan preprocess_input."
      },
      {
        "kind": "text",
        "text": "Bangun pipeline A0 tanpa augmentasi dan A1 dengan parameter Tabel 7.4; uji bahwa augmentasi tidak aktif pada PublicTest dan PrivateTest resmi."
      },
      {
        "kind": "text",
        "text": "Tentukan seed pengulangan dan aktifkan opsi deterministik yang didukung lingkungan eksperimen."
      },
      {
        "kind": "text",
        "text": "Pada awal setiap run untuk kombinasi A × B, set ulang seed Python, NumPy, dan TensorFlow. Bangun model baru dari bobot ImageNet yang sama dan verifikasi kesamaan inisialisasi kepala pada seed berpasangan. Jangan melanjutkan bobot dari skenario lain. Pengacakan data dan augmentasi diperiksa terpisah karena reset seed saja tidak menjamin kesamaan seluruh aliran acak."
      },
      {
        "kind": "text",
        "text": "Latih kepala klasifikasi dengan backbone beku dan simpan checkpoint terbaik berdasarkan PublicTest resmi."
      },
      {
        "kind": "text",
        "text": "Pulihkan checkpoint tahap pertama, buka lapisan non-BatchNorm yang berada dalam 30 lapisan terakhir backbone, compile ulang, dan lakukan fine-tuning sesuai Bagian 7.6."
      },
      {
        "kind": "text",
        "text": "Simpan riwayat epoch, waktu pelatihan, konfigurasi, dan checkpoint terbaik setiap run."
      },
      {
        "kind": "text",
        "text": "Hitung rata-rata macro-F1 PublicTest dari lima seed untuk setiap konfigurasi dan kunci pilihan konfigurasi. Setelah protokol dan pilihan tersebut dikunci, evaluasi checkpoint keenam skenario pada PrivateTest resmi tanpa pembaruan bobot."
      },
      {
        "kind": "text",
        "text": "Hitung macro-F1, accuracy, weighted F1, metrik per kelas, dan confusion matrix untuk setiap run."
      },
      {
        "kind": "text",
        "text": "Gabungkan 30 hasil berdasarkan skenario dan seed; jangan menghapus run hanya karena nilainya rendah."
      },
      {
        "kind": "text",
        "text": "Lakukan analisis faktorial terblok, pemeriksaan asumsi, interval keyakinan, dan perbandingan terencana."
      },
      {
        "kind": "text",
        "text": "Laporkan hasil termasuk temuan nol, penurunan kinerja, keterbatasan, dan seluruh deviasi protokol."
      }
    ]
  },
  {
    "id": "7.8",
    "title": "Alasan Faktor Lain Tidak Diubah",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Optimizer, jumlah lapisan fine-tuning, ukuran input, dropout, dan arsitektur kepala ditetapkan sebagai variabel kontrol. Menjadikan komponen tersebut faktor eksperimen akan memperbesar jumlah kombinasi dan mengaburkan atribusi perubahan kinerja. Nilainya ditetapkan dari praktik transfer learning dan pemeriksaan teknis awal, kemudian dikunci sebelum eksperimen utama tanpa menggunakan PrivateTest untuk memilih konfigurasi."
      },
      {
        "kind": "text",
        "text": "CE menyediakan acuan tanpa pembobotan kelas. WCE mengalikan CE dengan α_c sehingga perbandingan CE–WCE mengukur dampak koreksi frekuensi kelas. Class-weighted focal loss memakai α_c yang sama lalu mengalikan CE dengan modulating factor; perbandingan WCE–class-weighted focal mengukur kontribusi faktor tersebut. Urutan kontrol ini menjelaskan pemilihan tiga loss dan mencegah kesimpulan yang hanya bertumpu pada perbandingan CE dengan satu metode gabungan."
      }
    ]
  },
  {
    "id": "7.9",
    "title": "Evaluasi dan Analisis Statistik",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Pemilihan konfigurasi didasarkan pada rata-rata macro-F1 PublicTest dari lima seed menggunakan checkpoint terbaik setiap run. Keenam konfigurasi, termasuk baseline A0B0, dibandingkan berdasarkan rata-rata tersebut. Konfigurasi dengan rata-rata tertinggi dipilih dan ditetapkan sebelum evaluasi PrivateTest. Recall tiap kelas dan simpangan baku antarseed tetap dilaporkan sebagai hasil pendukung, tanpa menjadi syarat tambahan pemilihan konfigurasi. Konfigurasi dengan rata-rata identik sebelum pembulatan dilaporkan memiliki peringkat validasi yang sama. Pilihan konfigurasi tidak diubah berdasarkan hasil PrivateTest."
      },
      {
        "kind": "text",
        "text": "Setelah protokol dan pilihan konfigurasi dikunci berdasarkan PublicTest resmi, checkpoint dari seluruh enam konfigurasi pada lima seed dievaluasi pada PrivateTest resmi tanpa pembaruan bobot. Untuk setiap skenario dilaporkan rata-rata ± simpangan baku dari lima seed. Analisis primer menggunakan macro-F1 pada PrivateTest resmi. Analisis sekunder mencakup accuracy, weighted F1, precision, recall, dan F1-score setiap kelas, confusion matrix ternormalisasi, serta audit exact duplicate sebagai informasi kualitas dataset. Jika pembimbing menyetujui evaluasi sensitivitas, hasil subset audit dilaporkan terpisah dan tidak menggantikan hasil split resmi."
      },
      {
        "kind": "text",
        "text": "Efek faktorial dianalisis dengan model linear terblok: macro-F1 ~ augmentasi × loss + C(seed). Seed dianggap sebagai faktor kategorikal/blok, bukan bilangan kontinu. Bentuk konseptual model dinyatakan pada Persamaan (7.1), dengan A_i efek augmentasi, B_j efek loss, (AB)_ij efek interaksi, S_k efek blok seed, dan ε_ijk residual."
      },
      {
        "kind": "table",
        "rows": [
          [
            "Yᵢⱼₖ = μ + Aᵢ + Bⱼ + (AB)ᵢⱼ + Sₖ + εᵢⱼₖ",
            "(7.1)"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Taraf signifikansi ditetapkan 0,05. Residual diperiksa melalui Q-Q plot dan uji Shapiro-Wilk, sedangkan kesamaan ragam diperiksa dengan uji Levene. Karena ukuran sampel eksperimen hanya 30 run, hasil uji asumsi tidak dibaca secara mekanis; pola residual dan kestabilan kesimpulan juga diperiksa. Jika asumsi tidak memadai, inferensi dikonfirmasi dengan permutation ANOVA. Permutasi label kondisi dibatasi di dalam setiap blok seed sehingga struktur pasangan antarskenario dipertahankan, menggunakan sedikitnya 10.000 permutasi dan statistik F dari model dengan faktor augmentasi, loss, serta interaksinya."
      },
      {
        "kind": "text",
        "text": "Perbandingan terencana mencakup efek augmentasi A1 versus A0 pada setiap loss serta perbandingan strategi loss pada tingkat augmentasi yang sama. Pasangan yang identik tidak dihitung dua kali. Selisih dihitung pada seed berpasangan. Daftar pasangan final dan keluarga koreksi Holm akan dikunci sebelum eksperimen utama agar pengendalian family-wise error konsisten dengan rumusan masalah. Selisih rata-rata macro-F1, confidence interval 95%, dan partial eta-squared dilaporkan untuk membedakan besar pengaruh dari signifikansi statistik."
      },
      {
        "kind": "text",
        "text": "Interaction plot menempatkan augmentasi pada sumbu x, rata-rata macro-F1 pada sumbu y, dan satu garis untuk setiap loss. Garis yang sejajar mendukung interaksi kecil, sedangkan garis dengan kemiringan berbeda menunjukkan kemungkinan interaksi. Plot hanya alat interpretasi; keputusan tetap didasarkan pada model statistik dan interval keyakinan."
      },
      {
        "kind": "text",
        "text": "Selisih macro-F1 positif terhadap A0B0 disebut peningkatan numerik. Klaim perbedaan secara statistik mengikuti pengujian yang telah dikoreksi sesuai keluarga perbandingan, disertai interval keyakinan dengan metode yang dijelaskan. Interval keyakinan tanpa koreksi tidak digunakan sendirian untuk menyatakan keunggulan ketika beberapa perbandingan diuji. Jika baseline terpilih, perubahan terhadap dirinya adalah nol; hasil tersebut tetap dilaporkan tanpa mengganti pilihan berdasarkan PrivateTest. Prosedur interval keyakinan dan permutasi per efek akan dikunci sebelum eksperimen utama. Variasi lima seed menggambarkan ketidakpastian pelatihan pada dataset tetap, bukan variasi lima dataset independen."
      }
    ]
  },
  {
    "id": "7.10",
    "title": "Profiling Efisiensi Model",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Profiling dilakukan setelah arsitektur final dibangun dan tidak digunakan untuk memilih skenario loss. Jumlah parameter dihitung dengan model.count_params() dan diverifikasi pada keluaran model.summary(). Ukuran berkas dicatat setelah model disimpan dengan format yang sama. FLOPs atau multiply-adds diperoleh menggunakan profiler TensorFlow untuk input 1 × 96 × 96 × 3 dan dilaporkan dengan definisi operasi profiler yang dipakai."
      },
      {
        "kind": "text",
        "text": "Latensi inferensi diukur pada batch size 1, tanpa augmentasi, dengan 100 iterasi warm-up dan sedikitnya 1.000 iterasi pengukuran pada perangkat yang sama. Sinkronisasi perangkat dilakukan bila backend menjalankan operasi secara asinkron. Median dan persentil ke-95 dilaporkan dengan jenis GPU/CPU, versi TensorFlow, dan mode presisi. Nilai Colab tidak digeneralisasi sebagai latensi perangkat seluler karena lingkungan perangkatnya berbeda."
      }
    ]
  },
  {
    "id": "7.11",
    "title": "Perangkat dan Reproduksibilitas",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tabel 7.7 Perangkat Lunak dan Artefak Reproduksibilitas"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Komponen",
            "Ketentuan"
          ],
          [
            "Bahasa",
            "Python 3.x"
          ],
          [
            "Framework",
            "TensorFlow/Keras; versi dicatat pada saat eksperimen"
          ],
          [
            "Analisis",
            "NumPy, pandas, scikit-learn, SciPy/statsmodels"
          ],
          [
            "Lingkungan",
            "Google Colab GPU atau GPU lokal; jenis GPU, CUDA, dan waktu dicatat"
          ],
          [
            "Artefak",
            "Kode, konfigurasi, seed, log epoch, checkpoint terbaik, dan hasil metrik per run"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Setiap run diberi identifier berisi kode skenario dan seed. File konfigurasi menyimpan split, ukuran input, augmentasi, loss, optimizer, learning rate, batch size, jumlah lapisan yang dibuka, callback, dan versi perangkat lunak. Prosedur ini mencegah perubahan konfigurasi yang tidak terdokumentasi selama eksperimen."
      }
    ]
  },
  {
    "id": "7.12",
    "title": "Tempat dan Waktu Penelitian",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Penelitian bersifat komputasional dan dilaksanakan menggunakan lingkungan Google Colab GPU atau komputer lokal yang memenuhi dependensi TensorFlow. Dataset diperoleh dari repositori publik, sehingga penelitian tidak melibatkan pengambilan data di lapangan atau partisipan manusia. Pelaksanaan direncanakan selama lima bulan sejak proposal dinyatakan layak, mengikuti rincian kegiatan pada Tabel 8.1. Jenis perangkat, versi perangkat lunak, dan waktu setiap run dicatat sebagai bagian dari reproduksibilitas."
      }
    ]
  },
  {
    "id": "7.13",
    "title": "Ancaman Validitas",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Tabel 7.8 Ancaman Validitas dan Mitigasi"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Aspek",
            "Risiko",
            "Mitigasi"
          ],
          [
            "Validitas internal",
            "Perbedaan dapat berasal dari seed atau checkpoint, bukan faktor eksperimen.",
            "Seed berpasangan, kontrol konfigurasi, dan checkpoint rule yang sama."
          ],
          [
            "Validitas konstruk",
            "Accuracy dapat menutupi kelas minoritas.",
            "Macro-F1 sebagai metrik utama dan laporan per kelas."
          ],
          [
            "Validitas eksternal",
            "FER2013 beresolusi rendah dan labelnya ambigu.",
            "Kesimpulan dibatasi pada FER2013; tidak mengklaim generalisasi dunia nyata."
          ],
          [
            "Validitas kesimpulan",
            "Satu run dapat menghasilkan selisih acak.",
            "Lima seed, rata-rata ± simpangan baku, interval keyakinan, dan analisis terblok."
          ],
          [
            "Kebocoran data",
            "Data uji dipakai memilih model atau exact duplicate melintasi subset.",
            "Pemilihan konfigurasi hanya melalui PublicTest. Audit duplikat mendokumentasikan overlap, tetapi tidak menghilangkannya; hasil primer dibatasi pada benchmark resmi."
          ]
        ]
      }
    ]
  },
  {
    "id": "7.14",
    "title": "Kriteria Keberhasilan dan Pelaporan",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Keterlaksanaan penelitian dinilai dari penyelesaian 30 run dengan konfigurasi terdokumentasi, pemisahan pemilihan model dari data uji, serta estimasi pengaruh faktor beserta ketidakpastiannya. Hasil nol atau negatif tetap dilaporkan sesuai tujuan analisis."
      },
      {
        "kind": "text",
        "text": "Ringkasan hasil memuat konfigurasi, seed, epoch checkpoint, nilai macro-F1 tiap run, rata-rata, simpangan baku, interval keyakinan, dan durasi pelatihan. Prediksi per citra disimpan bersama identifier dan label aktual agar metrik dapat dihitung ulang. Artefak setiap run mengikuti Lampiran 5; pemeriksaan implementasi mengikuti Lampiran 4."
      },
      {
        "kind": "text",
        "text": "Pembahasan menghubungkan hasil dengan metrik per kelas, grafik interaksi, dan ancaman validitas pada Tabel 7.8. Perbandingan dengan literatur mempertimbangkan perbedaan split, preprocessing, arsitektur, dan pelatihan. Penjelasan atas hasil yang tidak diuji secara langsung dinyatakan sebagai dugaan, dengan kesimpulan terbatas pada protokol penelitian."
      }
    ]
  },
  {
    "id": "7.15",
    "title": "Risiko Teknis dan Mitigasi",
    "level": 2,
    "blocks": [
      {
        "kind": "text",
        "text": "Gangguan teknis dicatat terpisah dari hasil kinerja. Run dengan NaN atau kesalahan pembacaan data dihentikan untuk pemeriksaan input, label, bobot kelas, dan konfigurasi pelatihan. Perubahan yang memengaruhi protokol didokumentasikan sebelum eksperimen utama dan diterapkan pada seluruh skenario."
      },
      {
        "kind": "text",
        "text": "Jika terjadi out-of-memory, penggunaan memori pipeline diperiksa sebelum mengubah batch size. Perubahan batch size atau penggunaan gradient accumulation memerlukan pembaruan protokol. Jika komposisi data berubah karena berkas rusak, manifest dan audit dibuat ulang; berkas tidak diganti diam-diam dari sumber lain."
      },
      {
        "kind": "text",
        "text": "Run yang terputus di Google Colab dan belum menghasilkan checkpoint valid diulang dengan seed serta konfigurasi yang sama. Lingkungan perangkat lunak dikunci; perubahan versi memerlukan unit test dan pilot pembanding. Artefak dicadangkan setelah setiap run dengan identifier unik agar hasil tidak tertimpa."
      }
    ]
  },
  {
    "id": "8",
    "title": "JADWAL PELAKSANAAN PENELITIAN",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Jadwal dihitung selama lima bulan setelah proposal disetujui. Eksperimen utama dimulai setelah protokol dan konfigurasi dikunci agar perubahan metode tidak dilakukan setelah melihat hasil data uji."
      },
      {
        "kind": "text",
        "text": "Tabel 8.1 Jadwal Pelaksanaan Penelitian"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Kegiatan",
            "Bulan 1",
            "Bulan 2",
            "Bulan 3",
            "Bulan 4",
            "Bulan 5"
          ],
          [
            "Finalisasi revisi dan persetujuan protokol",
            "X",
            "",
            "",
            "",
            ""
          ],
          [
            "Pemutakhiran literatur dan audit dataset",
            "X",
            "X",
            "",
            "",
            ""
          ],
          [
            "Implementasi pipeline dan uji unit preprocessing",
            "",
            "X",
            "",
            "",
            ""
          ],
          [
            "Pilot run dan penguncian konfigurasi",
            "",
            "X",
            "",
            "",
            ""
          ],
          [
            "Eksperimen utama 30 run",
            "",
            "",
            "X",
            "X",
            ""
          ],
          [
            "Evaluasi, analisis statistik, dan pembahasan",
            "",
            "",
            "",
            "X",
            "X"
          ],
          [
            "Penyusunan dan revisi laporan Tugas Akhir",
            "X",
            "X",
            "X",
            "X",
            "X"
          ],
          [
            "Finalisasi laporan dan persiapan sidang",
            "",
            "",
            "",
            "",
            "X"
          ]
        ]
      }
    ]
  },
  {
    "id": "pustaka",
    "title": "DAFTAR PUSTAKA",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Barsoum, E., Zhang, C., Canton Ferrer, C., & Zhang, Z. (2016). Training deep networks for facial expression recognition with crowd-sourced label distribution. Proceedings of the 18th ACM International Conference on Multimodal Interaction, 279–283. https://doi.org/10.1145/2993148.2993165"
      },
      {
        "kind": "text",
        "text": "Barz, B., & Denzler, J. (2020). Do we train on test data? Purging CIFAR of near-duplicates. Journal of Imaging, 6(6), 41. https://doi.org/10.3390/jimaging6060041"
      },
      {
        "kind": "text",
        "text": "Buda, M., Maki, A., & Mazurowski, M. A. (2018). A systematic study of the class imbalance problem in convolutional neural networks. Neural Networks, 106, 249–259. https://doi.org/10.1016/j.neunet.2018.07.011"
      },
      {
        "kind": "text",
        "text": "Gonzalez, R. C., & Woods, R. E. (2018). Digital image processing (4th ed.). Pearson."
      },
      {
        "kind": "text",
        "text": "Goodfellow, I. J., Erhan, D., Carrier, P. L., Courville, A., Mirza, M., Hamner, B., Cukierski, W., Tang, Y., Thaler, D., Lee, D.-H., Zhou, Y., Ramaiah, C., Feng, F., Li, R., Wang, X., Athanasakis, D., Shawe-Taylor, J., Milakov, M., Park, J., Ionescu, R., Popescu, M., Grozea, C., Bergstra, J., Xie, J., Romaszko, L., Xu, B., Chuang, Z., & Bengio, Y. (2013). Challenges in representation learning: A report on three machine learning contests. In Neural Information Processing (pp. 117–124). Springer. https://doi.org/10.1007/978-3-642-42051-1_16"
      },
      {
        "kind": "text",
        "text": "He, L., Jia, N., & Zhao, J. (2026). An edge-computing-based emotion-aware adaptive lighting system for intelligent cockpits. Sensors, 26(11), 3489. https://doi.org/10.3390/s26113489"
      },
      {
        "kind": "text",
        "text": "Khaireddin, Y., & Chen, Z. (2021). Facial emotion recognition: State of the art performance on FER2013. arXiv:2105.03588. https://doi.org/10.48550/arXiv.2105.03588"
      },
      {
        "kind": "text",
        "text": "Kingma, D. P., & Ba, J. (2015). Adam: A method for stochastic optimization. International Conference on Learning Representations. https://doi.org/10.48550/arXiv.1412.6980"
      },
      {
        "kind": "text",
        "text": "Lin, T.-Y., Goyal, P., Girshick, R., He, K., & Dollár, P. (2017). Focal loss for dense object detection. Proceedings of the IEEE International Conference on Computer Vision, 2980–2988. https://doi.org/10.1109/ICCV.2017.324"
      },
      {
        "kind": "text",
        "text": "Mandave, D. D., & Patil, L. V. (2025). A statistically rigorous comparison of MobileNetV2 and EfficientNet-B0 for facial expression recognition on the FER2013 benchmark. Information Dynamics and Applications, 4(4), 189–200. https://doi.org/10.56578/ida040401"
      },
      {
        "kind": "text",
        "text": "Marbun, R., Novelan, M. S., & Sarif, M. I. (2025). Effect of data augmentation levels on MobileNetV2 performance for facial expression recognition using FER-2013 dataset. Proceedings of the 2nd International Conference on Islamic Community Studies, 6907–6918."
      },
      {
        "kind": "text",
        "text": "Nalle, D. R., Astuti, L. G., Astawa, I. G. S., Putri, L. A. A. R., Karyawati, A. A. I. N. E., & Supriana, I. W. (2022). Implementasi metode convolutional neural network untuk pengenalan pola motif kain tenun Rote Ndao berbasis Android. JELIKU (Jurnal Elektronik Ilmu Komputer Udayana), 11(1), 157–166. https://doi.org/10.24843/JLK.2022.v11.i01.p17"
      },
      {
        "kind": "text",
        "text": "Radytia, S., & Darusalam, U. (2026). Facial expression recognition for monitoring learning satisfaction in smart learning environments using MobileNetV2. Sinkron, 10(1), 396–405. https://doi.org/10.33395/sinkron.v10i1.15565"
      },
      {
        "kind": "text",
        "text": "Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., & Chen, L.-C. (2018). MobileNetV2: Inverted residuals and linear bottlenecks. Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 4510–4520. https://doi.org/10.1109/CVPR.2018.00474"
      },
      {
        "kind": "text",
        "text": "Shorten, C., & Khoshgoftaar, T. M. (2019). A survey on image data augmentation for deep learning. Journal of Big Data, 6, 60. https://doi.org/10.1186/s40537-019-0197-0"
      },
      {
        "kind": "text",
        "text": "Vidiadivani, W., & Suhartana, I. K. G. (2024). Klasifikasi jenis sampah menggunakan metode transfer learning pada convolutional neural network (CNN). JELIKU (Jurnal Elektronik Ilmu Komputer Udayana), 12(3), 589–596. https://doi.org/10.24843/JLK.2023.v12.i03.p11"
      },
      {
        "kind": "text",
        "text": "Yuniari, N. P. W., Kumara, I. M. S., Raharja, I. K. A. W., Bhaskara, I. M. A., Darma, I. G. W., & Dana, G. W. P. (2024). Analisis klasifikasi citra karakteristik topeng Bali menggunakan model InceptionV3 dan MobileNetV2. JELIKU (Jurnal Elektronik Ilmu Komputer Udayana), 13(2), 327–338. https://doi.org/10.24843/JLK.2024.v13.i02.p10"
      },
      {
        "kind": "text",
        "text": "Zhu, Q., Zhuang, H., Zhao, M., Xu, S., & Meng, R. (2024). A study on expression recognition based on improved MobileNetV2 network. Scientific Reports, 14, 8121. https://doi.org/10.1038/s41598-024-58736-x"
      }
    ]
  },
  {
    "id": "lampiran",
    "title": "LAMPIRAN",
    "level": 1,
    "blocks": [
      {
        "kind": "text",
        "text": "Lampiran 1. Sumber Dataset FER2013"
      },
      {
        "kind": "text",
        "text": "Sumber publik: Kaggle FER2013"
      },
      {
        "kind": "text",
        "text": "Mirror yang dipakai berupa 35.887 berkas JPEG terorganisasi dalam folder train/test per kelas. Prefix nama berkas mempertahankan Usage Training, PublicTest, dan PrivateTest. Sebelum eksperimen, sumber unduhan, tanggal akses, manifest path/label/split, dan checksum SHA-256 dicatat. Audit awal menghasilkan manifest SHA-256 ffc65c47f2c31fba23c395cde23b5b369f6631d4535e8da91d9aeec26ab18e94. Kesesuaian mirror dengan distribusi resmi diverifikasi, tetapi asal data dari CSV kompetisi asli tetap didokumentasikan sebagai keterbatasan."
      },
      {
        "kind": "text",
        "text": "Lampiran 2. Konfigurasi yang Dikunci Sebelum Eksperimen"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Komponen",
            "Nilai"
          ],
          [
            "Dataset",
            "FER2013, split Usage resmi"
          ],
          [
            "Input",
            "96 × 96 × 3; bilinear resize; grayscale direplikasi"
          ],
          [
            "Normalisasi",
            "keras.applications.mobilenet_v2.preprocess_input; rentang [-1,1]"
          ],
          [
            "Backbone",
            "MobileNetV2 alpha 1,0; ImageNet; include_top=False"
          ],
          [
            "Head",
            "GlobalAveragePooling2D → Dropout 0,20 → Dense 7 softmax"
          ],
          [
            "Loss",
            "CE; WCE inverse-frequency; class-weighted focal inverse-frequency, γ=2"
          ],
          [
            "Augmentasi",
            "A0 tanpa; A1 kebijakan ringan pada Tabel 7.4"
          ],
          [
            "Pelatihan",
            "Adam; batch 32; dua tahap; maksimum 10 + 30 epoch"
          ],
          [
            "Pengulangan",
            "Seed 11, 22, 33, 44, 55"
          ],
          [
            "Metrik utama",
            "Macro-F1 PrivateTest resmi sesuai split bawaan FER2013"
          ]
        ]
      },
      {
        "kind": "text",
        "text": "Lampiran 3. Checklist Pencegahan Kebocoran Data"
      },
      {
        "kind": "text",
        "text": "PrivateTest resmi tidak digunakan untuk memilih epoch, hyperparameter, transformasi, atau konfigurasi model. Pilihan konfigurasi dikunci berdasarkan rata-rata macro-F1 PublicTest dari lima seed sebelum evaluasi PrivateTest."
      },
      {
        "kind": "text",
        "text": "Bobot kelas dihitung hanya dari subset Training."
      },
      {
        "kind": "text",
        "text": "Augmentasi hanya aktif pada subset Training."
      },
      {
        "kind": "text",
        "text": "Keputusan pembersihan data ditetapkan sebelum eksperimen dan diterapkan identik pada semua skenario."
      },
      {
        "kind": "text",
        "text": "Seluruh hasil run, termasuk yang gagal atau lebih rendah, tetap dicatat."
      },
      {
        "kind": "text",
        "text": "Lampiran 4. Checklist Verifikasi Implementasi"
      },
      {
        "kind": "text",
        "text": "Shape satu citra setelah parsing adalah 48 × 48 × 1 dan setelah preprocessing adalah 96 × 96 × 3."
      },
      {
        "kind": "text",
        "text": "Rentang keluaran preprocess_input diperiksa berada pada [-1,1] tanpa normalisasi ganda."
      },
      {
        "kind": "text",
        "text": "Transformasi A1 berubah antar-pemanggilan saat training, tetapi A0 serta seluruh manifest PublicTest/PrivateTest resmi tetap deterministik."
      },
      {
        "kind": "text",
        "text": "CE, WCE, dan class-weighted focal loss lolos uji numerik menggunakan label serta probabilitas sintetis."
      },
      {
        "kind": "text",
        "text": "Pada tahap head, parameter backbone tidak berubah; pada fine-tuning hanya lapisan akhir non-BatchNorm yang berubah."
      },
      {
        "kind": "text",
        "text": "Setiap skenario memulai model baru dari bobot ImageNet yang sama, bukan checkpoint skenario sebelumnya."
      },
      {
        "kind": "text",
        "text": "Checkpoint terbaik dipilih menggunakan PublicTest resmi. Konfigurasi dipilih berdasarkan rata-rata macro-F1 PublicTest dari lima seed. PrivateTest resmi baru dipanggil setelah protokol dan pilihan konfigurasi dikunci."
      },
      {
        "kind": "text",
        "text": "Jumlah run akhir adalah 6 skenario × 5 seed = 30, termasuk run dengan kinerja rendah."
      },
      {
        "kind": "text",
        "text": "Lampiran 5. Artefak yang Disimpan untuk Setiap Run"
      },
      {
        "kind": "table",
        "rows": [
          [
            "Artefak",
            "Isi Minimum"
          ],
          [
            "config.json",
            "Skenario, seed, split, augmentasi, loss, dan seluruh hyperparameter."
          ],
          [
            "environment.txt",
            "Versi Python, TensorFlow, library, GPU/CPU, CUDA, dan opsi deterministik."
          ],
          [
            "history.csv",
            "Loss dan metrik training/validation pada setiap epoch."
          ],
          [
            "checkpoint.keras",
            "Bobot checkpoint terbaik yang dipilih berdasarkan PublicTest resmi."
          ],
          [
            "test_metrics.json",
            "Metrik PrivateTest resmi dan, bila disetujui, analisis sensitivitas exact duplicate."
          ],
          [
            "confusion_matrix.png",
            "Confusion matrix absolut dan ternormalisasi."
          ],
          [
            "run_log.txt",
            "Waktu mulai/selesai, durasi, status, peringatan, dan deviasi protokol."
          ]
        ]
      }
    ]
  }
];
window.ferSample = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/wAALCAAwADABAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/AP0H/wCC43/BTH/hjf4H2nw2+FvicWnjPxtbN5OoW3zy6bp5OwzRAdZpWJji9CHb+HNfzr/GDxL4t+IOrr8KtHv7i8v9Vn2aixnM7KWPz75P43Ucu3TdhR0r6q+DXwh8P/Cv4eab4etNPjV7eBQ7BQCzY5ror2x0XUFAutPidhwrNGCR+OK5Px18GfAesaTPrM+iQJcxQkiREwSfwr5Bur+Tw94o1Pw4H2T2s+7ex+WWJjzn/wCvkcV9Jft2/Hbxx+09+1vr/wARPFdrfzxaZc/2P4N0I5wTBASpYnJQBFeZmPI3Dr0rzn4NWcPw78B3nxM1zW4NJ8V314+3NotxZw2iHAiLcMPm5ZxjntxXtPwi+PF78T7GWz13TLaO4tkG250+48y3nXP3l7r9D61sa/8AEXwH4Ymjh8U+KbKwaT7i3VwEJ9RzU6+JNC8SaFLd+G9Zt7+Hb+8eCUNj8jXxF8fpoPDvx2S7hOIrqPy5ecg78r/PFe8/tmaZ4ttf+Cm0X7O3gvU4VbTfFF5o1zcohaN5bp5BfXOOCT5bHBOMCNR0GK7D4s+EvDvhzTLP4fx2ojtdJto7f7YIll+0Mg+aVjwwLNliD0Jxk4rlfAfgvxH8Jo9W8X6FpVm1rdQr5cFyrq1wigkyDYcRE5AHynOMnrWH4y0bxf403+KI7iJS1u0ktjqGjqxjwPlT5mOQTgZ44INN8Aa3eaTZLZa/8Pm0C7kiXbf6RH5Q+Y/LkD5WBz0wfcd6+ef2qpru2+IsMV9dK7tBglcA5DHnHbrmvqj9mjT9X+JH7ZF18XviRrE1/rltpN7qlxe3RzLdXMirCZWPd/3jMT6811Hidrjxx46nnsJrN4rC5Es9vcyA7sNkBkzkqT1ps3xH1m+uXsL3SnvlmxFey2SgCIAAbo1bqo4OKoeDr/UZ7q80u0m2RNM48m5iDq0TH5QR2OOuCBmtPxd8ONJvvC/9neIlt2sIwXe2iiYCQAZAbLHAzg8c8da+J/2i7fw1Z+JbbTPDGgQWwZzI6W0PLf7Tt1Jx3Y19v/DHwm3hv9oHwtdPKqy6rpWoWDbRje/2cugPuWjx+VcL8ZvhZL4D8RaT8cbfT7fULy1ubq1v7C8ZoluIZgpA8xc7Cp5UnjIweCaxIPir4K0Szm13TJvFmiXCsT/Z2pacl5bHJ4UOhyRgMcg+nSuj+DHji7+JF2+vv4Xu9LYyEKt1Fs82PjEgB5Ck5wDg9a7L4waymmeB7kyzgbo9oOcZ9a/PH49/FYyeILnS9N00RXBYkXwlPMRGANuOo5IOeM9K/S/xRHZ638ULOfRZhb32izQTaGzcLc3SN5jxA/3/AC14XuAR3FRftPxRSeJUht/Mt7S9iW5tzEQUKOAcYPBwcgg9xXnOmeE9BtovMuFs5QBuH7raQfcA4q94c1nT7W6luoJFUE8vu4wPT1ryb9or4/6JfTnwva3bzRQHy38nlTIeAhPQE+/vXx98UtC1K48U/wBoX7xedfqJfJibPkrkqEI6gjb3H04r/9k=";
