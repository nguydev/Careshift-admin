import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  TimePicker,
  InputNumber,
  Checkbox,
  Button,
  Card,
  Row,
  Col,
  Upload,
  Typography,
  DatePicker,
} from "antd";
import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons";
import { useCreateShiftMutation } from "../../../redux/features/admin/shiftManage/shiftManage";
import { errorAlert } from "../../../lib/alerts";
import toast from "react-hot-toast";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

// Enum options matching backend
const qualificationOptions = [
  "Assistant in Nursing (AIN)",
  "Certificate 3 Aged Care",
  "Certificate 3 Community Services",
  "Certificate 3 in Disabilities",
  "Certificate 3 Individual Support",
  "Certificate 3 in Home and Community Care",
  "Certificate 4 Aged Care",
  "Certificate 4 Community Services",
  "Certificate 4 in Disabilities",
  "Certificate 4 Individual Support",
  "Certificate 4 in Home and Community Care",
  "Degree in Allied Health",
  "Degree in Nursing",
  "Degree in Psychology",
  "Degree in Social Work",
  "Enrolled Nurse",
  "Registered Nurse",
];

const firstAidOptions = [
  "First Aid (HLTAID011)",
  "CPR (HLTAID009)",
  "First Aid + CPR Combined",
  "Basic Emergency Life Support (HLTAID010)",
  "Advanced First Aid (HLTAID014)",
  "Advanced Resuscitation (HLTAID015)",
  "Mental Health First Aid",
  "Remote Area First Aid",
  "Childcare First Aid (HLTAID012)",
  "Occupational First Aid (HLTSS00068)",
  "First Aid (Non-accredited)",
  "CPR (Non-accredited)",
];

const vaccinationOptions = [
  "COVID-19 Vaccination",
  "COVID-19 Vaccination Booster 1",
  "COVID-19 Vaccination Booster 2",
  "COVID-19 Vaccine Exempt",
  "Flu Vaccination",
  "Flu Vaccine Exempt",
];

const servicesOptions = [
  "Basic Medication Support",
  "Companionship",
  "Domestic Assistance",
  "Driving & Community Access",
  "Showering & Bathing: Partial Assistance",
  "Yard Maintenance",
];

const languageOptions = [
  "English",
  "Spanish",
  "Punjabi",
  "Hindi",
  "Greek",
  "Italian",
  "Cantonese",
  "Vietnamese",
  "Mandarin",
  "Arabic",
];

const stateOptions = ["New South Wales", "Queensland"];

const CreateShift = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const [createShift, { isLoading }] = useCreateShiftMutation();
  const handleSubmit = async (values) => {
    const formData = new FormData();
    // Map form values to backend interface format
    const mappedValues = {
      ...values,
      clientPostcode: Number(values.clientPostcode),
      image: fileList[0]?.originFileObj
        ? fileList[0]?.originFileObj
        : undefined,
      workStartDate: values.workStartDate?.toDate(),
      workingTimeStart: values.workingTimeStart?.toDate(),
      workingTimeFinish: values.workingTimeFinish?.toDate(),
      totalShiftHours: Number(values.totalShiftHours),
      // Payment Information
      hourlyRate: Number(values.hourlyRate),
      travelRatePerKm: Number(values.travelRatePerKm),
      clientPayhourlyRate: Number(values.clientPayhourlyRate),
      clientPaytravelRatePerKm: Number(values.clientPaytravelRatePerKm),
    };
    // return console.log(mappedValues)
    for (const key in mappedValues) {
      if (Object.prototype.hasOwnProperty.call(mappedValues, key)) {
        const elementValue = mappedValues[key];
        if (Array.isArray(elementValue)) {
          elementValue.forEach((tag) => {
            formData.append(`${key}[]`, tag);
          });
        } else if (elementValue) {
          formData.append(key, elementValue);
        }
      }
    }

    try {
      // return console.log(formData.get("language"))
      await createShift(formData).unwrap();
      toast.success(`Shift create successful!`);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      errorAlert({ error });
    }
  };

  const uploadProps = {
    name: "file",
    accept: "image/*",
    listType: "text",
    multiple: false,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
    beforeUpload: () => false,
    fileList,
    onChange: (info) => {
      let newFileList = info.fileList.slice(-1);
      setFileList(newFileList);

      // if (info.file && info.file.originFileObj) {
      //     console.log("Selected file:", info.file.originFileObj);
      // }
    },
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const imgWindow = window.open(src);
      imgWindow?.document.write(`<img src="${src}" style="max-width: 100%;"/>`);
    },
  };

  return (
    <div>
      {/* Header */}
      <Card
        style={{
          backgroundColor: "#23B1D9",
          color: "white",
          marginBottom: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        bodyStyle={{ padding: "16px 24px" }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ color: "white", padding: 0, marginRight: 8 }}
        />
        <Text style={{ color: "white", fontSize: "16px", fontWeight: 500 }}>
          Post a new shift
        </Text>
      </Card>

      {/* Main Form */}
      <Card
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={48}>
            {/* Left Column - Client Details */}
            <Col xl={12}>
              <Title level={3} style={{ marginBottom: 24 }}>
                Client Details
              </Title>

              {/* Profile Image Upload */}
              <Row gutter={[16, 20]}>
                <Col span={24}>
                  <div>
                    <Upload {...uploadProps}>
                      <div
                        style={{
                          width: 112,
                          height: 112,
                          border: "1px dashed #d9d9d9",
                          borderRadius: "50%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <CameraOutlined
                          style={{
                            fontSize: 24,
                            color: "#999",
                            marginBottom: 8,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#999",
                            textAlign: "center",
                          }}
                        >
                          Upload client's Image
                        </Text>
                      </div>
                    </Upload>
                  </div>
                </Col>
                <Col span={24}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="clientFirstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter first name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter first name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="clientLastName"
                        rules={[
                          { required: true, message: "Please enter last name" },
                        ]}
                      >
                        <Input placeholder="Enter last name" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Address Fields */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Suburb (Client)"
                    name="clientSuburb"
                    rules={[{ required: true, message: "Please enter suburb" }]}
                  >
                    <Input placeholder="Enter Suburb" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="State (Client)"
                    name="clientState"
                    rules={[{ required: true, message: "Please select state" }]}
                  >
                    <Select placeholder="Select state">
                      {stateOptions.map((state) => (
                        <Option key={state} value={state}>
                          {state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Post code"
                    name="clientPostcode"
                    rules={[
                      { required: true, message: "Please enter postcode" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Enter postcode"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Full Address"
                name="clientFullAddress"
                rules={[
                  { required: true, message: "Please enter full address" },
                ]}
              >
                <Input placeholder="Enter your address" />
              </Form.Item>

              <Form.Item
                label="Phone number (Optional)"
                name="clientPhoneNumber"
                rules={[
                  {
                    pattern: /^\+?[1-9]\d{7,14}$/, // min 8, max 15 digits (E.164)
                    message:
                      "Please enter valid number (8-15 digits with country code)",
                  },
                ]}
              >
                <Input
                  prefix={"+"}
                  placeholder="Enter phone number"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Required Checkboxes */}
              <Col>
                <Form.Item
                  label="Required"
                  name={"drivingLicense"}
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox
                  // checked={drivingLicense}
                  // onChange={(e) => setDrivingLicense(e.target.checked)}
                  >
                    Driving License
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  name={"policeCheck"}
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox
                  // checked={policeCheck}
                  // onChange={(e) => setPoliceCheck(e.target.checked)}
                  >
                    Police Check
                  </Checkbox>
                </Form.Item>
                <Form.Item name={"ndidWorkerCheck"} valuePropName="checked">
                  <Checkbox
                  // checked={ndidWorkerCheck}
                  // onChange={(e) => setNdidWorkerCheck(e.target.checked)}
                  >
                    NDIS Worker Screening Check
                  </Checkbox>
                </Form.Item>
              </Col>

              {/* Preferences */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Preferred Gender"
                    name="preferredGender"
                    rules={[
                      {
                        required: true,
                        message: "Please select preferred gender",
                      },
                    ]}
                  >
                    <Select placeholder="Select gender preference">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Anyone">Anyone</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Preferred Language" name="language">
                    <Select
                      mode="multiple"
                      placeholder="Select languages"
                      allowClear
                    >
                      {languageOptions.map((lang) => (
                        <Option key={lang} value={lang}>
                          {lang}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Preferred Qualification"
                name="preferredQualification"
              >
                <Select placeholder="Select qualification" allowClear>
                  {qualificationOptions.map((qual) => (
                    <Option key={qual} value={qual}>
                      {qual}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Aid & CPR" name="firstAidAndCPR">
                    <Select
                      placeholder="Select first aid certification"
                      allowClear
                    >
                      {firstAidOptions.map((cert) => (
                        <Option key={cert} value={cert}>
                          {cert}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Vaccination" name="vaccination">
                    <Select placeholder="Select vaccination" allowClear>
                      {vaccinationOptions.map((vac) => (
                        <Option key={vac} value={vac}>
                          {vac}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Right Column - Shift Details */}
            <Col span={12}>
              <Title level={3} style={{ marginBottom: 24 }}>
                Shift Details
              </Title>

              <Form.Item
                label="Worker Role"
                name="workerRole"
                rules={[
                  { required: true, message: "Please select worker role" },
                ]}
              >
                <Select placeholder="Select Role">
                  <Option value="carer">Carer</Option>
                  <Option value="nurse">Nurse</Option>
                  <Option value="cleaner">Cleaner</Option>
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Suburb (Shift)"
                    name="shiftSuburb"
                    rules={[
                      { required: true, message: "Please enter shift suburb" },
                    ]}
                  >
                    <Input placeholder="Enter suburb" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="State (Shift)"
                    name="shiftState"
                    rules={[
                      { required: true, message: "Please select shift state" },
                    ]}
                  >
                    <Select placeholder="Select state">
                      {stateOptions.map((state) => (
                        <Option key={state} value={state}>
                          {state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description" name="description">
                <TextArea
                  rows={4}
                  maxLength={250}
                  showCount
                  placeholder="Write here short description...."
                />
              </Form.Item>

              <Form.Item
                label="Work Starting date"
                name="workStartDate"
                rules={[
                  { required: true, message: "Please select work start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Working time start"
                    name="workingTimeStart"
                    rules={[
                      { required: true, message: "Please select start time" },
                    ]}
                  >
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Working time end"
                    name="workingTimeFinish"
                    rules={[
                      { required: true, message: "Please select end time" },
                    ]}
                  >
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Work type" name="workType">
                    <Select placeholder="Select work type">
                      <Option value="one-off">One-off</Option>
                      <Option value="ongoing">Ongoing</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Total shift Hours"
                    name="totalShiftHours"
                    rules={[
                      {
                        required: true,
                        message: "Please enter total shift hours",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Enter hours"
                      min={1}
                      max={24}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Frequency"
                name="frequency"
                rules={[{ required: true, message: "Please select frequency" }]}
              >
                <Select placeholder="Select frequency">
                  <Option value="one off">One off</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="fortnight">Fortnight</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Services"
                name="services"
                rules={[{ required: true, message: "Please select services" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select services"
                  allowClear
                >
                  {servicesOptions.map((service) => (
                    <Option key={service} value={service}>
                      {service}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Hourly Rate"
                    name="hourlyRate"
                    rules={[
                      { required: true, message: "Please enter hourly rate" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="per hour"
                      prefix="$"
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Travel Rate per Km"
                    name="travelRatePerKm"
                    rules={[
                      { required: true, message: "Please enter travel rate" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="per Km"
                      prefix="$"
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Client Pay Hourly Rate"
                    name="clientPayhourlyRate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter client pay rate",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="per hour"
                      prefix="$"
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Client Travel Rate per Km"
                    name="clientPaytravelRatePerKm"
                    rules={[
                      {
                        required: true,
                        message: "Please enter client travel rate",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="per Km"
                      prefix="$"
                      min={0}
                      step={0.01}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ textAlign: "right", marginTop: 32 }}>
                <Button
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: "#0f2a4d",
                    borderColor: "#0f2a4d",
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateShift;
