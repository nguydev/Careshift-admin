import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneCountryInput = ({ disabled }) => {
  const [phoneNumber, setPhoneNumber] = useState("+1 4575454545");
  // console.log(phoneNumber);
  return (
    <PhoneInput
      disabled={disabled}
      className="custom-phone "
      placeholder="Enter phone number"
      international
      countryCallingCodeEditable={false}
      style={{
        marginTop: "12px",
      }}
      defaultCountry="RU"
      value={phoneNumber?.toString()}
      onChange={setPhoneNumber}
    />
  );
};

export default PhoneCountryInput;
