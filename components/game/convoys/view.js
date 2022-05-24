import gameStyles from '../../../styles/Game.module.css'
import styles from '../../../styles/components/convoy/Convoys.module.css'
import ConvoyItem from "./item"

export default function ViewConvoys({ x, y, toggle, selectedConvoy, setSelectedConvoy }) {

    return (
        <div className={gameStyles.box}>
            <div className={styles.header}>
                <svg className={styles.close} onClick={toggle} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </div>

            <h1 className={gameStyles.bigtitle}>Convoys in ({x}, {y})</h1>
            <ConvoyItem convoyId={1} selectedConvoy={selectedConvoy} setSelectedConvoy={setSelectedConvoy} />
        </div>
    );
}