import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';

export function Wrapper({
    children,
    ...props
}: {
    children: React.ReactElement;
} & Omit<AppLayoutProps, 'content'>) {
    return <AppLayout content={children} navigationHide={true} toolsHide={true} {...props} />;
}
