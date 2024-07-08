import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DropDown.css'
import { BiImageAdd } from "react-icons/bi";

function DropDown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Select Type">
      <Dropdown.Item href="#/action-1">Staff</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Cab Driver</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Student</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropDown;