import './Cards.scss';
import { monuments } from '../../data/monuments';

export default function Cards() {
    return (
        <div className="cards-wrapper">
            {monuments.map((monument, index) => (
                <div
                    className="card"
                    key={index}
                    style={{ backgroundImage: `url(${monument.image})` }}
                >   
                    <div className="card-content">
                        <h2 className="card-title">{monument.title}</h2>
                        <p className="card-body">
                            {monument.description}
                        </p>
                        <a href={monument.link} target="_blank" className="button">
                            Толығырақ
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
