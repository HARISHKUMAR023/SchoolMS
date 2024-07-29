import { useState, useEffect } from "react";
import axios from 'axios';

interface SubMenuItem {
  name: string;
  link: string;
}

interface MenuItem {
  _id?: string;
  title: string;
  icon: string;
  subMenuItems: SubMenuItem[];
  roles: string[];
  enabled: boolean;
}

const Menuoptions = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [subMenuItems, setSubMenuItems] = useState<SubMenuItem[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const openModalForEditing = (menuItem: MenuItem | null) => {
    if (menuItem) {
      setTitle(menuItem.title);
      setIcon(menuItem.icon);
      setSubMenuItems(menuItem.subMenuItems);
      setRoles(menuItem.roles);
      setEnabled(menuItem.enabled);
    } else {
      setTitle('');
      setIcon('');
      setSubMenuItems([]);
      setRoles([]);
      setEnabled(true);
    }
    setSelectedMenuItem(menuItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenuItem(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedMenuItem) {
        // Update menu item
        await axios.put(`http://localhost:5000/api/menu/${selectedMenuItem._id}`, { title, icon, subMenuItems, roles, enabled });
      } else {
        // Create new menu item
        await axios.post('http://localhost:5000/api/menu', { title, icon, subMenuItems, roles, enabled });
      }
      // Refresh menu items after saving
      const response = await axios.get('/menu');
      setMenuItems(response.data);
      closeModal();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleAddSubMenu = () => {
    setSubMenuItems([...subMenuItems, { name: '', link: '' }]);
  };

  const handleRemoveSubMenu = (index: number) => {
    setSubMenuItems(subMenuItems.filter((_, i) => i !== index));
  };

  const handleSubMenuChange = (index: number, field: string, value: string) => {
    const updatedSubMenuItems = [...subMenuItems];
    updatedSubMenuItems[index] = { ...updatedSubMenuItems[index], [field]: value };
    setSubMenuItems(updatedSubMenuItems);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => openModalForEditing(null)}
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Create New Menu Item
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold">{selectedMenuItem ? 'Edit Menu Item' : 'Create New Menu Item'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Icon</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Sub-menu Items</label>
                {subMenuItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={item.name}
                      onChange={(e) => handleSubMenuChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={item.link}
                      onChange={(e) => handleSubMenuChange(index, 'link', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubMenu(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSubMenu}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Sub-menu Item
                </button>
              </div>
              <div>
                <label className="block text-gray-700">Roles</label>
                <input
                  type="text"
                  value={roles.join(', ')}
                  onChange={(e) => setRoles(e.target.value.split(',').map(role => role.trim()))}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Enabled</label>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Menu Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menuoptions;
