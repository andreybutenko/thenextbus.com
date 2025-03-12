import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useState } from 'react';
import { Wrapper } from '../components/Wrapper';

export function StopIdInputPage() {
    const [stopId, setStopId] = useState<string>('');

    const handleSubmit = () => {
        window.location.pathname = `/departures/${stopId}`;
    };

    return (
        <Wrapper contentType="form">
            <form onSubmit={(e) => e.preventDefault()}>
                <Form
                    actions={
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="primary" onClick={handleSubmit}>
                                View departures
                            </Button>
                        </SpaceBetween>
                    }
                    header={
                        <Header
                            variant="h1"
                            description="Input a King County Metro stop ID to view upcoming departures."
                        >
                            thenextbus.com
                        </Header>
                    }
                >
                    <SpaceBetween direction="vertical" size="m">
                        <FormField label="Stop ID">
                            <Input
                                type="text"
                                value={stopId}
                                onChange={({ detail }) => setStopId(detail.value)}
                            />
                        </FormField>
                    </SpaceBetween>
                </Form>
            </form>
        </Wrapper>
    );
}
