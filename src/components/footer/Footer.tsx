import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <p className="footer__author">Автор: Әбдіразақ Мереке Шоханқызы</p>
                    <p className="footer__contact">Email: <a href="mailto:Mereeke04@mail.ru">Mereeke04@mail.ru</a></p>
                    <p className="footer__contact">Телефон: <a href="tel:+77077525428">+7 707 752 5428</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;