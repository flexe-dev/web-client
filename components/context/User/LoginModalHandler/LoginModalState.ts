export interface LoginModalProviderState {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const loginModalInitialState: LoginModalProviderState = {
  isOpen: false,
  setOpen: () => {},
};
