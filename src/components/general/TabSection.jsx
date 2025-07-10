import { Tab } from "@headlessui/react";
import TourPackagesTab from "./TourPackagesTab";
import TourGuidesTab from "./TourGuidesTab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabsSection = () => {
  return (
    <div className="max-w-7xl mx-auto pt-24 px-6">
      <Tab.Group>
        <Tab.List className="flex space-x-2 mb-8">
          <Tab
            className={({ selected }) =>
              classNames(
                "px-4 py-2 font-medium text-lg rounded-lg focus:outline-none",
                selected
                  ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]"
                  : "bg-gray-200 dark:bg-gray-700 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]"
              )
            }
          >
            Tour Packages
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "px-4 py-2 font-medium text-lg rounded-lg focus:outline-none",
                selected
                  ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]"
                  : "bg-gray-200 dark:bg-gray-700 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]"
              )
            }
          >
            Meet Our Guides
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <TourPackagesTab />
          </Tab.Panel>
          <Tab.Panel>
            <TourGuidesTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabsSection;


/* 
https://i.ibb.co/fzZw53Nk/cox-s-bazar-four.jpg
https://i.ibb.co/b5gVVRG6/cox-s-bazar-one.jpg
https://i.ibb.co/YFvsTjV5/cox-s-bazar-three.jpg
https://i.ibb.co/DfJC4ZRM/cox-s-bazar-two.jpg
https://i.ibb.co/6cfbzRy3/sajek-valley.jpg
https://i.ibb.co/hxttXf5C/sajek-valley-four.jpg
https://i.ibb.co/N2Q1czsh/sajek-valley-three.jpg
https://i.ibb.co/gMxNXMn2/sajek-valley-two.jpg
https://i.ibb.co/0j3TWfDQ/srimangal-five.jpg
https://i.ibb.co/wrd7Wk5J/srimangal-four.jpg
https://i.ibb.co/YFm5HhPv/srimangal-one.jpg
https://i.ibb.co/5fG1zPn/srimangal-three.jpg
https://i.ibb.co/TDxxHQ0r/srimangal-two.jpg

https://i.ibb.co/KzQxRCWs/saint-martin-two.jpg
https://i.ibb.co/p6BhwX1z/saint-martin-one.jpg
https://i.ibb.co/nsVZr5cf/bandarban-two.jpg
https://i.ibb.co/cK7PgSBF/bandarban-one.jpg
*/