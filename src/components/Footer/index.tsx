import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';

const Footer: React.FC = () => {
  const defaultMessage = 'All rights reserved.';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`Copyright ${currentYear}. ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined />
              <span>Github</span>
            </>
          ),
          href: 'https://asnpro.icu',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
