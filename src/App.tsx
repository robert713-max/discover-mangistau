import DrawerAppBar from './components/header/Header';
import Cards from './components/Cards/Cards';
import Map from './components/Map/Map';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './App.scss';

import ImageOne from './assets/images/mangistau_1.jpg';
import ImageTwo from './assets/images/mangistau_2.jpg';
import ImageThree from './assets/images/mangistau_3.jpg';
import ImageFour from './assets/images/mangistau_4.jpg';
import Video from './components/Video/Video';

function App() {
	return (
		<>
			<DrawerAppBar />
			<main className="main">
				{/* Басты бет */}
				<section id="Басты бет" className="slider-section">
					<h1 className="slider-title">
						Маңғыстау облысындағы тарихи-мәдени ескерткіштер
					</h1>
					<Swiper
						pagination={{ dynamicBullets: true }}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						modules={[Pagination, Autoplay]}
						className="mySwiper"
						loop={true}
					>
						<SwiperSlide>
							<img src={ImageOne} alt="mangistau photo" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={ImageTwo} alt="mangistau photo" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={ImageThree} alt="mangistau photo" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={ImageFour} alt="mangistau photo" />
						</SwiperSlide>
					</Swiper>
				</section>
				<section className="section-description">
					<div className="container">
						<h2 className="section-description__title">Маңғыстау облысында республикалық маңызы бар 20 тарихи-мәдени ескерткіш тіркелген</h2>
					</div>
				</section>
				{/* Ескерткіштер */}
				<section id="Ескерткіштер" className="section-history">
					<div className="container">
						<Cards />
					</div>
				</section>
				{/* Тарихы терең Түркістан */}
				<section id="Тарихы терең Түркістан" className="section-description">
					<div className="container">
						<h2 className="section-description__title">Тарихи-мәдени ескерткіштердің орналасқан жері</h2>
					</div>
				</section>
				{/* Карта */}
				<section id="Карта" className="section-last">
					<div className="container">
						<Map />
					</div>
				</section>
			</main >
		</>
	);
}

export default App;
