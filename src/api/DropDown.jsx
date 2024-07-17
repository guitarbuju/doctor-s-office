import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MenuBar } from "../assets/Icons/MenuBar";
import { Link } from "react-router-dom";


function DropDown() {
  return (
    <Menu>
      <MenuButton className="text-xs leading-tight z-50 ">
        <MenuBar/>
      </MenuButton>
      <MenuItems anchor="bottom" className='flex flex-col text-xs text-center text-gray-900  bg-zinc-50 p-4 outline outline-1 outline-gray-900 rounded-md xl:grid xl:grid-cols-3 gap-1'>
        <MenuItem>
          <Link className="block data-[focus]:yellow-400  data-[focus]:text-white data-[focus]:bg-yellow-400 rounded-md" to="/patients">
            Patients
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:yellow-400  data-[focus]:text-white data-[focus]:bg-yellow-400 rounded-md" to="/admissions">
            Admissions
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:bg-yellow-400 data-[focus]:text-white rounded-md" to="/appointments/list">
            Appointments
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:bg-yellow-400 data-[focus]:text-white rounded-md" to="/invoices/list">
            Invoices
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:bg-yellow-400 data-[focus]:text-white rounded-md" to="/payments">
            Payments
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:bg-yellow-400 data-[focus]:text-white rounded-md" to="/administration">
            Back Office
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block data-[focus]:bg-yellow-400 data-[focus]:text-white rounded-md" to="/doctorcheckin">
            Doctor&apos; Area
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default DropDown;
