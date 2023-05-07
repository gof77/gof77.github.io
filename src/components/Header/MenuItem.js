import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import { Link } from '../';
import { onMobile, onTablet, isMobile, isNormal } from '../../styles/responsive';

const MenuItem = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  // const isNormal = {isNormal};
  // const isMobile = {isMobile};

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    isNormal()  && setDropdown(true);
  };

  const onMouseLeave = () => {
    isNormal() && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.link && items.submenus ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            { isMobile()  && depthLevel === 0 ? (
              items.text
            ) : (
              <Link to={items.link}>{items.text}</Link>
            )}

            {depthLevel > 0 &&  isMobile() ? null : 
              depthLevel > 0 &&  isNormal() ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenus}
            dropdown={dropdown}
          />
        </>
      ) : !items.link && items.submenus ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenus}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.link}>{items.text}</Link>
      )}
    </li>
  );
};

export default MenuItem;





