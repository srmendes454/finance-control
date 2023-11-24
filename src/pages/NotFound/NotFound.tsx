import style from "./NotFound.module.scss";
import logo from '../../assets/img/IconBranco.svg';
import image404 from '../../assets/img/404GifBold.gif';
import foguete from '../../assets/img/rocket.svg';
import mundo from '../../assets/img/earth.svg';
import lua from '../../assets/img/moon.svg';
import astronauta from '../../assets/img/astronaut.svg';

function NotFound() {
    return (
        <div className={style.bg_purple}>
            <div className={style.stars}>
                <div className={style.custom_navbar}>
                    <div className={style.logo}>
                        <img src={logo} alt="logo" width="80px" />
                    </div>
                    <div className={style.navbarlinks}>
                        <ul className={style.nav}>
                            <li className={style.itemNav}><a href="/Welcome">Home</a></li>
                            <li className={style.itemNav}><a href="*">Dashboard</a></li>
                            <li className={style.itemNav}><a href="/optimize-income">Otimizar Salário</a></li>
                            <li className={style.itemNav}><a href="/wallet">Carteiras</a></li>
                            <li className={style.itemNav}><a href="*">Marcações</a></li>
                        </ul>
                    </div>
                </div>
                <div className={style.central_body}>
                    <img className={style.image404} src={image404} alt="404" width="250px" />
                    <h5 className={style.subTitle}>Parece que está perdido</h5>
                    <h5 className={style.subTitle}>No espaço</h5>
                    <a href="/Welcome" className={style.btn_go_home}>HOME</a>
                </div>
                <div className={style.objects}>
                    <img className={style.object_rocket} src={foguete} alt="foguete" width="40px" />
                    <div className={style.earth_moon}>
                        <img className={style.object_earth} src={mundo} alt="mundo" width="100px" />
                        <img className={style.object_moon} src={lua} alt="lua" width="80px" />
                    </div>
                    <div className={style.box_astronaut}>
                        <img className={style.object_astronaut} src={astronauta} alt="astronaut" width="140px" />
                    </div>
                </div>
                <div className={style.glowing_stars}>
                    <div className={style.star}></div>
                    <div className={style.star}></div>
                    <div className={style.star}></div>
                    <div className={style.star}></div>
                    <div className={style.star}></div>
                </div>
            </div>
        </div>
    )
}

export { NotFound }