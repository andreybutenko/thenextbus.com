import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';

export function Wrapper({
    children,
    contentType,
}: {
    children: React.ReactElement;
    contentType: AppLayoutProps['contentType'];
}) {
    return (
        <AppLayout
            contentType={contentType}
            content={children}
            navigationHide={true}
            toolsHide={true}
        />
    );
}
