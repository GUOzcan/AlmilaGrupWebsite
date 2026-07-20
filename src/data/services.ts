// ─────────────────────────────────────────────────────────────
// HİZMETLER — her hizmetin kısa/uzun metni ve özellikleri burada.
// Metin düzenlemek için yalnızca bu dosyayı değiştirmeniz yeterli.
// ─────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  ClipboardList,
  Crown,
  Presentation,
  Users,
  GraduationCap,
  Plane,
  MapPinned,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  short: string;
  paragraphs: string[];
  features: string[];
}

export const services: Service[] = [
  {
    slug: "uzun-donem-arac-kiralama",
    title: "Uzun Dönem Araç Kiralama",
    icon: CalendarClock,
    short:
      "Kurumunuzun araç ihtiyacını satın alma maliyeti olmadan, esnek sözleşmelerle karşılayın.",
    paragraphs: [
      "Uzun dönem araç kiralama; satın alma, amortisman, bakım, sigorta ve vergi yükünü tek bir öngörülebilir aylık ödemeye dönüştüren modern filo çözümüdür. Almila Grup, 1 yıldan başlayan esnek sözleşme süreleriyle kurumunuzun ölçeğine ve bütçesine uygun filoyu tasarlar.",
      "Bakım, onarım, kasko, trafik sigortası, muayene ve lastik değişimi gibi tüm operasyonel süreçler tarafımızca yönetilir. Aracınızın serviste olduğu günlerde ikame araç desteğiyle işleriniz aksamaz.",
      "Sözleşme süresi boyunca ihtiyaçlarınız değişirse filo yapınız da değişir: araç sınıfı yükseltme, adet artırma veya azaltma taleplerinizi esnek biçimde karşılıyoruz.",
    ],
    features: [
      "1 yıldan başlayan esnek sözleşme süreleri",
      "Bakım, sigorta, vergi ve muayene dahil tek aylık ödeme",
      "Arıza ve kaza durumunda ikame araç",
      "Kurumsal ihtiyaca göre filo planlama",
      "7/24 yol yardım desteği",
    ],
  },
  {
    slug: "projeye-ozel-arac-kiralama",
    title: "Projeye Özel Araç Kiralama",
    icon: ClipboardList,
    short:
      "Saha, şantiye ve proje bazlı operasyonlarınız için süreye ve göreve özel filo çözümleri.",
    paragraphs: [
      "Enerji, inşaat, madencilik, telekomünikasyon ve kamu projeleri gibi süreli işlerde araç ihtiyacı standart kiralama kalıplarına sığmaz. Almila Grup, projenizin süresine, coğrafyasına ve görev tanımına göre özel filo kurgular.",
      "Arazi araçlarından binek filolara, çift kabin pikaplardan minibüslere kadar projenizin gerektirdiği araç karmasını tek elden sağlıyor; sahada kesintisiz operasyon için bölgesel servis ağıyla destekliyoruz.",
      "Proje bitiminde sözleşme de biter — atıl araç maliyeti taşımazsınız. Proje uzarsa filo aynı koşullarla devam eder.",
    ],
    features: [
      "Proje süresine birebir uyumlu sözleşme",
      "Arazi, pikap, binek ve minibüs karması",
      "Sahada bölgesel servis ve ikame desteği",
      "Şoförlü veya şoförsüz seçenekler",
      "Proje bütçesine uygun sabit maliyet",
    ],
  },
  {
    slug: "vip-arac-kiralama",
    title: "VIP Araç Kiralama",
    icon: Crown,
    short:
      "Üst düzey yöneticileriniz ve özel konuklarınız için şoförlü, lüks segment araç tahsisi.",
    paragraphs: [
      "İlk izlenim yönetilir. Almila Grup VIP hizmeti; üst düzey yöneticiler, yabancı heyetler, sanatçılar ve özel konuklar için lüks segment araçlar ve profesyonel şoförlerle kusursuz bir ulaşım deneyimi sunar.",
      "Protokol kurallarına hâkim, güzergâh planlaması yapan ve gizlilik esasıyla çalışan şoför kadromuz; havalimanı karşılamadan şehirlerarası transfere kadar tüm süreci sessiz bir mükemmeliyetle yürütür.",
      "Tek günlük etkinlik tahsisinden aylık sürekli görevlendirmeye kadar esnek kullanım modelleri sunuyoruz.",
    ],
    features: [
      "Lüks segment sedan ve SUV filosu",
      "Protokol deneyimli profesyonel şoförler",
      "Havalimanı VIP karşılama",
      "Gizlilik sözleşmesi güvencesi",
      "Günlük, haftalık veya aylık tahsis",
    ],
  },
  {
    slug: "kongre-ve-seminer-hizmeti",
    title: "Kongre ve Seminer Hizmeti",
    icon: Presentation,
    short:
      "Kongre, seminer ve kurumsal etkinliklerinizin tüm ulaşım operasyonu tek elden.",
    paragraphs: [
      "Yüzlerce katılımcının havalimanından otele, otelden kongre merkezine kusursuz akışı ciddi bir operasyon planlaması gerektirir. Almila Grup, etkinlik ulaşımını uçtan uca projelendirir: araç planlama, güzergâh yönetimi, saha koordinasyonu ve anlık raporlama.",
      "Katılımcı listenize göre karşılama ekipleri, yönlendirme personeli ve değişken uçuş saatlerine uyum sağlayan dinamik transfer planı oluşturuyoruz.",
      "Binek araçlardan otobüslere uzanan filomuzla hem küçük seminerlerde hem de binlerce kişilik kongrelerde aynı standartta hizmet veriyoruz.",
    ],
    features: [
      "Uçtan uca etkinlik ulaşım planlaması",
      "Havalimanı karşılama ve yönlendirme ekibi",
      "Uçuş saatlerine dinamik uyum",
      "Binekten otobüse ölçeklenebilir filo",
      "Saha koordinatörü ve anlık raporlama",
    ],
  },
  {
    slug: "personel-servis-tasimaciligi",
    title: "Personel Servis Taşımacılığı",
    icon: Users,
    short:
      "Çalışanlarınız her sabah zamanında, güvenle ve konforla iş yerinde.",
    paragraphs: [
      "Personel devamlılığı verimliliğin ilk şartıdır. Almila Grup, çalışanlarınızın ikamet dağılımına göre optimize edilmiş güzergâhlar tasarlar; vardiya saatlerinize göre esnek servis planları uygular.",
      "Tüm araçlarımız düzenli bakımlı, iklimlendirmeli ve takip sistemlidir. Deneyimli sürücü kadromuz psikoteknik belgeli ve SRC sertifikalıdır.",
      "Araç takip sistemi entegrasyonu sayesinde İK birimleriniz servis kullanımını anlık izleyebilir; raporlamalarla güzergâh verimliliği sürekli iyileştirilir.",
    ],
    features: [
      "İkamet analizine dayalı güzergâh optimizasyonu",
      "Vardiya düzenine esnek planlama",
      "GPS araç takip ve anlık izleme",
      "SRC ve psikoteknik belgeli sürücüler",
      "Periyodik bakımlı, iklimlendirmeli araçlar",
    ],
  },
  {
    slug: "ogrenci-servis-tasimaciligi",
    title: "Öğrenci Servis Taşımacılığı",
    icon: GraduationCap,
    short:
      "Velilerin gönül rahatlığıyla emanet ettiği, mevzuata tam uyumlu okul servisi.",
    paragraphs: [
      "Öğrenci taşımacılığında tek standart vardır: tavizsiz güvenlik. Almila Grup, Okul Servis Araçları Yönetmeliği'ne tam uyumlu araçları ve özenle seçilmiş personeliyle çocuklarınızı okula güvenle ulaştırır.",
      "Tüm servislerimizde rehber personel bulunur; araçlar iç kamera, koltuk sensörü ve araç takip sistemiyle donatılmıştır. Veliler mobil bildirimlerle biniş-iniş bilgisini anlık alır.",
      "Sürücülerimiz adli sicil kontrolünden geçmiş, psikoteknik değerlendirmeli ve okul servisi deneyimlidir. Okul yönetimleriyle koordineli çalışarak dönem boyunca kesintisiz hizmet sağlarız.",
    ],
    features: [
      "Okul Servis Araçları Yönetmeliği'ne tam uyum",
      "Her araçta rehber personel",
      "İç kamera ve koltuk sensörü",
      "Veliye anlık biniş-iniş bildirimi",
      "Adli sicil ve psikoteknik kontrollü sürücüler",
    ],
  },
  {
    slug: "havayolu-ekip-tasimaciligi",
    title: "Havayolu Ekip Taşımacılığı",
    icon: Plane,
    short:
      "Uçuş ekipleri için 7/24, dakik ve kesintisiz havalimanı-otel transfer operasyonu.",
    paragraphs: [
      "Havacılıkta gecikme kabul edilmez. Almila Grup, kabin ve kokpit ekiplerinin havalimanı-otel transferlerini 7/24 esasıyla, uçuş planlarına saniye hassasiyetinde uyumla yürütür.",
      "Rötar, iptal ve plan değişikliklerine anında adapte olan operasyon merkezimiz; her transferde yedek araç ve sürücü bulundurarak kesintisizliği garanti eder.",
      "Havayolu operasyon birimlerine özel raporlama, sabit aylık maliyetlendirme ve SLA taahhütlü hizmet modeli sunuyoruz.",
    ],
    features: [
      "7/24 kesintisiz operasyon",
      "Uçuş planına gerçek zamanlı uyum",
      "Rötar ve iptallere anında adaptasyon",
      "Yedek araç ve sürücü garantisi",
      "SLA taahhütlü kurumsal sözleşme",
    ],
  },
  {
    slug: "turizm-tasimaciligi",
    title: "Turizm Taşımacılığı",
    icon: MapPinned,
    short:
      "Tur, gezi ve grup organizasyonları için konforlu ve belgeli turizm taşımacılığı.",
    paragraphs: [
      "Yerli ve yabancı misafir gruplarınız için günübirlik turlardan çok günlük paket programlara kadar her ölçekte turizm ulaşımı sağlıyoruz. TÜRSAB üyesi acentelerle ve otellerle koordineli çalışıyoruz.",
      "D2 yetki belgeli araçlarımız; klima, mikrofon sistemi ve konforlu koltuk düzeniyle uzun yolculukları keyifli kılar. Güzergâh bilgisine hâkim sürücülerimiz tur programınıza tam uyum sağlar.",
      "Antalya şubemizle turizm bölgesinin kalbinde; Ankara ve Çorum yapılanmamızla İç Anadolu ve Karadeniz rotalarında güçlü bir operasyon ağına sahibiz.",
    ],
    features: [
      "D2 yetki belgeli turizm araçları",
      "Günübirlik ve paket tur ulaşımı",
      "Acente ve otel koordinasyonu",
      "Mikrofon ve kılavuz sistemli otobüsler",
      "Antalya merkezli güçlü bölge ağı",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
