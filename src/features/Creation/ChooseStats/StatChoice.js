import styles from './styles.module.css';
import SingleStat from './SingleStat';

const StatChoice = (props) => {
    const {stats, setStats, points, setPoints, setReady} = props;
    const statList = ['str', 'dex', 'end', 'int', 'edu', 'soc'];

    const costCalc = (val) => {
        if (val < 3) {
            return 1
        } else if (val < 6) {
            return 2
        } else if (val < 9) {
            return 3
        } else if (val < 12) {
            return 4
        } else if (val < 15) {
            return 5
        } else {
            return 6
        }
    }
    const decrease = (val) => {
        const currentStat = stats[val]
        if (stats[val] > 0) {
            setPoints(prevPoints => prevPoints + costCalc(currentStat - 1))
            setStats(prevStats => {return {...prevStats, [val]:currentStat - 1}})
            return;
        } else {
            alert("You can't lower that stat any further at this time.");
            return;
        }
    };
    const increase = (val) => {
        const currentStat = stats[val]
        const pointCost = costCalc(currentStat);
        if (currentStat < 15 && pointCost <= points) {
            setPoints(prevPoints => prevPoints - pointCost);
            setStats(prevStats => {return {...prevStats, [val]:currentStat + 1}})
            return;
        } else if (currentStat < 15 && pointCost > points) {
            alert("You don't have enough stat points available!");
            return;
        } else {
            alert("You can't raise that stat any further at this time.")
        }
    };
    const handleReady = () => {
        if (points > 5) {
            alert('Please spend more of your stat points before attempting to proceed.')
            return;
        } else {
            setReady(true);
            return;
        }
    }

    const getModifiers = (num) => {
        if (num === 0) {
            return -3
        } else if (num === 1 || num === 2) {
            return (-2);
        } else if (num >= 3 && num < 6) {
            return (-1);
        } else if (num > 5 && num < 9) {
            return 0
        }else if (num > 8 && num < 12) {
            return 1
        } else if (num > 11 && num < 15) {
            return 2
        } else if (num >= 15) {
            return 3
        }
    }

    return (
        <>
            <h2 className={styles.subTitle}>Points remaining: <span className={styles.remainingPoints}>{points}</span></h2>

            <div className={styles.stats}>

                {statList.map((e) => 
                    <SingleStat
                        key={e}
                        stat={e}
                        val={stats[e]}
                        modVal={getModifiers(stats[e])}
                        increase={increase}
                        decrease={decrease}
                        cost={costCalc(stats[e])}
                    />
                )}

                <button onClick={handleReady} className={styles.statsButton}>Finalize stats.</button>
                </div>
        </>
    )
}

export default StatChoice;