import React, {useState} from 'react';

type AnyChooser = (SingleChooser | MultiChooser) & StyleOptions;

interface StyleOptions {
    styleOptions?: {
        button?: React.CSSProperties
        form?: React.CSSProperties
        input?: React.CSSProperties
    }
}
interface MultiChooser {
    type: 'multi'
    options: string[]
    max: number
    cleanup: (arg0: string[]) => void
}
interface SingleChooser {
    type: 'single'
    options: string[]
    cleanup: (arg0: string) => void
}

//TODO: kinda fuzzy on if I want choosers to be consistent across the whole thing or if I want them to change with where they are
export default function Chooser (props: AnyChooser) {
    const [selected, setSelected] = useState<string[]>([]);
    const {type, options, cleanup} = props;
    const max = type === 'multi' ? props.max : 1;

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        if (type === 'multi') {
            if (selected.includes(value)) {
                setSelected((prev) => prev.filter((item) => item !== value));
            } else if (selected.length < max) {
                setSelected((prev) => [...prev, value]);
            } else {
                alert('Too many options selected!');
                return;
            }
        } else {
            setSelected([value]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (type === 'multi') {
            cleanup(selected);
        } else {
            cleanup(selected[0])
        }
    }
    const renderOptions = () => {
        return options.map((option) => {
            return (
				<div key={option}>
                    <input id={option} type={type === 'multi' ? 'checkbox' : 'radio'} value={option} onChange={handleClick} checked={selected.includes(option)} />
					<label key={option} htmlFor={option}>
						{option}
					</label>
				</div>
			);
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            {type === 'multi' && <p>Choose up to {max} options.</p>}
            {renderOptions()}
            <input type="submit" />
        </form>
    )
}