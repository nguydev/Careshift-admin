import React, { useState } from 'react';
import { Form, Input, Button, Select, TreeSelect } from 'antd';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useNotificationUsersQuery } from '../../../redux/features/notification/notification';

const PushNotification = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const [value, setValue] = useState(false);
  const { data, isLoading } = useNotificationUsersQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );

  const onFinish = (values) => {

  };

  const treeData = [
    {
      title: 'Node1',
      value: '0-1',
      parent: true,
    },
    {
      title: 'Node2',
      value: '0-2',
      parent: true,
    },
    {
      title: 'Node3',
      value: '0-3',
      parent: false,
      selectable: false,
      treeCheckable: true,
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          parent: false,
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          parent: false,
        },
        {
          title: 'Child Node3',
          value: '0-0-3',
          parent: false,
        },
      ],
    },
  ];


  const onChange = (newValue) => {
    // Find if the selected value is a parent node or a child node
    let selectedNode = treeData.find((item) => item.value === newValue);

    if (!selectedNode) {

      if (Array.isArray(newValue)) {
        const latestValue = newValue[newValue.length - 1]

        const parentNode = treeData.find((item) => item.value === latestValue)
        if (parentNode && parentNode.parent) {
          newValue = latestValue
          setValue(false)
        }
        form.setFieldValue('sendTo', newValue)

      }
      selectedNode = treeData[2].children.find((child) => child.value === newValue);
    }

    if (selectedNode) {
      if (selectedNode.parent) {
        if (Array.isArray(newValue) && newValue.length > 1) {
          newValue = newValue.slice(-1); // Ensure only one item is selected
        }
        setValue(false); // Switch to single selection mode
      } else {
        setValue(true); // Switch to multiple selection mode
      }
    }
  };



  return (
    <div>
      <div className="bg-[#31BAC4] text-white px-6 py-3 rounded-t">
        <button className="flex items-center gap-2.5 text-sm">
          <FaChevronLeft onClick={() => navigate(-1)} size={15} />
          <span className="text-xl">Push Notification</span>
        </button>
      </div>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Notification Form</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Notification Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a title!' }]}
          >
            <Input placeholder="Enter title" className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            label="Notification Body"
            name="body"
            rules={[{ required: true, message: 'Please enter the body!' }]}
          >
            <Input.TextArea placeholder="Enter body" rows={4} className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            label="Send To"
            name="sendTo"
            rules={[{ required: true, message: 'Please select a recipient!' }]}
          >
            <TreeSelect
              style={{ width: '100%' }}
              showSearch
              allowClear
              multiple={value}
              treeDefaultExpandAll
              treeNodeFilterProp="title"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              showCheckedStrategy={TreeSelect.SHOW_CHILD} // Only show selected children in input
              placeholder="Please select"
              treeData={treeData}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
};

export default PushNotification;