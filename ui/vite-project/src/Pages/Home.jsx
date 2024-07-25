import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logger from '../Utils/Logger';

export default function Home() {
  Logger.log('Home component initialized');

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://backend:5000/api/WebApplication1/GetNotes')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const [showDetails, setShowDetails] = useState({
    financialLiteracy: false,
    investmentAdvice: false,
    creditCardUsage: false,
    savingTechniques: false,
  });

  const toggleDetails = (section) => {
    setShowDetails(prevDetails => ({
      ...prevDetails,
      [section]: !prevDetails[section],
    }));
  };

const styles = {
homepage: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.6',
//   backgroundColor:'#f8f9fa'
},
header: {
  backgroundColor: '#f8f9fa',
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  borderBottom: '1px solid black',

},
headerTitle: {
  margin: 0,
  color: '#343a40',
},
headerSubtitle: {
  color: '#6c757d',
},
navUl: {
  listStyleType: 'none',
  padding: 0,
},
navLi: {
  display: 'inline',
  margin: '0 10px',
},
navA: {
  textDecoration: 'none',
  color: '#007bff',
},
navAHover: {
  textDecoration: 'underline',
},
main: {
    width:"100%",
  marginBottom: '20px',
  backgroundColor:"#e3f2fd"
},
intro: {
  padding: '20px',
  marginBottom: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
topicBox: {
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '4px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '900px',
},
topicBoxTitle: {
  marginTop: 0,
  color: '#343a40',
},
topicImage: {
  maxWidth: '50%',
  height: 'auto',
  display: 'block',
  margin: '0 auto 10px auto',
},
topicBoxUl: {
  listStyleType: 'none',
  padding: 0,
},
topicBoxLi: {
  marginBottom: '10px',
},
topicBoxA: {
  textDecoration: 'none',
  color: '#007bff',
},
topicBoxAHover: {
  textDecoration: 'underline',
},
footer: {
  backgroundColor: '#f8f9fa',
  textAlign: 'center',
  padding: '10px',
  borderTop: '1px solid #dee2e6',
},
};

  return (
    <>
    <div style={styles.homepage}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>FinterTech´e Hoş Geldiniz!</h1>
        <div style={styles.headerSubtitle}>
         
          <br />
          <p>Finansal okuryazarlığınızı artırmak için en iyi kaynağa hoş geldiniz. Burada finansal konular hakkında tartışabilir, bilgi edinebilir ve topluluğumuza katılabilirsiniz.</p>
         <p>Daha iyi bir öğrenme deneyimi için AI öğretmeniniz TeachBot ile tanışın <Link className='btn btn-primary' to={"/teachbot"}>TeachBot</Link></p>
        </div>
       
      </header>

      <main style={styles.main}>
        <section style={styles.intro}>
          <div style={styles.topicBox}>
            <h2 style={styles.topicBoxTitle}>Finansal Okuryazarlık Nedir?</h2>
            <img src="https://www.pharmaceutical-technology.com/wp-content/uploads/sites/24/2023/11/shutterstock_2166540277.jpg" alt="Finansal Okuryazarlık" style={styles.topicImage} />
            <p>Finansal okuryazarlık, bireylerin para yönetimi, yatırım, borç yönetimi ve finansal kararlar alabilme yeteneği ve bilgi düzeyidir. Bu beceriler, bireylerin finansal hedeflerine ulaşmasına yardımcı olur ve ekonomik olarak daha güvenli bir gelecek sağlar.</p>
            <p>FinterTech olarak amacımız, sizlere finansal okuryazarlık konusunda gerekli bilgileri ve kaynakları sunarak, finansal hedeflerinize ulaşmanızda destek olmaktır.</p>
            <span onClick={() => toggleDetails('financialLiteracy')} style={styles.topicBoxA}>
              Detaylar
            </span>
            {showDetails.financialLiteracy && (
             <> <p>Finansal okuryazarlık, bireylerin finansal kavramları ve araçları anlama, değerlendirme ve etkili bir şekilde kullanma yeteneğini ifade eder. Bu, bütçe yapma, tasarruf etme, borç yönetimi, yatırım yapma ve emeklilik planlaması gibi konuları içerir. 
             Finansal okuryazarlık, bireylerin ekonomik kararlar alırken daha bilinçli ve güvenli olmalarını sağlar. Örneğin, kredi kartı borçlarının nasıl yönetileceği, hangi yatırım araçlarının daha güvenli olduğu veya emeklilik için ne kadar birikim yapılması 
             gerektiği konularında bilgi sahibi olmak, finansal okuryazarlığın temel bileşenlerindendir. Bu yetenek, bireylerin mali durumlarını iyileştirmelerine, finansal hedeflerine ulaşmalarına ve mali zorluklarla başa çıkmalarına yardımcı olur. Aynı zamanda, 
             finansal okuryazarlık, ekonomik krizler ve belirsizlikler karşısında bireylerin daha dayanıklı olmasını sağlar. Eğitim ve bilgiye erişim, finansal okuryazarlığın artırılmasında önemli bir rol oynar. Okullarda finansal eğitim programlarının yaygınlaştırılması, 
             bireylerin genç yaşta finansal beceriler kazanmalarına katkı sağlar. Sonuç olarak, finansal okuryazarlık, bireylerin ve toplumların ekonomik refahını artırmada kritik bir öneme sahiptir.</p>
         <Link to="/SSS#FOY" style={styles.topicBoxA}>Daha Fazla</Link></>)}
          </div>

          <div style={{ marginBottom: '20px' }}></div>

          <div style={styles.topicBox}>
            <h2 style={styles.topicBoxTitle}>Son Tartışmalar</h2>
            <img src="https://cdn.dribbble.com/users/822460/screenshots/3575856/web_illustrations3-13.png" alt="Yatırım Tavsiyeleri" style={styles.topicImage} />
            <ul style={styles.topicBoxUl}>
              <li style={styles.topicBoxLi}>
                <h3>Yatırım Tavsiyeleri</h3>
                <p>Bu başlık altında yatırım stratejileri ve tavsiyeleri hakkında konuşuyoruz.</p>
                <span onClick={() => toggleDetails('investmentAdvice')} style={styles.topicBoxA}>
                  Detaylar
                </span>
                {showDetails.investmentAdvice && (<>
                  <p>Finansal okuryazarlık, bireylerin yatırım yaparken bilinçli kararlar almalarını sağlar. 
                    İyi bir yatırım stratejisi, risk toleransını belirlemekle başlar. Çeşitlendirme, farklı 
                    yatırım araçlarına yatırım yaparak riski dağıtmanın önemli bir yoludur. Hisse senetleri, 
                    tahviller, gayrimenkul ve yatırım fonları gibi seçenekler değerlendirilmelidir. 
                    Finansal okuryazarlık, bireylerin piyasa trendlerini anlamalarına ve uzun vadeli yatırım
                     hedefleri belirlemelerine yardımcı olur. Ayrıca, yatırım yaparken mali danışmanlardan destek 
                     almak ve düzenli olarak portföyü gözden geçirmek önemlidir. Bilinçli yatırım kararları, bireylerin 
                     finansal güvenliğini artırır ve gelecekteki mali hedeflerine ulaşmalarını sağlar.</p>
                <Link to="/SSS#investment" style={styles.topicBoxA}>Daha Fazla</Link> </> )}
                            </li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}></div>

          <div style={styles.topicBox}>
            <h2 style={styles.topicBoxTitle}>Kredi Kartı Kullanımı</h2>
            <img src="https://techktimes.com/wp-content/uploads/2023/09/1_11zon-2023-09-18T145912.041.jpg" alt="Kredi Kartı Kullanımı" style={styles.topicImage} />
            <ul style={styles.topicBoxUl}>
              <li style={styles.topicBoxLi}>
                <h3>Kredi Kartı Kullanımı</h3>
                <p>Kredi kartı kullanımı ve avantajları hakkında tartışıyoruz.</p>
                <span onClick={() => toggleDetails('creditCardUsage')} style={styles.topicBoxA}>
                  Detaylar
                </span>
                {showDetails.creditCardUsage && (<>
                  <p>Finansal okuryazarlık, bireylerin kredi kartı kullanımını daha etkili ve bilinçli bir şekilde yönetmelerini sağlar. 
                    Kredi kartları, doğru kullanıldığında nakit akışını düzenleme ve acil durumlarda finansal esneklik sağlama avantajı sunar. 
                    Ancak, faiz oranları, asgari ödeme tutarları ve gecikme ücretleri gibi unsurları anlamak, borç birikimini önlemek için kritik öneme sahiptir.
                     Finansal okuryazarlık, bireylerin harcamalarını kontrol altında tutmalarına, borçlanma riskini minimize etmelerine ve kredi puanlarını 
                     korumalarına yardımcı olur. Böylece, kredi kartları güvenli ve verimli bir finansal araç haline gelir.</p>
                <Link to="/SSS#CrediCard" style={styles.topicBoxA}>Daha Fazla</Link></>              
            )}
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}></div>

          <div style={styles.topicBox}>
            <h2 style={styles.topicBoxTitle}>Birikim Yapma Teknikleri</h2>
            <img src="https://www.thestockdork.com/wp-content/uploads/2023/10/money-savings-5.jpg" alt="Birikim Yapma Teknikleri" style={styles.topicImage} />
            <ul style={styles.topicBoxUl}>
              <li style={styles.topicBoxLi}>
                <h3>Birikim Yapma Teknikleri</h3>
                <p>Birikim yapmanın en etkili yollarını burada bulabilirsiniz.</p>
                <span onClick={() => toggleDetails('savingTechniques')} style={styles.topicBoxA}>
                  Detaylar
                </span>
                {showDetails.savingTechniques && (<>
                  <p>Finansal okuryazarlık, bireylerin etkili birikim yapma tekniklerini öğrenmelerine yardımcı olur.
                    Birikim yapmanın temel adımları arasında bütçe oluşturma, harcamaları izleme ve tasarruf hedefleri belirleme yer alır.
                     Otomatik tasarruf planları, düzenli olarak bir miktar paranın doğrudan birikim hesabına aktarılmasını sağlar, 
                     böylece tasarruf etmek daha kolay hale gelir. Ayrıca, acil durum fonu oluşturmak, beklenmedik harcamalar karşısında 
                     finansal güvenlik sağlar. Yatırım araçlarını ve faiz getirilerini anlamak da birikimlerin değerini artırmada önemli rol oynar.
                      Finansal okuryazarlık, bu teknikleri etkin bir şekilde kullanarak bireylerin mali geleceğini güvence altına almalarını sağlar.</p>
                <Link to="/SSS#Birikim" style={styles.topicBoxA}>Daha Fazla</Link> </>      
            )}
             </li>
            </ul>
          </div>
        </section>
      </main>

      
    </div>
 
      <h1>Home</h1>
      <div>
        {data.length > 0 ? (
          data.map(note => (
            <div key={note.Id} className="card my-3">
              <div className="card-body">
                <p className="card-text"><b>{note.Description}</b></p>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}
