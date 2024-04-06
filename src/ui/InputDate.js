import React, { useState, useEffect } from 'react';
import Input from './Input';

const InputDate = ({ value, onChange, label, onBlur, errorMessage, age }) => {
    const [ageDifference, setAgeDifference] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    useEffect(() => {
        if (value) {
            const currentDate = new Date();
            const inputDateParts = value.split('/');
            const inputDay = parseInt(inputDateParts[0], 10);
            const inputMonth = parseInt(inputDateParts[1], 10);
            const inputYear = parseInt(inputDateParts[2], 10);

            if (inputMonth > 12 || inputDay > 31) {
                return;
            }

            const inputDateObj = new Date(inputYear, inputMonth - 1, inputDay);

            let ageDifferenceValue = currentDate.getFullYear() - inputDateObj.getFullYear();
            const monthDifference = currentDate.getMonth() - inputDateObj.getMonth();
            const dayDifference = currentDate.getDate() - inputDateObj.getDate();

            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                ageDifferenceValue--;
            }

            setAgeDifference(ageDifferenceValue);
        } else {
            setAgeDifference('');
        }

        setCharacterCount(value.length);
    }, [value]);

    const formatBirthday = (birthdayValue) => {
        const cleaned = ('' + birthdayValue).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
        if (match) {
            let formattedBirthday = '';
            if (match[1]) formattedBirthday += `${match[1]}`;
            if (match[2]) formattedBirthday += `/${match[2]}`;
            if (match[3]) formattedBirthday += `/${match[3]}`;
            return formattedBirthday;
        }
        return birthdayValue;
    };

    const handleDateChange = (e) => {
        const inputDate = e.target.value;

        if (inputDate.length <= 10) {
            const formattedDate = formatBirthday(inputDate);
            onChange(formattedDate);
        }
    };

    return (
        <>
            <Input
                type="text"
                value={value}
                onChange={handleDateChange}
                label={`${label} ${age && ageDifference !== '' && value.length === 10 ? `(${ageDifference} anos)` : ''}`}
                onBlur={onBlur} 
                errorMessage={errorMessage}
            />
        </>
    );
};

export default InputDate;
