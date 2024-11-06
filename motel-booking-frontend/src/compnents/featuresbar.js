import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function FeaturesBar() {
    return (
        <Disclosure as="nav" className="bg-gray-800 w-full h-[8vh]">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {/* Mobile menu button */}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {/* Feature items */}
                            <div className="flex flex-1 items-center justify-center space-x-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center">
                                        🏰
                                    </div>
                                    <h1 className="text-white text-lg font-medium">Historical Palace</h1>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center">
                                        $
                                    </div>
                                    <h1 className="text-white text-lg font-medium">Affordable Luxury</h1>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center">
                                        🦋
                                    </div>
                                    <h1 className="text-white text-lg font-medium">Spa at Your Service</h1>
                                </div>
                            </div>

                            {/* Profile dropdown */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="relative">
                                    <Menu.Button className="flex rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open user menu</span>
                                        <Bars3Icon className="h-6 w-6" />
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    Your Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 text-white text-center">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="bg-yellow-700 rounded-full w-10 h-10 flex items-center justify-center">
                                    🏰
                                </div>
                                <h1>Historical Palace</h1>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <div className="bg-yellow-700 rounded-full w-10 h-10 flex items-center justify-center">
                                    $
                                </div>
                                <h1>Affordable Luxury</h1>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <div className="bg-yellow-700 rounded-full w-10 h-10 flex items-center justify-center">
                                    🦋
                                </div>
                                <h1>Spa at Your Service</h1>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default FeaturesBar;