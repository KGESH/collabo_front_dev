import Navbar from 'components/navbar/Navbar';

type NavbarProps = {
  itemName: string;
  url: string;
};

type HomeProps = {
  isLoggedIn: boolean;
  isInit?: boolean;
};

export type { NavbarProps, HomeProps };
