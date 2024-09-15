import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  pwa: false,
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  title: '云链',
  colorPrimary: '#2F54EB',
  iconfontUrl: '',
  navTheme: 'light',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  splitMenus: false,
  siderMenuType: 'sub',
};

export default Settings;
