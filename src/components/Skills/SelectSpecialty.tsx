import React, { useState } from "react";

interface SelectSpecialtyProps {
    skill: string;
    list: string[];
    passSpecialty: (spec: string) => void;
}
type IsCheckedState = {[key: string]: string | boolean} | {};
export const SelectSpecialty = (props: SelectSpecialtyProps) => {
    const {skill, list, passSpecialty} = props;
    const [isChecked, setIsChecked] = useState<IsCheckedState>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const thing = event.target.value;
        setIsChecked({[thing]: true, spec: thing});
        return;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const spec = isChecked?.['spec' as keyof IsCheckedState];
        if (!spec) {
            console.warn("No specialty selected in specialty handler");
            return;
        }
        passSpecialty(spec);
    }

    const iterator = (e: string, i: number) => {
        return (
            <div key={i}>
                <label>
                <input key={Math.random()} checked={isChecked[e as keyof IsCheckedState]} value={e} name={e} type="radio" onChange={handleChange}/> {e}
                </label>
            </div>
        )
    }

    return(
        <>
            <p>Select a particular specialty for your {skill} skill.</p>
            <form onSubmit={handleSubmit}>
                {list.map((e, i) => {return iterator(e, i)})}
                <button type="submit">Confirm selection</button>
            </form>
        </>
    )
}