# Zikirmatik

Eski React Native 0.64 uygulamasının (`../zikirmatik`) yeniden yazılmış hali.
Kurulum VivacityMobile ile aynı mantıkta: **React Native CLI projesi + Expo modülleri (bare)**.
`ios/` ve `android/` klasörleri repoda ve elle yönetiliyor; Expo Go / prebuild kullanılmıyor.

- React Native 0.86.3, Expo SDK 57 (`install-expo-modules` ile eklendi, `ExpoAppDelegate`)
- Navigasyon: React Navigation (drawer + native-stack)
- Babel: `babel-preset-expo`, Metro: `expo/metro-config`

```bash
npm install
cd ios && pod install && cd ..   # native bağımlılık değişince
npm run ios        # expo run:ios  (simulator'da build + çalıştır)
npm run android    # expo run:android
npm start          # sadece Metro
npm test           # sayaç + hatim mantık testleri (jest)
npm run lint && npm run typecheck
```

## EAS / OTA güncellemeleri

EAS projesi: `@yusufcagann/zikirmatik` (`9b2a976a-79bf-4005-aa51-d0c1abf8dd56`).
`expo-updates` VivacityMobile ile aynı şekilde kurulu: uygulama her açılışta `production` channel'ını kontrol eder, yeni JS'i arka planda indirir, sonraki açılışta devreye alır.

```bash
npx eas-cli channel:create production        # bir kerelik (yerel build aldığımız için otomatik oluşmaz)
npx eas-cli update --branch production --message "açıklama"
```

Native değişiklik yapınca (yeni native paket, Podfile/gradle, izin) `runtimeVersion`'ı artırıp yeni store build'i al. Şu 4 yer birlikte güncellenir:

1. `app.json` → `runtimeVersion`
2. `ios/Zikirmatik/Supporting/Expo.plist` → `EXUpdatesRuntimeVersion`
3. `android/app/src/main/res/values/strings.xml` → `expo_runtime_version`
4. Sürüm: `android/app/build.gradle` (`versionCode` +1, `versionName`) ve Xcode `MARKETING_VERSION`

## Android release imzası

`android/app/build.gradle` upload key'i `MYAPP_UPLOAD_*` property'lerinden okur (yoksa debug ile imzalar). Şifreleri repoya koymamak için `~/.gradle/gradle.properties` içine yaz:

```
MYAPP_UPLOAD_STORE_FILE=/tam/yol/zikirmatik-upload.keystore
MYAPP_UPLOAD_KEY_ALIAS=...
MYAPP_UPLOAD_STORE_PASSWORD=...
MYAPP_UPLOAD_KEY_PASSWORD=...
```

## Ekranlar

| Ekran (navigator adı) | Başlık | Ne yapar |
|---|---|---|
| `Home` | Anasayfa | Kaydedilmemiş sayaç. Büyük tuş +1, geri al -1, kırmızı tuş onayla sıfırlar. **KAYDET** isim sorar, sayıyı "Zikirlerim"e ekler ve sayacı sıfırlar. Sağ üstte titreşim aç/kapa. |
| `Zikirler › ZikirList` | Zikirlerim | Kayıtlı zikirlerin listesi (isim + sayı). Dokununca devam ekranı, çöp kutusu onayla siler. Liste boşsa Anasayfa'ya yönlendirir. |
| `Zikirler › ZikirDetail` | Zikir devam | Aynı sayaç, ama doğrudan o zikrin sayısını değiştirir. Kalem ikonu isim ve sayıyı düzenler. |
| `Hatim` | Hatim Hesaplama | Hatim türü + kişi sayısı → kimin kaç okuyacağı. |

## İş kuralları

- **Sayaç**: 4 haneli, 0–9999 arası; 9999'da durur, 0'ın altına inmez. Ekranda `0 0 1 2` biçiminde (digital-7 fontu).
- **Titreşim**: her sayımda kısa haptik geri bildirim; ayar kalıcı.
- **Hatim toplamları**: Ayetel Kürsi 313, Yasin 41, İhlas 100.
- **Dağıtım**: `q = taban(toplam / kişi)`, `r = toplam % kişi` → `r` kişi `q+1`, kalan kişiler `q` okur. Mesajda önce küçük grup yazılır (örn. 313 / 10 → "3 kişi 32, geriye kalanlar 31 okuyacak.").
- **İhlas özel kuralı**: kişi sayısı 34'ten fazlaysa "Herkes 3'er okuyacak."
- Kalan yoksa "Herkes q okuyacak."; kişi sayısı toplamdan fazlaysa fazlası için "düşmüyor" denir (eski uygulamada bu durum anlamsız sonuç veriyordu).

## Veri

`AsyncStorage` içinde `zikirmatik/v1` anahtarında tek JSON: `{ zikirs: [{id, name, count}], nextId, draftCount, vibration }`.

Eski uygulamanın `persist:root` (redux-persist) verisi ilk açılışta otomatik okunup taşınır. Bu yalnızca Play'deki uygulamanın güncellemesi olarak yüklendiğinde işe yarar: Android `applicationId` `com.zikirzikirmatik` (Play kaydı). Kotlin kod paketi (`namespace`) `com.zikirmatik` olarak kaldı. Eski iOS paket adı `org.reactjs.native.example.zikirmatik` idi; yeni uygulama `com.zikirmatik` kullanıyor.

## Eski uygulamadan bilerek alınmayanlar

- **AdMob** (`react-native-admob`): bakımı bırakılmış paket, sadece test reklam ID'leri vardı. Gerekirse `react-native-google-mobile-ads` ile eklenebilir.
- Boş "Planlarım" ve "Ayarlar" ekranları (menüde zaten kapalıydı).
- Redux / redux-persist → React Context + `useReducer` + AsyncStorage.
- Görsel tabanlı zikirmatik arka planı (`zikirmatik2.png`) → saf stil ile çizilmiş cihaz.

## Yapı

```
App.tsx               provider'lar, font yükleme, NavigationContainer
src/navigation/       RootNavigator (drawer + zikir stack), param tipleri
src/screens/          HomeScreen, ZikirListScreen, ZikirDetailScreen, HatimScreen
src/components/       CounterDevice, ZikirFormModal, VibrationToggle, PrimaryButton
src/lib/              saf mantık: counter.ts, hatim.ts (testler __tests__/ içinde)
src/store/            ZikirContext (state + kalıcılık + eski veri göçü)
ios/ android/         native projeler (iOS bundle id: com.zikirmatik, Android applicationId: com.zikirzikirmatik)
```
