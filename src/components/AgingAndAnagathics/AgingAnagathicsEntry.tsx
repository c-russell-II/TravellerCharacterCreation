import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import Aging from "./Aging/Aging";
import Accordian from "../Accordian";
import StopAnagathicOption from "./Anagathics/StopAnagathicOption";
import BeginAnagathicChoice from "./Anagathics/BeginAnagathicChoice";


export default function AgingAnagathicsEntry (props: {cleanup: () => void}) {
    const age = useSelector((state: RootState) => state.stats.age);
    const anagathics = useSelector((state: RootState) => state.chara.anagathics);

    return (
        <>
            {(age - (anagathics.terms * 4)) > 22 && <Aging cleanup={props.cleanup}/>}
            {age >= 22 && 
                <Accordian stopProp={true} tier={3} title="Anagathics">
                    {anagathics.using ?
                        <StopAnagathicOption/>
                        :
                        <BeginAnagathicChoice />
                    }
                </Accordian>
            }
        </>
    )
}