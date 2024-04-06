import React from 'react';
import Input from '../ui/Input';

const InputPhone = ({ value, onChange, placeholder, label, maxLength, onBlur, errorMessage }) => {
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        if (match) {
            let formattedPhone = '';
            if (match[1]) formattedPhone += `(${match[1]}`;
            if (match[2]) formattedPhone += `) ${match[2]}`;
            if (match[3]) formattedPhone += `-${match[3]}`;
            return formattedPhone;
        }
        return phoneNumber;
    };

    const handlePhoneChange = (e) => {
        let inputPhone = e.target.value;
        if (maxLength && inputPhone.length > maxLength) {
            // Limit input to 15 characters
            inputPhone = inputPhone.slice(0, maxLength);
        }
        const formattedPhone = formatPhoneNumber(inputPhone);
        onChange(formattedPhone);
    };
    
    return (
        <Input
            type="text"
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            label={label}
            maxLength={maxLength}
            onBlur={onBlur} 
            errorMessage={errorMessage}
        />
    );
};

export default InputPhone;
