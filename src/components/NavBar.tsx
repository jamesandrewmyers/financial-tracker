"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, DisclosurePanel, DisclosureButton, DisclosurePanelProps, DisclosureProps } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavItem {
  name: string;
  href: string;
}

interface NavBarProps {
  className?: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Reports', href: '/reports' },
];

//

export function NavBar({ className }: NavBarProps) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className={clsx('navbar sticky top-0 z-50 bg-base-100 border-b border-base-300', className)}>
      {({ open }) => (
        <>
          <div className="w-full">
            <div className="mx-auto max-w-6xl px-6">
              {/* Use a standard flex row to prevent overlapping between sections */}
              <div className="flex h-16 items-center justify-between">
                {/* Mobile menu button (left) */}
                <div className="relative sm:hidden">
                  <DisclosureButton className="btn btn-ghost btn-square">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      className={clsx(
                        open ? 'hidden' : 'block',
                        'h-6 w-6 transition-transform duration-200'
                      )}
                      aria-hidden="true"
                    />
                    <XMarkIcon
                      className={clsx(
                        open ? 'block' : 'hidden',
                        'h-6 w-6 transition-transform duration-200'
                      )}
                      aria-hidden="true"
                    />
                  </DisclosureButton>

                  {/* Mobile Navigation Panel: aligned under the hamburger button */}
                  <DisclosurePanel className="absolute left-0 mt-2 w-56 bg-base-100 border border-base-300 rounded-box shadow z-50">
                    <ul className="menu menu-compact p-2 w-full">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              aria-current={isActive ? 'page' : undefined}
                              className={clsx(isActive && 'active')}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </DisclosurePanel>
                </div>

                {/* Brand + Desktop navigation (center/fill) */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold text-sm">FT</div>
                      <span className="font-bold text-xl">
                        Financial Tracker
                      </span>
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden sm:ml-8 sm:block">
                    <div className="menu menu-horizontal gap-1">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={clsx('btn btn-ghost btn-sm', isActive && 'btn-active')}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Theme Toggle (right) */}
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel rendered inside the hamburger wrapper above */}
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
