import React, { useState } from 'react';
import { Form, Input, Button, Select, TreeSelect } from 'antd';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useNotificationUsersQuery, usePushNotificationMutation } from '../../../redux/features/notification/notification';
import { debounceSearch } from '../../../utils/debounce';
import { errorAlert } from '../../../lib/alerts';
import toast from 'react-hot-toast';

const PushNotification = () => {
  const [form] = Form.useForm();
  const [expend, setExpend] = useState(false);
  const navigate = useNavigate()
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useNotificationUsersQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  const [mutation, { isLoading: muLoading }] = usePushNotificationMutation()

  const onFinish = async (values) => {
    const payload = {
      // type: "manual",
      // ids: ["689c1a837e033b7f6a652992"],
      title: values.title,
      body: values.body
    }
    if (values.sendTo?.[0]?.length > 10) {
      payload.type = "manual";
      payload.ids = values.sendTo;
    } else {
      payload.type = values.sendTo?.[0];
    }
      try {
      await mutation(payload).unwrap();
      toast.success("Notification sent successfully!")
      form.resetFields();
    } catch (error) {
      errorAlert({ error })
    }
  };


  const onChange = (value) => {
    if (value.slice(-1)[0] === "manual") {
      setExpend(c => !c)
      form.setFieldValue("sendTo", [])
    } else {
      if (value.slice(-1)[0]?.length < 10) {
        setExpend(false)
        form.setFieldValue("sendTo", value.slice(-1));
      } else {
        form.setFieldValue("sendTo", value);
      }
    }
  }

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
              loading={isLoading}
              onChange={onChange}
              style={{ width: '100%' }}
              showSearch
              // allowClear
              multiple={true}
              // value={sendToValue}
              treeExpandedKeys={expend ? ['manual'] : []}
              // treeCheckable={true}
              // treeCheckStrictly={false}
              treeNodeFilterProp="title"
              onSearch={(value => {
                debounceSearch({
                  setter: setQuery,
                  newValue: value,
                  name: "searchQ",
                })
              })}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              showCheckedStrategy={TreeSelect.SHOW_CHILD} // Only show selected children in input
              placeholder="Please select"
              treeData={[
                {
                  title: '● All User',
                  value: 'all',
                },
                {
                  title: '● Nurse',
                  value: 'nurse',
                  treeCheckable: false,
                },
                {
                  title: '● Carer',
                  value: 'carer',
                  treeCheckable: false,
                },
                {
                  title: '● Cleaner',
                  value: 'cleaner',
                  treeCheckable: false,
                },
                {
                  title: '● Manual',
                  value: 'manual',
                  // selectable: false,
                  treeCheckable: false,
                  children: data?.data?.map((user) => ({
                    title: `⚬ ${user.name}`,
                    value: user._id,
                  })),
                }
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button loading={muLoading} type="primary" htmlType="submit" className="w-full bg-green-500 text-white hover:bg-green-600 mt-2">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
};

export default PushNotification;