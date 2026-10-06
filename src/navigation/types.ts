import type { NavigatorScreenParams } from '@react-navigation/native';

export type ZikirStackParamList = {
  ZikirList: undefined;
  ZikirDetail: { id: number };
};

export type DrawerParamList = {
  Home: undefined;
  Zikirler: NavigatorScreenParams<ZikirStackParamList>;
  Hatim: undefined;
};
