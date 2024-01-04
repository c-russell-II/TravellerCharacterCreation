import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../../../features/TermSlice/TermSlice";
import { MultipleChoiceEventReward } from "../../../../features/CareerDetails/CareerTypes/EventRewardTypes";

const MultipleChoice = (props: {result: MultipleChoiceEventReward, description: string}) => {
    const result = props.result;
    const dispatch = useDispatch();

    const handleClick = (choice: string) => {
        dispatch(updateEvent({type: 'reward', description: props.description, result: result.choiceDetails[choice]}))
        return;
    }
    return (
        <>
            {result.choiceList.map((e: string, i: number) => {
                return <button key={i} onClick={() => handleClick(e)}>{result.choiceDetails[e].button}</button>
            })}
        </>
    )
}

export default MultipleChoice;