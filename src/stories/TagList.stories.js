import React from 'react';
import { Provider } from 'react-redux';
import { Story } from '@storybook/react';
import { TagList } from '../components/TagList';
import store from '../store/store';

export default {
    title: 'TagList',
    component: TagList,
};

const Template: Story = (args) => (
    <Provider store={store}>
        <TagList {...args} />
    </Provider>
);

export const Default = Template.bind({});
Default.args = {};
