import { useState } from 'react';

type MenuItem = {
  title: string;
  subItems?: string[];
};

const menuConfig: MenuItem[] = [
  { title: 'Home' },
  { title: 'Services', subItems: ['Cleaning', 'Cooking', 'Plumbing'] },
  {
    title: 'Contact',
    subItems: ['Phone', 'Mail'],
  },
];

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  function toggleMenu(title: string) {
    if (expandedMenu === title) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(title);
    }
  }

  return (
    <aside className='sidebar'>
      <h2>Services Directory</h2>

      {menuConfig.map((item) => (
        <div key={item.title} data-test-id={`first-level-${item.title.toLowerCase()}`}>
          <div className='menu-heading'>
            <span>{item.title}</span>

            {item.subItems && item.subItems.length > 0 && (
              <button
                type='button'
                onClick={() => toggleMenu(item.title)}
                data-test-id={`button-${item.title.toLowerCase()}`}
              >
                {expandedMenu === item.title ? 'Hide' : 'Expand'}
              </button>
            )}
          </div>

          {item.subItems && item.subItems.length > 0 && expandedMenu === item.title && (
            <ul>
              {item.subItems.map((subItem) => (
                <li key={subItem} data-test-id={`li-${item.title.toLowerCase()}-${subItem.toLowerCase()}`}>
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
