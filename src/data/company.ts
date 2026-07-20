// ─────────────────────────────────────────────────────────────
// ŞİRKET BİLGİLERİ — tüm iletişim/kurumsal bilgiler tek yerde.
// Gerçek telefon, e-posta ve adresleri buraya girin;
// site genelinde otomatik güncellenir.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: "Almila Grup",
  slogan: "Sürdürülebilir Kalite, Mükemmel Hizmet",
  foundedYear: 2006,
  foundedCity: "Çorum",
  hqCity: "Ankara",

  // TODO: Telefon numarası doğrulanacak (siteden çekilemedi)
  phone: "+90 (312) 000 00 00",
  phoneHref: "tel:+903120000000",
  email: "info@almilagrup.com.tr",

  branches: [
    {
      city: "Ankara",
      label: "Merkez",
      address:
        "Mustafa Kemal Mah. 2125. Sok. Kolbay İş Merkezi No: 6A/4 Çankaya / Ankara",
    },
    {
      city: "Antalya",
      label: "Şube",
      address: "Antalya / Türkiye",
    },
    {
      city: "Çorum",
      label: "Şube",
      address: "Çorum / Türkiye",
    },
  ],

  stats: [
    { value: 20, suffix: "+", label: "Yıllık Tecrübe" },
    { value: 100, suffix: "+", label: "Mutlu Müşteri" },
    { value: 10, suffix: "+", label: "Uzman Ekip" },
    { value: 3, suffix: "", label: "Şehirde Hizmet" },
  ],

  aboutShort:
    "Almila Grup, 2006 yılında Çorum'da kurulmuş, bugün merkezi Ankara'da bulunan " +
    "kurumsal bir araç kiralama ve taşımacılık şirketidir. Ankara, Antalya ve Çorum'daki " +
    "yapılanmasıyla; uzun dönem araç kiralamadan VIP taşımacılığa, personel servislerinden " +
    "turizm taşımacılığına uzanan geniş bir hizmet yelpazesi sunar. Sürdürülebilir kalite " +
    "anlayışı ve güçlü filosuyla, iş ortaklarının ulaşım süreçlerini güvenle üstlenir.",

  aboutLong: [
    "Almila Grup, 2006 yılında Çorum'da faaliyetlerine başlamış; büyüyen iş hacmi ve " +
      "genişleyen müşteri ağıyla birlikte merkezini Ankara'ya taşımıştır. Bugün Ankara " +
      "merkez olmak üzere Antalya ve Çorum'daki yapılanmasıyla Türkiye'nin dört bir " +
      "yanındaki kurumsal müşterilerine hizmet vermektedir.",
    "Faaliyet alanımızın merkezinde kurumsal araç kiralama ve taşımacılık yer alır. " +
      "Uzun dönem araç kiralama, projeye özel filo çözümleri, VIP araç tahsisi, kongre ve " +
      "seminer ulaşımı, personel ve öğrenci servis taşımacılığı, havayolu ekip transferi " +
      "ve turizm taşımacılığı alanlarında uçtan uca hizmet üretiyoruz.",
    "\"Sürdürülebilir Kalite, Mükemmel Hizmet\" ilkesiyle; her sözleşmede şeffaflığı, " +
      "her operasyonda güvenliği ve her araçta konforu standart kabul ediyoruz. Deneyimli " +
      "kadromuz ve düzenli bakımı yapılan güncel filomuzla, iş ortaklarımızın ulaşım " +
      "yükünü devralıyor; onların kendi işlerine odaklanmasını sağlıyoruz.",
  ],
};
