

export default function NoAgingEffect (props: {cleanup: () => void}) {

    return (
        <>
            <p>Whether due to anagathics, good genetics, or a good diet, you've experience no negative effects from aging.</p>
            <button onClick={() => {props.cleanup()}}>Confirm</button>
        </>
    )
}