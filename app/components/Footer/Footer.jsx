import styles from "./Footer.module.css";
import { FacebookIcon } from "../icons/FacebookIcon/FacebookIcon";
import { WhatsappIcon } from "../icons/WhatsappIcon/WhatsappIcon";
import { InstagramIcon } from "../icons/InstagramIcon/InstagramIcon";
import { OriathIcon } from "../icons/OriathIcon/OriathIcon";
import { NextIcon } from "../icons/NextIcon/nextIcon";


export default function Footer() {
  return (
    <footer className={`${styles.container}`}>
        <div className={`${styles.container1} container mx-auto`}>

            <div className={styles.containerLeft}>
                <a href="https://www.oriathtech.com.ar/" target="_blank"> 
                    <div className={styles.containerOT}>
                        <p className="mx-2">Hecho por Oriath|Tech</p>
                        <OriathIcon height={"2rem"} width={"2rem"}/>
                    </div>
                </a>
            </div>

            <div className={styles.logo}>
                <NextIcon height={"5rem"} width={"15rem"}/>
            </div>

            <div className={styles.containerRight}>
                <a className="flex items-center" target="_blank" href="https://api.whatsapp.com/send/?phone=5491169206183&text=type=phone_number&app_absent=0"> 
                    <WhatsappIcon/>
                    <p className="pl-3"> WathsApp</p>
                </a>
                <a className="flex items-center" target="_blank" href="https://www.instagram.com/catavia.artesanal/"> 
                    <InstagramIcon/>
                    <p className="pl-3">InfinitoNails</p>
                </a>
                <a className="flex items-center" href="https://www.facebook.com/Postrescatavia"  target="_blank"> 
                    <FacebookIcon/> 
                    <p className="pl-3">Pinterest</p>
                </a>
            </div>
        </div>
    </footer>
  );
}
