export interface INavbarProps {
  itemName: string;
  url: string;
}

export interface IHomeProps {
  isInit?: boolean;
}

export interface IModalFrameProps {
  isOpen: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  header?: string;
  children?: React.ReactNode;
}
