import React from "react";
import { useSelector } from "react-redux";

const CharacterSheet = React.forwardRef((props, ref) => {
    const chara = useSelector(state => state.chara);
    const stats = useSelector(state => state.stats);
    const statList = Object.keys(stats).slice(0, -2)
    return (
        <div ref={ref}>
            <h3>{chara.name}</h3>
            {statList.map((e, i) => <p key={i}>{e}:{stats.displayValues[e]}</p>)}
        </div>
    )
})

export default CharacterSheet;