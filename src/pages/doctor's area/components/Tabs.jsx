import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MedicalData from './MedicalData';
import Recipe from './Recipe';

function Tabs() {
  return (
    <TabGroup>
      <TabList>
       <Tab className="text-sm rounded  px-4 data-[selected]:bg-yellow-400 data-[selected]:text-white data-[selected]:underline"> Notes</Tab>
        <Tab className="text-sm rounded px-4 data-[selected]:bg-yellow-400 data-[selected]:text-white data-[selected]:underline">Recipe</Tab>
       
      </TabList>
      <TabPanels>
        <TabPanel><MedicalData/></TabPanel>
        <TabPanel><Recipe/></TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

export default Tabs;