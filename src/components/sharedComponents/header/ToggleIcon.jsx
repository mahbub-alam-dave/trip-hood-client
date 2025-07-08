import React, { useContext } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { ContextValues } from '../../../utility/contexts/ContextValue';


const ToggleIcon = ({setDisplayMenu, displayMenu}) => {
    const {mode, setMode}= useContext(ContextValues)
    const handleChangeMode = () => {
      setMode(!mode)
      setDisplayMenu(!displayMenu)
    }
    return (

        <div
          onClick={handleChangeMode}
          className={`tooltip tooltip-right transition-colors duration-300 cursor-pointer ${mode ? "text-[var(--color-text-primary-two)]" : "text-[var(--color-text-primary)]"}`}
          data-tip={mode ? "toggle to light" :"toggle to dark" }
        >
          {mode ? <MdDarkMode size={28}/> : <MdOutlineLightMode size={28}/>}
        </div>
    );
};

export default ToggleIcon;