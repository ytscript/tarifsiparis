import type { Recipe } from '../types/recipe';

export const sampleRecipes: Recipe[] = [
  // Existing recipes remain unchanged
  {
    id: '1',
    title: 'Kırmızı Mercimek Çorbası',
    author: {
      name: 'Şef Mehmet Yılmaz',
      background: '15 yıllık restoran deneyimi'
    },
    difficulty: 1,
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    costLevel: 1,
    category: ['Çorba', 'Vejetaryen', 'Türk Mutfağı'],
    ingredients: [
      { name: 'Kırmızı Mercimek', amount: 2, unit: 'su bardağı' },
      { name: 'Soğan', amount: 1, unit: 'adet' },
      { name: 'Havuç', amount: 1, unit: 'adet' },
      { name: 'Patates', amount: 1, unit: 'adet' },
      { name: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' },
      { name: 'Tuz', amount: 1, unit: 'tatlı kaşığı' }
    ],
    equipment: [
      'Tencere',
      'Blender',
      'Kesme Tahtası',
      'Bıçak'
    ],
    instructions: [
      'Mercimekleri yıkayın ve süzün.',
      'Sebzeleri küp küp doğrayın.',
      'Zeytinyağında soğanları kavurun.',
      'Diğer sebzeleri ekleyip 5 dakika kavurun.',
      'Mercimek ve suyu ekleyip kaynamaya bırakın.',
      'Mercimekler yumuşayınca blenderdan geçirin.'
    ],
    tips: [
      'Kıvamı için su miktarını ayarlayabilirsiniz.',
      'Servis yaparken üzerine kırmızı pul biber ekleyebilirsiniz.',
      'Limon ile servis edilmesi tavsiye edilir.'
    ],
    nutritionFacts: {
      calories: 180,
      protein: 10,
      carbs: 30,
      fat: 4
    },
    storage: {
      method: 'Buzdolabında kapalı kapta saklayın.',
      duration: '3 gün'
    },
    variations: [
      'Ezogelin çorbası için bulgur ve pirinç ekleyebilirsiniz.',
      'Baharatları damak zevkinize göre ayarlayabilirsiniz.',
      'Sebze miktarlarını artırabilirsiniz.'
    ],
    pairings: [
      'Taze Ekmek',
      'Limon',
      'Kırmızı Pul Biber'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    rating: 4.8,
    reviews: 245
  },
  {
    id: '2',
    title: 'Ev Yapımı Pizza',
    author: {
      name: 'Şef Ayşe Kaya',
      background: 'İtalyan mutfağı uzmanı'
    },
    difficulty: 2,
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    costLevel: 2,
    category: ['İtalyan', 'Ana Yemek'],
    ingredients: [
      { name: 'Un', amount: 3, unit: 'su bardağı' },
      { name: 'Maya', amount: 1, unit: 'paket' },
      { name: 'Zeytinyağı', amount: 2, unit: 'yemek kaşığı' },
      { name: 'Domates', amount: 3, unit: 'adet' },
      { name: 'Mozzarella', amount: 200, unit: 'g' },
      { name: 'Fesleğen', amount: 1, unit: 'demet' }
    ],
    equipment: [
      'Fırın',
      'Hamur Yoğurma Kabı',
      'Pizza Taşı veya Tepsisi',
      'Merdane'
    ],
    instructions: [
      'Mayayı ılık su ile aktifleştirin.',
      'Un ve tuzu karıştırın.',
      'Mayalı su ve zeytinyağını ekleyip hamur yoğurun.',
      '1 saat mayalanmaya bırakın.',
      'İnce açıp malzemeleri dizin.',
      '200 derecede 15-20 dakika pişirin.'
    ],
    tips: [
      'Hamuru ince açın.',
      'Fırını önceden ısıtın.',
      'Malzemeleri fazla koymayın.'
    ],
    nutritionFacts: {
      calories: 285,
      protein: 12,
      carbs: 45,
      fat: 8
    },
    storage: {
      method: 'Taze tüketilmesi önerilir.',
      duration: '1 gün'
    },
    variations: [
      'Farklı peynirler kullanabilirsiniz.',
      'Sebzeleri değiştirebilirsiniz.',
      'Sucuk veya salam ekleyebilirsiniz.'
    ],
    pairings: [
      'Roka Salatası',
      'Soğuk İçecek',
      'Zeytinyağı-Pul Biber'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    rating: 4.6,
    reviews: 189
  },
  {
    id: '3',
    title: 'Fırında Sebzeli Tavuk',
    author: {
      name: 'Şef Ali Demir',
      background: 'Sağlıklı beslenme uzmanı'
    },
    difficulty: 1,
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    costLevel: 2,
    category: ['Ana Yemek', 'Sağlıklı', 'Fırın'],
    ingredients: [
      { name: 'Tavuk Göğsü', amount: 600, unit: 'g' },
      { name: 'Patates', amount: 4, unit: 'adet' },
      { name: 'Havuç', amount: 2, unit: 'adet' },
      { name: 'Brokoli', amount: 1, unit: 'adet' },
      { name: 'Zeytinyağı', amount: 4, unit: 'yemek kaşığı' },
      { name: 'Sarımsak', amount: 4, unit: 'diş' }
    ],
    equipment: [
      'Fırın Tepsisi',
      'Kesme Tahtası',
      'Bıçak',
      'Yağlı Kağıt'
    ],
    instructions: [
      'Fırını 180 dereceye ısıtın.',
      'Tavukları fileto halinde kesin.',
      'Sebzeleri iri parçalar halinde doğrayın.',
      'Zeytinyağı ve baharatlarla marine edin.',
      'Tepsiye dizin.',
      '45 dakika pişirin.'
    ],
    tips: [
      'Tavukları eşit boyutta kesin.',
      'Sebzeleri çok küçük doğramayın.',
      'Pişirme kağıdı kullanın.'
    ],
    nutritionFacts: {
      calories: 320,
      protein: 28,
      carbs: 22,
      fat: 14
    },
    storage: {
      method: 'Buzdolabında saklayın.',
      duration: '2-3 gün'
    },
    variations: [
      'Hindi eti kullanabilirsiniz.',
      'Sebzeleri değiştirebilirsiniz.',
      'Baharatları çeşitlendirebilirsiniz.'
    ],
    pairings: [
      'Pilav',
      'Bulgur',
      'Yeşil Salata'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
    rating: 4.7,
    reviews: 167
  },
  // New recipes start here
  {
    id: '4',
    title: 'Çikolatalı Brownie',
    author: {
      name: 'Şef Zeynep Aydın',
      background: 'Pastacılık uzmanı'
    },
    difficulty: 2,
    prepTime: 20,
    cookTime: 25,
    servings: 9,
    costLevel: 2,
    category: ['Tatlı', 'Fırın', 'Çikolatalı'],
    ingredients: [
      { name: 'Bitter Çikolata', amount: 200, unit: 'g' },
      { name: 'Tereyağı', amount: 150, unit: 'g' },
      { name: 'Yumurta', amount: 3, unit: 'adet' },
      { name: 'Toz Şeker', amount: 200, unit: 'g' },
      { name: 'Un', amount: 100, unit: 'g' },
      { name: 'Kakao', amount: 30, unit: 'g' }
    ],
    equipment: [
      'Fırın',
      'Kare Kek Kalıbı',
      'Karıştırma Kabı',
      'Spatula'
    ],
    instructions: [
      'Çikolata ve tereyağını benmari usulü eritin.',
      'Yumurta ve şekeri çırpın.',
      'Erimiş çikolata karışımını ekleyin.',
      'Un ve kakaoyu eleyerek ekleyin.',
      'Kalıba dökün.',
      '175 derecede 25 dakika pişirin.'
    ],
    tips: [
      'Çikolatayı fazla ısıtmayın.',
      'Fırından çıkınca hemen kesmeyin.',
      'Kalıbı yağlayın ve unlayin.'
    ],
    nutritionFacts: {
      calories: 300,
      protein: 4,
      carbs: 35,
      fat: 18
    },
    storage: {
      method: 'Oda sıcaklığında hava almayan kapta saklayın.',
      duration: '5 gün'
    },
    variations: [
      'Ceviz veya fındık ekleyebilirsiniz.',
      'Beyaz çikolata ile süsleyebilirsiniz.',
      'Dondurma ile servis edebilirsiniz.'
    ],
    pairings: [
      'Vanilya Dondurma',
      'Sıcak Kahve',
      'Çilek'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    rating: 4.9,
    reviews: 312
  },
  {
    id: '5',
    title: 'Karnıyarık',
    author: {
      name: 'Şef Ahmet Yılmaz',
      background: 'Geleneksel Türk mutfağı uzmanı'
    },
    difficulty: 2,
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    costLevel: 2,
    category: ['Ana Yemek', 'Türk Mutfağı', 'Sebzeli'],
    ingredients: [
      { name: 'Patlıcan', amount: 6, unit: 'adet' },
      { name: 'Kıyma', amount: 400, unit: 'g' },
      { name: 'Soğan', amount: 2, unit: 'adet' },
      { name: 'Domates', amount: 3, unit: 'adet' },
      { name: 'Biber', amount: 2, unit: 'adet' },
      { name: 'Zeytinyağı', amount: 1, unit: 'su bardağı' }
    ],
    equipment: [
      'Fırın Tepsisi',
      'Tava',
      'Kesme Tahtası',
      'Bıçak'
    ],
    instructions: [
      'Patlıcanları alacalı soyup tuzlu suda bekletin.',
      'Kıymayı soğan ve biberle kavurun.',
      'Domates ve baharatları ekleyin.',
      'Patlıcanları kızartıp yarın.',
      'İç harcı doldurun.',
      'Fırında 30 dakika pişirin.'
    ],
    tips: [
      'Patlıcanları çok yağda kızartmayın.',
      'Kıymalı harcı sulu yapın.',
      'Servis öncesi maydanoz serpebilirsiniz.'
    ],
    nutritionFacts: {
      calories: 380,
      protein: 18,
      carbs: 25,
      fat: 26
    },
    storage: {
      method: 'Buzdolabında saklayın.',
      duration: '2 gün'
    },
    variations: [
      'Tavuk kıyma kullanabilirsiniz.',
      'Fırında kızartabilirsiniz.',
      'Beşamel soslu yapabilirsiniz.'
    ],
    pairings: [
      'Pilav',
      'Cacık',
      'Ayran'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    rating: 4.7,
    reviews: 203
  },
  {
    id: '6',
    title: 'Humus',
    author: {
      name: 'Şef Leyla Kaya',
      background: 'Ortadoğu mutfağı uzmanı'
    },
    difficulty: 1,
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    costLevel: 1,
    category: ['Meze', 'Vegan', 'Sağlıklı'],
    ingredients: [
      { name: 'Nohut', amount: 400, unit: 'g' },
      { name: 'Tahin', amount: 4, unit: 'yemek kaşığı' },
      { name: 'Limon Suyu', amount: 2, unit: 'adet' },
      { name: 'Zeytinyağı', amount: 4, unit: 'yemek kaşığı' },
      { name: 'Sarımsak', amount: 2, unit: 'diş' },
      { name: 'Kimyon', amount: 1, unit: 'tatlı kaşığı' }
    ],
    equipment: [
      'Blender',
      'Servis Kasesi',
      'Ölçü Kaşıkları'
    ],
    instructions: [
      'Nohutları haşlayın ve kabuklarını ayıklayın.',
      'Tüm malzemeleri blendere ekleyin.',
      'Pürüzsüz olana kadar karıştırın.',
      'Kıvamı için su ekleyin.',
      'Servis kasesine alın.',
      'Üzerine zeytinyağı gezdirin.'
    ],
    tips: [
      'Nohutları bir gece önceden ıslatın.',
      'Tahin kaliteli olmalı.',
      'Servis öncesi oda sıcaklığında bekletin.'
    ],
    nutritionFacts: {
      calories: 220,
      protein: 8,
      carbs: 25,
      fat: 12
    },
    storage: {
      method: 'Buzdolabında hava almayan kapta saklayın.',
      duration: '4-5 gün'
    },
    variations: [
      'Pancar ekleyerek pembe humus yapabilirsiniz.',
      'Fesleğen ile aromalandırabilirsiniz.',
      'Baharatlı versiyonunu deneyebilirsiniz.'
    ],
    pairings: [
      'Pide',
      'Havuç Çubukları',
      'Salatalık'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800',
    rating: 4.6,
    reviews: 178
  }
];