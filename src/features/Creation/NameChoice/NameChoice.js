import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../../Character/charaSlice';
import styles from './styles.module.css'

const NameChoice = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setName(value));
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.nameChoice}>

            <input className={styles.nameInput} type="text" onChange={handleChange} value={value} placeholder="name"/>

            <input  className={styles.nameSubmit} type="submit" value="Submit"/>

        </form>
    )
}

export default NameChoice;